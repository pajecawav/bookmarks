from fastapi import FastAPI

from app.api import api
from app.config import settings

app = FastAPI()

app.include_router(api.api_router, prefix=settings.API_ROUTE)
