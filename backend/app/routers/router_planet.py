from fastapi import APIRouter
from app.services.planet_services import get_all_structures, get_structure_by_name, get_orbit_data
from app.schemas.user_schemas import UserResponse
from fastapi import Depends
from app.services.services import get_current_user

router = APIRouter()

@router.get("/structures")
async def get_structures(user: UserResponse = Depends(get_current_user), view: str = "default"):
    if view == "default":
        return await get_all_structures()
    elif view == "orbit":
        return await get_orbit_data()
    else:
        raise HTTPException(status_code=400, detail="Invalid view")

@router.get("/structures/{name}")
async def get_structure(name: str, user: UserResponse = Depends(get_current_user)):
    return await get_structure_by_name(name)