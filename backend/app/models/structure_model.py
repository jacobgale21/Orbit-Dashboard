
import uuid
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import String, Float
from app.database import Base
from sqlalchemy import JSON
from sqlalchemy.ext.mutable import MutableDict
from typing import Any

class Structure(Base):
    __tablename__ = "structures"

    id: Mapped[uuid.UUID] = mapped_column(
        sa.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    mass: Mapped[dict[str, Any] | None] = mapped_column(
        MutableDict.as_mutable(JSON), 
        nullable=True, 
        default=None
    )
    volume: Mapped[dict[str, Any] | None] = mapped_column(
        MutableDict.as_mutable(JSON), 
        nullable=True, 
        default=None
    )
    gravity: Mapped[float | None] = mapped_column(Float, nullable=True)
    escape: Mapped[float | None] = mapped_column(Float, nullable=True)
    temperature: Mapped[float | None] = mapped_column(Float, nullable=True)
    period: Mapped[float | None] = mapped_column(Float, nullable=True)
    distance: Mapped[float | None] = mapped_column(Float, nullable=True)  # light years
    image_url: Mapped[str | None] = mapped_column(String(255), nullable=True)
    type_planet: Mapped[str | None] = mapped_column(String(100), nullable=True)
    glow: Mapped[str | None] = mapped_column(String(100), nullable=True)
    tagline: Mapped[str | None] = mapped_column(String(255), nullable=True)
    fact: Mapped[str | None] = mapped_column(String(255), nullable=True)
    eccentricity: Mapped[float | None] = mapped_column(Float, nullable=True)
    semimajoraxis: Mapped[float | None] = mapped_column(Float, nullable=True)
    inclination: Mapped[float | None] = mapped_column(Float, nullable=True)
    # atmosphere / resources later when you have data