from fastapi import APIRouter
from app.services.discovery_services import get_all_discoveries
from app.schemas.user_schemas import UserResponse
from fastapi import Depends
from app.services.services import get_current_user

router = APIRouter()

@router.get("/discoveries")
async def get_missions(user: UserResponse = Depends(get_current_user)):
    return await get_all_discoveries()