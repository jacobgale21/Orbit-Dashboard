from fastapi import APIRouter
from app.services.mission_services import get_all_missions
from app.schemas.user_schemas import UserResponse
from fastapi import Depends
from app.services.services import get_current_user
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db

router = APIRouter()

@router.get("/missions")
async def get_missions(user: UserResponse = Depends(get_current_user), session: AsyncSession = Depends(get_db)):
    return await get_all_missions(session)