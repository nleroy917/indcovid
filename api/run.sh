#!/bin/bash
source env/bin/activate
export FLASK_ENV=development
export FLASK_APP=api.py
python api.py