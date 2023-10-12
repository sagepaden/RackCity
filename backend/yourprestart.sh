#! /usr/bin/env bash

#change this file (yourprestart.sh) to prestart.sh

export PYTHONPATH=$PYTHONPATH:/change/to/your/path/to/the/backend/app


# Let the DB start
python ./app/backend_pre_start.py

# Run migrations
alembic upgrade head

# Create initial data in DB
python ./app/initial_data.py