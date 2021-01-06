from datetime import datetime
from typing import Optional

from pydantic import BaseModel, HttpUrl


class LinkCreate(BaseModel):
    url: HttpUrl


class Link(BaseModel):
    id: int
    url: str
    title: str
    liked: bool
    archived: bool
    date_added: datetime

    class Config:
        orm_mode = True


class LinkUpdate(BaseModel):
    url: Optional[str]
    title: Optional[str]
