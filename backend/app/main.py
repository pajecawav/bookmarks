from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import api
from app.config import settings

app = FastAPI(title="Bookmarks")

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


app.include_router(api.api_router)
