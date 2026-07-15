from fastapi import APIRouter
from app.schemas.user_schemas import UserCreate, UserLogin, UserResponse, RefreshRequest
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from app.database import get_db
from app.services.services import create_user, login_user, get_current_user, refresh_token_auth

router = APIRouter()


@router.get("/")
async def read_root():
    return {"message": "Hello, World!"}


@router.post("/register")
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    new_user = await create_user(db, user)
    return {"message": "User registered successfully", "user": new_user}

@router.post("/login")
async def login(user: UserLogin, db: AsyncSession = Depends(get_db)):
    tokens = await login_user(db, user)
    return tokens

@router.get("/current-user")
async def read_current_user(user: UserResponse = Depends(get_current_user)):
    return {"message": "Current user", "user": user}

@router.post("/refresh")
async def refresh(body: RefreshRequest):  
    return await refresh_token_auth(body.refresh_token)