#! /usr/bin/env bash

# Load environment variables from .env file
set -o allexport
source .env
set +o allexport

# Existing code
export PYTHONPATH="$PYTHONPATH:${DOTENV_PYTHON_PATH_PRESTART}"

# Let the DB start
python ./app/backend_pre_start.py

# Run migrations
alembic upgrade head

# Create initial data in DB
python ./app/initial_data.py