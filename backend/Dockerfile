FROM python:3.7-slim-buster

WORKDIR /app
COPY ./pyproject.toml ./poetry.lock* /app/

RUN apt-get update && apt-get install curl -y && \
    curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    cd /app && \
    poetry config virtualenvs.create false && \
    poetry install --no-dev && \
    rm -rf /var/lib/apt/lists/* ** && \
    rm -rf /opt/poetry

COPY . .

EXPOSE 8000
CMD ["sh", "start.sh"]
