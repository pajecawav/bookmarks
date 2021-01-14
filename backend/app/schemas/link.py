from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, HttpUrl

from app.schemas.tag import Tag, TagCreate


class LinkCreate(BaseModel):
    title: Optional[str]
    url: HttpUrl


class Link(BaseModel):
    id: int
    url: str
    title: str
    liked: bool
    archived: bool
    date_added: datetime
    tags: List[Tag]

    class Config:
        orm_mode = True


class LinkUpdate(BaseModel):
    url: Optional[HttpUrl]
    title: Optional[str]
    tags: Optional[List[TagCreate]]
