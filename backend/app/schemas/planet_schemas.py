# app/schemas/structure_schemas.py
from pydantic import BaseModel, Field, ConfigDict
import uuid
class StructureIngest(BaseModel):
    name: str
    mass: dict | None = None
    vol: dict | None = None
    gravity: float | None = None
    escape: float | None = Field(default=None, alias="escape")  # map to escape_velocity
    temperature: float | None = None
    period: float | None = None
    distance_light_year: float | None = None

    model_config = {"populate_by_name": True}

class StructureOut(BaseModel):
    id: uuid.UUID
    name: str
    mass: dict | None = None
    volume: dict | None = None
    gravity: float | None = None
    escape: float | None = None
    temperature: float | None = None
    period: float | None = None
    distance: float | None = None
    image_url: str | None = None
    type_planet: str | None = None
    glow: str | None = None
    tagline: str | None = None
    fact: str | None = None
    model_config = ConfigDict(from_attributes=True)

class OrbitData(BaseModel):
    id: uuid.UUID
    name: str
    semimajoraxis: float | None = None
    eccentricity: float | None = None
    inclination: float | None = None
    glow: str | None = None
    period: float | None = None
    model_config = ConfigDict(from_attributes=True)