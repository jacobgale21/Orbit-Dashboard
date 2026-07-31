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

def test_technology_to_document():
    with open( "./app/data/chatbot/roadmap.json") as f:
        roadmap = json.load(f)
    for entity in roadmap:
        if entity["entityType"] == "technology":
            document = technology_to_document(entity)
            print(document)
            break
def test_future_theory_to_document():
    with open( "./app/data/chatbot/roadmap.json") as f:
        roadblock = json.load(f)
    for entity in roadblock:
        if entity["entityType"] == "milestone":
            document = future_theory_to_document(entity)
            print(document)
            break

def test_roadblock_to_document():
    with open( "./app/data/chatbot/roadblock.json") as f:
        roadblock = json.load(f)
    for entity in roadblock:
        document = roadblock_to_document(entity)
        print(document)
        break

async def test_structures_to_documents(name: str):
    try:
        async with SessionLocal() as session:
            structures = await session.execute(select(Structure).where(Structure.name == name))
            return structures_to_documents(StructureDocument.model_validate(structures.scalar_one()))

    except Exception as e:
        print(f"Error getting structure: {e}")
        raise Exception(f"Error getting structure: {e}")

async def test_missions_to_documents(name: str):
    try:
        async with SessionLocal() as session:
            missions = await session.execute(select(Mission).where(Mission.name == name))
            return missions_to_documents(MissionDocument.model_validate(missions.scalar_one()))
    except Exception as e:
        print(f"Error getting mission: {e}")
        raise Exception(f"Error getting mission: {e}")

async def test_discoveries_to_documents(name: str):
    try:
        async with SessionLocal() as session:
            discoveries = await session.execute(select(Discovery).where(Discovery.name == name))
            return discoveries_to_documents(DiscoveryDocument.model_validate(discoveries.scalar_one()))
    except Exception as e:
        print(f"Error getting discovery: {e}")
        raise Exception(f"Error getting discovery: {e}")

if __name__ == "__main__":
    # print(asyncio.run(test_discoveries_to_documents("Heliospheric Cosmic Rays")))
    # print(asyncio.run(test_structures_to_documents("Moon")))
    # print(asyncio.run(test_missions_to_documents("Apollo 11")))
    # print(test_technology_to_document())
    # print(test_future_theory_to_document())
    # print(test_roadblock_to_document())