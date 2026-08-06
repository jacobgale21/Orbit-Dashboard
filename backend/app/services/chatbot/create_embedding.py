import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from app.database import SessionLocal
from app.models.knowledge_chunk_model import KnowledgeChunk
from app.services.chatbot.chunk import Chunk
from app.services.chatbot.create_chunks import create_technology_chunks, create_roadblock_chunks, create_future_theory_chunks
from app.services.chatbot.create_chunks import create_structures_chunks, create_missions_chunks, create_discoveries_chunks
import hashlib
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import insert
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from fastapi import Depends
from sqlalchemy import select
from app.services.chatbot.chatbot_services import NavigationIndex
from app.schemas.chatbot_schemas import ChatbotOut
from app.models.chat_cache_model import ChatResponseCache
from datetime import datetime, timezone, timedelta

load_dotenv()

# Pick one dim and stick to it everywhere (DB column must match)
EMBED_DIM = 768  # good cost/quality tradeoff; default is 3072
EMBED_MODEL = "gemini-embedding-001"

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

def embed_texts(texts: list[str], *, task_type: str = "RETRIEVAL_DOCUMENT") -> list[list[float]]:
    result = client.models.embed_content(
        model=EMBED_MODEL,
        contents=texts,
        config=types.EmbedContentConfig(
            task_type=task_type,
            output_dimensionality=EMBED_DIM,
        ),
    )
    return [e.values for e in result.embeddings]

def embed_query(text: str) -> list[float]:
    return embed_texts([text], task_type="RETRIEVAL_QUERY")[0]

async def build_all_chunks() -> list[Chunk]:
    return (
        create_technology_chunks()
        + create_roadblock_chunks()
        + create_future_theory_chunks()
        + await create_structures_chunks()
        + await create_missions_chunks()
        + await create_discoveries_chunks()
    )

async def create_embeddings(batch_size: int = 64):
    chunks = await build_all_chunks()
    for i in range(0, len(chunks), batch_size):
        batch = chunks[i : i + batch_size]
        vectors = embed_texts([c.content for c in batch])
        for chunk, vec in zip(batch, vectors):
            yield chunk, vec  # then upsert into Neon


async def upsert_chunk(session, chunk: Chunk, vector: list[float]):
    stmt = insert(KnowledgeChunk).values(
        source_type=chunk.source_type,
        source_id=str(chunk.source_id),
        path=chunk.path,
        title=chunk.title,
        content=chunk.content,
        content_hash=hashlib.sha256(chunk.content.encode()).hexdigest(),
        embedding=vector,
        embedding_model=EMBED_MODEL,
    )
    stmt = stmt.on_conflict_do_update(
        constraint="uq_source",
        set_={
            "path": stmt.excluded.path,
            "title": stmt.excluded.title,
            "content": stmt.excluded.content,
            "content_hash": hashlib.sha256(chunk.content.encode()).hexdigest(),
            "embedding": stmt.excluded.embedding,
            "embedding_model": stmt.excluded.embedding_model,
            "updated_at": sa.func.now(),
        },
    )
    await session.execute(stmt)

async def ingest_knowledge(db: AsyncSession = Depends(get_db)):
    async for chunk, vec in create_embeddings(db):
        await upsert_chunk(db, chunk, vec)
    await db.commit()

async def search_chunks(query: str, qvec: list[float], db: AsyncSession = Depends(get_db), k: int = 5):
    result = await db.execute(
        select(KnowledgeChunk)
        .order_by(KnowledgeChunk.embedding.cosine_distance(qvec))
        .limit(k)
    )
    return result.scalars().all()

def normalize_question(q: str) -> str:
    return " ".join(q.lower().strip().split())


async def handle_question(question: str, session: AsyncSession) -> ChatbotOut:
    norm = normalize_question(question)

    qvec = embed_query(norm)
    cached = await get_cached_response(session, norm, qvec)
    if cached:
        return cached

    intent = NavigationIndex("./app/data/chatbot/chatbot_data.json").search(norm)  # Find the path for the navigation
    # if intent and intent_score_is_strong(intent):  # e.g. keyword score ≥ threshold
    #     out = ChatbotOut(
    #         type_of_response=intent["type_of_response"],
    #         path=intent["path"],
    #         response=intent["response"],
    #     )
    #     await put_cached_response(session, norm, qvec, out)
    #     return out

    chunks = await search_chunks(norm, qvec, session, 2)
    answer = await prompt_llm(session, norm, chunks)
    out = ChatbotOut(
        type_of_response=intent["type_of_response"],  # or "answer"
        path=intent["path"],              # don't auto-navigate on Q&A
        response=answer,
    )
   
    await put_cached_response(session, norm, qvec, out)
    return out

