from sqlalchemy.orm import Session

from app.db import base  # noqa: F401
from app.db.database import Base, SessionLocal, engine


def init_db(db: Session) -> None:
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db(SessionLocal())
