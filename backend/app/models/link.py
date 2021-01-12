from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

if TYPE_CHECKING:
    from app.models import User  # noqa: F401

from app.db.database import Base


class Link(Base):
    __tablename__ = "links"

    id = Column(Integer, primary_key=True)
    url = Column(String, nullable=False)
    title = Column(String, nullable=False)
    archived = Column(Boolean, nullable=False, default=False)
    liked = Column(Boolean, nullable=False, default=False)
    date_added = Column(DateTime, nullable=False, default=datetime.utcnow)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="links")
