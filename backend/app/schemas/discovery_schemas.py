from pydantic import BaseModel, ConfigDict
import uuid
from typing import Any
class DiscoveryOut(BaseModel):
    id: uuid.UUID
    name: str
    subtitle: str | None = None
    year: str | None = None
    icon: str | None = None
    color: str | None = None
    glow: str | None = None
    description: str | None = None
    impact: str | None = None
    details: dict[str, Any] | None = None
    model_config = ConfigDict(from_attributes=True)