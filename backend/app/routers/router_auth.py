from fastapi import APIRouter
from app.schemas.user_schemas import UserCreate, UserLogin
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from app.database import get_db
from app.services.services import create_user, login_user

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
    user = await login_user(db, user)
    return {"message": "User logged in successfully", "user": user}