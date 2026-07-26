from fastapi import APIRouter
from app.services.planet_services import get_all_structures, get_structure_by_name, get_orbit_data, get_moon_data, get_planet_data
from app.schemas.user_schemas import UserResponse
from fastapi import Depends
from app.services.services import get_current_user

router = APIRouter()

@router.get("/structures")
async def get_structures(user: UserResponse = Depends(get_current_user), view: str = "default", structure_type: str = "all"):
    if structure_type == "moon":
        return await get_moon_data()
    elif view == "orbit":
        return await get_orbit_data()
    elif structure_type == "planet":
        return await get_planet_data()
    elif view == "default" and structure_type == "all":
        return await get_all_structures()
    else:
        raise HTTPException(status_code=400, detail="Invalid structure type")

@router.get("/structures/{name}")
async def get_structure(name: str, user: UserResponse = Depends(get_current_user)):
    return await get_structure_by_name(name)