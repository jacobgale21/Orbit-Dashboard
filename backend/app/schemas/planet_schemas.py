# app/schemas/structure_schemas.py
from pydantic import BaseModel, Field

class StructureIngest(BaseModel):
    name: str
    mass: float | None = None
    volume: float | None = None
    gravity: float | None = None
    escape: float | None = Field(default=None, alias="escape")  # map to escape_velocity
    temperature: float | None = None
    period: float | None = None
    distance_light_year: float | None = None

    model_config = {"populate_by_name": True}