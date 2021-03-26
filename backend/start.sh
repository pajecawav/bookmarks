#!/bin/sh

alembic upgrade head
python -m app.db.init_db
uvicorn --workers 4 --host 0.0.0.0 --root-path "/api" app.main:app $@
