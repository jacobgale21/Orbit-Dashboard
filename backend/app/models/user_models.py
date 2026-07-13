#Neon DB models for users
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column
import uuid
import sqlalchemy as sa
from app.database import Base
import datetime


class User(Base):
    __tablename__ = "users"
    id: Mapped[uuid.UUID] = mapped_column(
        sa.UUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4
    )
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    last_login: Mapped[datetime.datetime] = mapped_column(sa.DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime.datetime] = mapped_column(sa.DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime.datetime] = mapped_column(sa.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())