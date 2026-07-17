from app.schemas.planet_schemas import StructureOut
from app.database import SessionLocal
from app.models.structure_model import Structure
from sqlalchemy import select
from fastapi import HTTPException

async def get_all_structures() -> list[StructureOut]:
    try:
        async with SessionLocal() as session:
            structures = await session.execute(select(Structure))
            return [StructureOut.model_validate(structure) for structure in structures.scalars().all()]
    except Exception as e:
        print(f"Error getting structures: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting structures: {e}")

async def get_structure_by_name(name: str) -> StructureOut:
    try:
        async with SessionLocal() as session:
            structure = await session.execute(select(Structure).where(Structure.name == name))
            return StructureOut.model_validate(structure.scalar_one())
    except Exception as e:
        print(f"Error getting structure: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting structure: {e}")