from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr, Field
import os
from dotenv import load_dotenv
load_dotenv()

class Settings(BaseSettings):
    DATABASE_URL: str 
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"  # Ignores extra variables in the .env file
    )

settings = Settings(DATABASE_URL=os.getenv("DATABASE_URL"))