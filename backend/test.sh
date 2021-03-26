#!/bin/sh

# exit in case of an error
set -e

docker-compose down --remove-orphans

docker-compose build --build-arg INSTALL_DEV=true db backend
docker-compose up -d db backend
docker-compose exec -T backend pytest --cov=app --cov-report=term-missing app/tests "${@}"
docker-compose down --remove-orphans
