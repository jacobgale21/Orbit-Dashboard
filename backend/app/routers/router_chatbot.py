from fastapi import APIRouter, Depends
from app.services.chatbot.chatbot_services import NavigationIndex
from app.schemas.chatbot_schemas import ChatbotOut
from app.services.rate_limit import rate_limit_chat
from app.schemas.user_schemas import UserResponse
from app.schemas.chatbot_schemas import ChatbotIn
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.services.chatbot.create_embedding import handle_question
router = APIRouter()

@router.post("/chat")
async def get_chatbot_response(
    body: ChatbotIn,user: UserResponse = Depends(rate_limit_chat), session: AsyncSession = Depends(get_db)) -> ChatbotOut:

    return await handle_question(body.message, session)