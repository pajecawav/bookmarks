from fastapi import APIRouter

from app.api.endpoints import links, login, tags, users

api_router = APIRouter()

api_router.include_router(login.router, prefix="/login", tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(links.router, prefix="/links", tags=["links"])
api_router.include_router(tags.router, prefix="/tags", tags=["tags"])
