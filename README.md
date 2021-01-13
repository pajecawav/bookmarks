# Bookmarks

Bookmarks is an attempt to copy [Instapaper](https://www.instapaper.com/). Live demo available at https://bookmarks.elif.pw.

It uses [FastAPI](https://github.com/tiangolo/fastapi) for backend and [React](https://github.com/facebook/react) for frontend. Also installable as a [PWA](https://web.dev/progressive-web-apps/) and can be used as a [web share target](https://w3c.github.io/web-share-target/).

# Installation

1.  Install [poetry](https://python-poetry.org/docs/#installation) and [npm](https://www.npmjs.com/get-npm)

1.  Clone project

    ```bash
    git clone https://github.com/pajecawav/bookmarks/
    ```

1.  `cd` into backend folder

    ```bash
    cd bookmarks/backend
    ```

1.  Install server dependencies (you can specify that you do not want the development dependencies installed with `--no-dev` option)

    ```bash
    poetry install
    ```

1.  Create `.env` file or use environment variables (see `.env.example` file for reference)

1.  Spawn shell within the virtual environment

    ```bash
    poetry shell
    ```

1.  Initialize database

    ```bash
    python -m app.db.init_db
    ```

1.  `cd` into frontend folder

    ```bash
    cd ../frontend
    ```

1.  Install frontend dependencies

    ```bash
    npm install
    ```

# Usage

1.  From `backend` folder spawn shell within the virtual environment and start [uvicorn](https://github.com/encode/uvicorn) server

    ```bash
    poetry shell
    uvicorn app.main:app
    ```

1.  From `frontend` folder start development server with `npm start`.

1.  Navigate to `http://localhost:3000`.

For deployment options consider using [nginx](https://nginx.org/ru/) to serve static assets (generated with `npm run build`) and pass api requests to the backend.

# TODO

-   tags
-   folders
-   dark theme
