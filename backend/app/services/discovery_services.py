from app.schemas.discovery_schemas import DiscoveryOut
from app.database import SessionLocal
from app.models.discovery_model import Discovery
from sqlalchemy import select
from fastapi import HTTPException

async def get_all_discoveries() -> list[DiscoveryOut]:
    try:
        async with SessionLocal() as session:
            discoveries = await session.execute(select(Discovery))
            return [DiscoveryOut.model_validate(discovery) for discovery in discoveries.scalars().all()]
    except Exception as e:
        print(f"Error getting discoveries: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting discoveries: {e}")