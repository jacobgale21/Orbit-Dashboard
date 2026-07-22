import uuid
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import String, Float
from app.database import Base
from sqlalchemy import JSON
from sqlalchemy.ext.mutable import MutableDict
from typing import Any


class Discovery(Base):
    __tablename__ = "discoveries" 
    id: Mapped[uuid.UUID] = mapped_column(
        sa.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    subtitle: Mapped[str] = mapped_column(String(100), nullable=True)
    year: Mapped[str] = mapped_column(String(100), nullable=True)
    icon: Mapped[str] = mapped_column(String(100), nullable=True)
    color: Mapped[str] = mapped_column(String(100), nullable=True)
    glow: Mapped[str] = mapped_column(String(100), nullable=True)
    description: Mapped[str] = mapped_column(String(255), nullable=True)
    impact: Mapped[str] = mapped_column(String(255), nullable=True)
    details: Mapped[dict[str, Any] | None] = mapped_column(
        MutableDict.as_mutable(JSON), 
        nullable=True, 
        default=None
    )