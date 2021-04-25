#!/bin/sh

alembic upgrade head
python -m app.db.init_db
uvicorn --workers ${NUM_WORKERS:-1} --host 0.0.0.0 --root-path "/api" app.main:app $@
