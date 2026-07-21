from fastapi import APIRouter
from app.services.mission_services import get_all_missions
from app.schemas.user_schemas import UserResponse
from fastapi import Depends
from app.services.services import get_current_user

router = APIRouter()

@router.get("/missions")
async def get_missions(user: UserResponse = Depends(get_current_user)):
    return await get_all_missions()