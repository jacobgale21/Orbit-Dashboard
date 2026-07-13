from argon2 import PasswordHasher
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user_models import User
from app.schemas.user_schemas import UserCreate, UserLogin
from fastapi import HTTPException

ph = PasswordHasher()

async def create_user(db: AsyncSession, user_in: UserCreate) -> User:

    try:

        existing_user = await db.execute(select(User).where((User.email == user_in.email) | (User.username == user_in.username)))

        if existing_user.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="User already exists")
            
        password_hash = ph.hash(user_in.password.get_secret_value())
        new_user = User(email=user_in.email, username=user_in.username, password=password_hash)

        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        
        return new_user

    except Exception as e:
        await db.rollback()
        print("Error creating user:", e)

async def login_user(db: AsyncSession, user_in: UserLogin) -> User:
    try:
        existing_user = await db.execute(select(User).where(User.username == user_in.username))
        user = existing_user.scalar_one_or_none()
        if not user:
            raise HTTPException(status_code=400, detail="Invalid username or password")
        if not ph.verify(user.password, user_in.password.get_secret_value()):
            raise HTTPException(status_code=400, detail="Invalid username or password")
        return user
    except Exception as e:
        print("Error logging in user:", e)
        raise HTTPException(status_code=500, detail=str(e))