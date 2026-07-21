from app.schemas.mission_schemas import MissionOut
from app.database import SessionLocal
from app.models.mission_model import Mission
from sqlalchemy import select
from fastapi import HTTPException

async def get_all_missions() -> list[MissionOut]:
    try:
        async with SessionLocal() as session:
            missions = await session.execute(select(Mission))
            return [MissionOut.model_validate(mission) for mission in missions.scalars().all()]
    except Exception as e:
        print(f"Error getting missions: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting missions: {e}")