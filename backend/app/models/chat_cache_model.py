import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import String, Float, Text
from app.database import Base
from sqlalchemy import Index, JSON
from sqlalchemy.ext.mutable import MutableDict
from typing import Any
import uuid
import datetime
from sqlalchemy.sql import func
from pgvector.sqlalchemy import Vector

class ChatResponseCache(Base):
  __tablename__ = "chat_response_cache"
  id: Mapped[uuid.UUID] = mapped_column(
    sa.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
  )
  question_norm: Mapped[str] = mapped_column(Text, nullable=False)
  question_hash: Mapped[str] = mapped_column(sa.String(64), unique=True)
  question_embedding: Mapped[list[float]] = mapped_column(Vector(768), nullable=False)
  response: Mapped[str] = mapped_column(Text, nullable=False)
  hit_count: Mapped[int] = mapped_column(sa.Integer, nullable=False, default=0) 
  type_of_response: Mapped[str] = mapped_column(sa.String(255), nullable=False)
  path: Mapped[str] = mapped_column(sa.String(255), nullable=False)
  created_at: Mapped[datetime.datetime] = mapped_column(sa.DateTime(timezone=True), default=func.now())
  last_hit_at: Mapped[datetime.datetime] = mapped_column(sa.DateTime(timezone=True), default=func.now())
  expires_at: Mapped[datetime.datetime] = mapped_column(sa.DateTime(timezone=True), nullable=True) 

__table_args__ = (
        Index(
            "chat_cache_embedding_idx",
            "question_embedding",
            postgresql_using="hnsw",
            postgresql_ops={"question_embedding": "vector_cosine_ops"}
        ),
)