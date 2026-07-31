from app.schemas.mission_schemas import MissionOut
from app.database import SessionLocal
from app.models.mission_model import Mission
from sqlalchemy import select
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

async def get_all_missions(session: AsyncSession) -> list[MissionOut]:
    try:
        missions = await session.execute(select(Mission))
        return [MissionOut.model_validate(mission) for mission in missions.scalars().all()]
    except Exception as e:
        print(f"Error getting missions: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting missions: {e}")