import pathlib

from pydantic import AnyHttpUrl, BaseSettings, EmailStr, validator
from typing import List, Optional, Union
from dotenv import load_dotenv
import os


# Load .env file
load_dotenv()

# Use the commented out print's if you're having issues with you.env file.

# print("Debugging DOTENV_POSTGRES_PATH:", os.environ.get("DOTENV_POSTGRES_PATH"))
# print("Debugging DOTENV_JWT_SECRET:", os.environ.get("DOTENV_JWT_SECRET"))
# print("Debugging DOTENV_ALGORITHM:", os.environ.get("DOTENV_ALGORITHM"))

# Project Directories
ROOT = pathlib.Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    JWT_SECRET = os.environ.get("DOTENV_JWT_SECRET")
    ALGORITHM = os.environ.get("DOTENV_ALGORITHM")

    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8

    # BACKEND_CORS_ORIGINS is a JSON-formatted list of origins
    # e.g: '["http://localhost", "http://localhost:4200", "http://localhost:3000", \
    # "http://localhost:8080", "http://local.dockertoolbox.tiangolo.com"]'
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",
        "http://localhost:8001",
        "http://localhost:5173",  # type: ignore
    ]

    # # Origins that match this regex OR are in the above list are allowed
    BACKEND_CORS_ORIGIN_REGEX: Optional[
        str
    ] = "https.*\.(netlify.app|herokuapp.com)"  # noqa: W605

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    SQLALCHEMY_DATABASE_URI: Optional[str] = os.environ.get("DOTENV_POSTGRES_PATH")
    FIRST_SUPERUSER_EMAIL: EmailStr = os.environ.get(
        "DOTENV_FIRST_SUPERUSER_EMAIL"
    )  # Fixed name
    FIRST_SUPERUSER_PW: str = os.environ.get("DOTENV_FIRST_SUPERUSER_PW")  # Fixed name

    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def validate_db_uri(cls, value):
        if not value:
            raise ValueError("Database URI must be set")
        return value

    class Config:
        case_sensitive = True


settings = Settings()
