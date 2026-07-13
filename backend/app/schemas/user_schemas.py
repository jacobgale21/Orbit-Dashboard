#Pydantic models for user functions: registration, login, logout, tokens, etc.
from pydantic import BaseModel, EmailStr, Field, SecretStr
import uuid
import datetime
from pydantic import ConfigDict


class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr = Field(..., format="email")
    password: SecretStr = Field(..., min_length=8)

class UserLogin(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: SecretStr = Field(..., min_length=8)

class UserResponse(UserCreate):
    id: uuid.UUID
    is_active: bool
    last_login: datetime.datetime | None
    created_at: datetime.datetime
    updated_at: datetime.datetime

    model_config = ConfigDict(from_attributes=True)