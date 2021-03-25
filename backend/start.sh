#!/usr/bin/env sh

python -m app.pre_start
alembic upgrade head
python -m app.db.init_db
uvicorn app.main:app --host=0.0.0.0 --root-path /api
