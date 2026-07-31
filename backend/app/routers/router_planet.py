from fastapi import APIRouter
from app.services.planet_services import get_all_structures, get_structure_by_name, get_orbit_data, get_moon_data, get_planet_data
from app.schemas.user_schemas import UserResponse
from fastapi import Depends
from app.services.services import get_current_user
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db


router = APIRouter()

@router.get("/structures")
async def get_structures(user: UserResponse = Depends(get_current_user), view: str = "default", structure_type: str = "all", session: AsyncSession = Depends(get_db)):
    if structure_type == "moon":
        return await get_moon_data(session)
    elif view == "orbit":
        return await get_orbit_data(session)
    elif structure_type == "planet":
        return await get_planet_data(session)
    elif view == "default" and structure_type == "all":
        return await get_all_structures(session)
    else:
        raise HTTPException(status_code=400, detail="Invalid structure type")

@router.get("/structures/{name}")
async def get_structure(name: str, user: UserResponse = Depends(get_current_user), session: AsyncSession = Depends(get_db)):
    return await get_structure_by_name(name, session)