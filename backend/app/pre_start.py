from tenacity import retry, stop_after_attempt, wait_fixed

from app.db.database import SessionLocal

max_tries = 60 * 5
wait_seconds = 1


@retry(
    stop=stop_after_attempt(max_tries),
    wait=wait_fixed(wait_seconds),
)
def init() -> None:
    db = SessionLocal()
    # try to create session to check if DB is awake
    db.execute("SELECT 1")


if __name__ == "__main__":
    init()
