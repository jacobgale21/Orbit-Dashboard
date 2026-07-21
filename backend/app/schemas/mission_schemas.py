from pydantic import BaseModel, Field, ConfigDict
import uuid
import datetime
class MissionOut(BaseModel):
    id: uuid.UUID
    external_id: uuid.UUID
    name: str
    image_url: str | None = None
    thumbnail_url: str | None = None
    status: str | None = None
    launch_date: datetime.datetime | None = None
    description: str | None = None
    agency: str | None = None
    rocket: str | None = None
    destination: str | None = None
    launch_site: str | None = None
    model_config = ConfigDict(from_attributes=True)