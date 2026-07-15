from argon2 import PasswordHasher
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user_models import User
from app.schemas.user_schemas import UserCreate, UserLogin, UserResponse
from fastapi import HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
import os
from dotenv import load_dotenv
from app.database import get_db

load_dotenv()
ph = PasswordHasher()
security = HTTPBearer()
# Create a new user when a user registers
async def create_user(db: AsyncSession, user_in: UserCreate) -> UserResponse:

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

# Create access token for a user
async def create_access_token(user_id: str) -> str:
    try:
        expiration = datetime.now(timezone.utc) + timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")))
        payload = {
            "sub": user_id,
            "type": "access",
            "exp": expiration
        }
        return jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm=os.getenv("JWT_ALGORITHM"))
    except Exception as e:
        print("Error creating access token:", e)
        raise HTTPException(status_code=500, detail=str(e))

# Create refresh token for a user
async def create_refresh_token(user_id: str) -> str:
    try:
        expiration = datetime.now(timezone.utc) + timedelta(days=int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS")))
        payload = {
            "sub": user_id,
            "type": "refresh",
            "exp": expiration
        }
        return jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm=os.getenv("JWT_ALGORITHM"))
    except Exception as e:
        print("Error creating refresh token:", e)
        raise HTTPException(status_code=500, detail=str(e))

# Used for loggin in a user
async def login_user(db: AsyncSession, user_in: UserLogin) -> User:
    try:
        existing_user = await db.execute(select(User).where(User.username == user_in.username))
        user = existing_user.scalar_one_or_none()
        if not user:
            raise HTTPException(status_code=400, detail="Invalid username or password")
        if not ph.verify(user.password, user_in.password.get_secret_value()):
            raise HTTPException(status_code=400, detail="Invalid username or password")
    
        return {"access_token": await create_access_token(str(user.id)),
        "refresh_token": await create_refresh_token(str(user.id)),
        "token_type": "bearer"}
    except Exception as e:
        print("Error logging in user:", e)
        raise HTTPException(status_code=500, detail=str(e))

# Get current user
async def get_current_user(db: AsyncSession = Depends(get_db), creds: HTTPAuthorizationCredentials = Depends(security)) -> UserResponse:
    try:
        payload = jwt.decode(creds.credentials, os.getenv("JWT_SECRET"), algorithms=[os.getenv("JWT_ALGORITHM")])
        if payload["type"] != "access":
            raise HTTPException(status_code=401, detail="Invalid token")
        user_id = payload["sub"]
        user = await db.execute(select(User).where(User.id == user_id))
        return user.scalar_one_or_none()
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        print("Error getting current user:", e)
        raise HTTPException(status_code=500, detail=str(e))

async def refresh_token_auth(refresh_token: str):
    try:
        payload = jwt.decode(refresh_token, os.getenv("JWT_SECRET"), algorithms=[os.getenv("JWT_ALGORITHM")])
        if payload["type"] != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token")
        return {
            "access_token": await create_access_token(payload["sub"]),
            "token_type": "bearer",
        }
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        print("Error refreshing token:", e)
        raise HTTPException(status_code=500, detail=str(e))