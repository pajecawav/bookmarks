from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

if TYPE_CHECKING:
    from app.models import Link  # noqa: F401

from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False, unique=True)
    password_hashed = Column(String, nullable=False)
    is_superuser = Column(Boolean, nullable=False, default=False)

    links = relationship(
        "Link", back_populates="user", lazy="dynamic", order_by="desc(Link.date_added)"
    )
