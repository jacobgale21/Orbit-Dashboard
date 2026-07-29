from pydantic import BaseModel, ConfigDict

class ChatbotIn(BaseModel):
    message: str

class ChatbotOut(BaseModel):
    type_of_response: str | None = None
    path: str | None = None
    response: str
    model_config = ConfigDict(from_attributes=True)