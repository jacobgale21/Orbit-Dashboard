from app.schemas.planet_schemas import StructureOut, OrbitData, MoonData
from app.database import SessionLocal
from app.models.structure_model import Structure
from sqlalchemy import select
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession


async def get_all_structures(session: AsyncSession) -> list[StructureOut]:
    try:
        structures = await session.execute(select(Structure))
        return [StructureOut.model_validate(structure) for structure in structures.scalars().all()]
    except Exception as e:
        print(f"Error getting structures: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting structures: {e}")

async def get_structure_by_name(name: str, session: AsyncSession) -> StructureOut:
    try:
        structure = await session.execute(select(Structure).where(Structure.name == name))
        return StructureOut.model_validate(structure.scalar_one())
    except Exception as e:
        print(f"Error getting structure: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting structure: {e}")

async def get_orbit_data(session: AsyncSession) -> list[OrbitData]:
    try:
        orbit_data = await session.execute(select(Structure).where(Structure.type_planet != "Moon"))
        return [OrbitData.model_validate(orbit_data) for orbit_data in orbit_data.scalars().all()]
    except Exception as e:
        print(f"Error getting orbit data: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting orbit data: {e}")

async def get_moon_data(session: AsyncSession) -> list[MoonData]:
    try:
        moon_data = await session.execute(select(Structure).where(Structure.type_planet == "Moon"))
        return [MoonData.model_validate(moon_data) for moon_data in moon_data.scalars().all()]
    except Exception as e:
        print(f"Error getting moon data: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting moon data: {e}")

async def get_planet_data(session: AsyncSession) -> list[StructureOut]:
    try:
        planet_data = await session.execute(select(Structure).where(Structure.type_planet != "Moon"))
        return [StructureOut.model_validate(planet_data) for planet_data in planet_data.scalars().all()]
    except Exception as e:
        print(f"Error getting planet data: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting planet data: {e}")