SIM_THRESHOLD = 0.92  # start high; tune down carefully (0.88–0.95)

async def get_cached_response(session, norm: str, qvec: list[float]) -> ChatbotOut | None:
    
    qhash = hashlib.sha256(norm.encode()).hexdigest()

    # Exact question match
    exact = await session.execute(
        select(ChatResponseCache).where(ChatResponseCache.question_hash == qhash)
    )
    row = exact.scalar_one_or_none()
    if row and (row.expires_at is None or row.expires_at > datetime.now(timezone.utc)):
        row.hit_count += 1
        row.last_hit_at = datetime.now(timezone.utc)
        await session.commit()
        return ChatbotOut(
            type_of_response=row.type_of_response,
            path=row.path,
            response=row.response,
        )

    # Semantic similarity match
    result = await session.execute(
        select(
            ChatResponseCache,
            ChatResponseCache.question_embedding.cosine_distance(qvec).label("dist"),
        )
        .order_by("dist")
        .limit(1)
    )
    row, dist = result.one_or_none() or (None, None)
    # cosine_distance: 0 = identical; similarity ≈ 1 - dist
    if row and dist is not None and (1 - dist) >= SIM_THRESHOLD:
        row.hit_count += 1
        row.last_hit_at = datetime.now(timezone.utc)
        await session.commit()
        return ChatbotOut(
            type_of_response=row.type_of_response,
            path=row.path,
            response=row.response,
        )

    return None

# Upsert the question and response into the cache
async def put_cached_response(session, norm: str, qvec: list[float], out: ChatbotOut):
    qhash = hashlib.sha256(norm.encode()).hexdigest()
    

    stmt = insert(ChatResponseCache).values(
        question_norm=norm,
        question_hash=qhash,
        question_embedding=qvec,
        response=out.response,
        hit_count=0,
        type_of_response=out.type_of_response,
        path=out.path,
        last_hit_at=datetime.now(timezone.utc),
        expires_at=datetime.now(timezone.utc) + timedelta(days=30),
    )
    # Conflict handling
    stmt = stmt.on_conflict_do_update(
        index_elements=["question_hash"],
        set_={
            "question_norm": stmt.excluded.question_norm,
            "question_embedding": stmt.excluded.question_embedding,
            "response": stmt.excluded.response,
            "type_of_response": stmt.excluded.type_of_response,
            "path": stmt.excluded.path,
            "expires_at": stmt.excluded.expires_at,
        },
    )
    await session.execute(stmt)
    await session.commit()


async def prompt_llm(session, message: str, chunks: list[Chunk]):
    # Prompt the LLM to generate a response
    chunk_text = "\n\n".join(
    f"""
Chunk Type: {chunk.source_type}
Title: {chunk.title}

Content:
{chunk.content}
"""
    for chunk in chunks
)


    prompt = f"""
You are a knowledgeable assistant answering questions using a Retrieval-Augmented Generation (RAG) system.

Your task is to answer the user's question ONLY using the retrieved context below.

User Question:
{message}

Retrieved Context:
{chunk_text}

Instructions:
- Answer ONLY using the retrieved context.
- Combine information from all relevant chunks into one concise response.
- Do not mention the retrieved chunks or quote them directly.
- Do not use outside knowledge.
- If the retrieved information conflicts, briefly explain the disagreement.
- If the answer is not present in the retrieved context, respond:
  "This information is not currently available in the knowledge base."

Writing Style:
- Keep the response between 60 and 120 words.
- Write for a general audience with no technical background.
- Start with a one-sentence direct answer.
- Follow with 2-4 short bullet points highlighting the most important facts.
- Prioritize readability over completeness.
- Explain technical terms in simple language or omit unnecessary jargon.
- Focus on what the user most likely wants to know first.
- Avoid long lists unless they are essential.
- Never repeat information.
"""
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=[prompt],
    )
    
    return response.text

if __name__ == "__main__":
    asyncio.run(ingest_knowledge())