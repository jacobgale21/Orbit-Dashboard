import uuid
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import String, Float, DateTime
from app.database import Base
from sqlalchemy import JSON
from sqlalchemy.ext.mutable import MutableDict
from typing import Any
import datetime
from sqlalchemy import Text
class Mission(Base):
    __tablename__ = "missions"

    id: Mapped[uuid.UUID] = mapped_column(
        sa.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    external_id: Mapped[uuid.UUID] = mapped_column(
        sa.UUID(as_uuid=True), unique=True, index=True
    )
    name: Mapped[str] = mapped_column(String(100), nullable=True)
    image_url: Mapped[str | None] = mapped_column(String(255), nullable=True)
    thumbnail_url: Mapped[str | None] = mapped_column(String(255), nullable=True)
    status: Mapped[str | None] = mapped_column(String(100), nullable=True)
    launch_date: Mapped[datetime.datetime | None] = mapped_column(DateTime, nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    agency: Mapped[str | None] = mapped_column(String(100), nullable=True)
    rocket: Mapped[str | None] = mapped_column(String(100), nullable=True)
    destination: Mapped[str | None] = mapped_column(String(100), nullable=True)
    launch_site: Mapped[str | None] = mapped_column(String(255), nullable=True)