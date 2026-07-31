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

async def search_chunks(db: AsyncSession = Depends(get_db), query: str, k: int = 5):
    qvec = embed_query(query)
    result = await db.execute(
        select(KnowledgeChunk)
        .order_by(KnowledgeChunk.embedding.cosine_distance(qvec))
        .limit(k)
    )
    return result.scalars().all()

if __name__ == "__main__":
    asyncio.run(ingest_knowledge())