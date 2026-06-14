import os
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv


ENV_PATH = Path(__file__).resolve().parent / ".env"
load_dotenv(ENV_PATH)


class Config:
    MONGO_URI = os.getenv("MONGO_URI")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    DATABASE_NAME = os.getenv("DATABASE_NAME", "finsight_ai")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(
        minutes=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES_MINUTES", "30"))
    )
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(
        days=int(os.getenv("JWT_REFRESH_TOKEN_EXPIRES_DAYS", "7"))
    )

    MAX_CONTENT_LENGTH = int(os.getenv("MAX_CONTENT_LENGTH", str(16 * 1024 * 1024)))
    CORS_ORIGINS = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:3000,http://localhost:5173,http://127.0.0.1:5500",
    )
    RATE_LIMIT_DEFAULT = os.getenv("RATE_LIMIT_DEFAULT", "200 per day,50 per hour")
    RATELIMIT_STORAGE_URI = os.getenv("RATELIMIT_STORAGE_URI", "memory://")
    ACCOUNT_LOCKOUT_ATTEMPTS = int(os.getenv("ACCOUNT_LOCKOUT_ATTEMPTS", "5"))
    ACCOUNT_LOCKOUT_MINUTES = int(os.getenv("ACCOUNT_LOCKOUT_MINUTES", "15"))
    SECURITY_HEADERS_ENABLED = os.getenv("SECURITY_HEADERS_ENABLED", "true").lower() in {
        "1",
        "true",
        "yes",
    }

    @classmethod
    def validate(cls):
        missing = [
            name
            for name in ("MONGO_URI", "GEMINI_API_KEY", "JWT_SECRET_KEY")
            if not getattr(cls, name)
        ]

        if missing:
            raise RuntimeError(
                "Missing required environment variables: " + ", ".join(missing)
            )

        if cls.JWT_SECRET_KEY and len(cls.JWT_SECRET_KEY) < 32:
            raise RuntimeError("JWT_SECRET_KEY must be at least 32 characters long")


config = Config()
