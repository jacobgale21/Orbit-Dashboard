from app.services.chatbot.chunk import Chunk
from typing import List
import json
from pathlib import Path
from app.services.chatbot.create_documents import technology_to_document, future_theory_to_document, roadblock_to_document
from app.services.chatbot.create_documents import structures_to_documents, missions_to_documents, discoveries_to_documents
from app.database import SessionLocal
from sqlalchemy import select
from app.models.structure_model import Structure
from app.schemas.planet_schemas import StructureDocument
from app.models.mission_model import Mission
from app.schemas.mission_schemas import MissionDocument
from app.models.discovery_model import Discovery
from app.schemas.discovery_schemas import DiscoveryDocument
import asyncio

def create_technology_chunks() -> List[Chunk]:
    chunks = []
    with open( "./app/data/chatbot/roadmap.json") as f:
        roadmap = json.load(f)
    for entity in roadmap:
        if entity["entityType"] == "technology":
            document = technology_to_document(entity)
            chunks.append(Chunk(source_type="technology", source_id=entity["id"], path="/future", title=entity["title"], content=document))
    return chunks

def create_roadblock_chunks() -> List[Chunk]:
    chunks = []
    with open( "./app/data/chatbot/roadblock.json") as f:
        roadblock = json.load(f)
    for entity in roadblock:
        document = roadblock_to_document(entity)
        chunks.append(Chunk(source_type="roadblock", source_id=entity["id"], path="/map", title=entity["title"], content=document))
    return chunks

def create_future_theory_chunks() -> List[Chunk]:
    chunks = []
    with open( "./app/data/chatbot/roadmap.json") as f:
        future_theory = json.load(f)
    for entity in future_theory:
        if entity["entityType"] == "milestone":
            document = future_theory_to_document(entity)
            chunks.append(Chunk(source_type="future_theory", source_id=entity["id"], path="/future", title=entity["title"], content=document))
    return chunks

async def create_structures_chunks() -> List[Chunk]:
    chunks = []
    async with SessionLocal() as session:
        structures = (await session.execute(select(Structure))).scalars().all()
        for entity in structures:
            document = structures_to_documents(StructureDocument.model_validate(entity))
            chunks.append(Chunk(source_type="structure", source_id=entity.id, path="destinations", title=entity.name, content=document))
    return chunks

async def create_missions_chunks() -> List[Chunk]:
    chunks = []
    async with SessionLocal() as session:
        missions = await session.execute(select(Mission))
        for entity in missions:
            document = missions_to_documents(MissionDocument.model_validate(entity.scalar_one()))
            chunks.append(Chunk(source_type="mission", source_id=entity.id, path="missions", title=entity.name, content=document))
    return chunks

async def create_discoveries_chunks() -> List[Chunk]:
    chunks = []
    async with SessionLocal() as session:
        discoveries = await session.execute(select(Discovery))
        for entity in discoveries:
            print(entity)
            print(entity.scalar_one())
            document = discoveries_to_documents(DiscoveryDocument.model_validate(entity.scalar_one()))
            chunks.append(Chunk(source_type="discovery", source_id=entity.id, path="discoveries", title=entity.name, content=document))
    return chunks

if __name__ == "__main__":
    print(json.dumps([chunk.to_dict() for chunk in asyncio.run(create_structures_chunks())], indent=4))
