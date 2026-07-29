from fastapi import APIRouter, Depends
from app.services.chatbot_services import NavigationIndex
from app.schemas.chatbot_schemas import ChatbotOut
from app.services.services import get_current_user
from app.schemas.user_schemas import UserResponse
from app.schemas.chatbot_schemas import ChatbotIn
router = APIRouter()

@router.post("/chat")
def get_chatbot_response(
    body: ChatbotIn,
    user: UserResponse = Depends(get_current_user),
) -> ChatbotOut:
    intent = NavigationIndex("./app/data/chatbot_data.json").search(body.message)
    return ChatbotOut(
        type_of_response=intent["type_of_response"],
        path=intent["path"],
        response=intent["response"],
    )