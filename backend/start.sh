#!/bin/bash

# Exit immediately on errors
set -e

# Set the virtual environment directory name
VENV_DIR="venv"

# Create virtual environment if it doesn't exist
if [ ! -d "$VENV_DIR" ]; then
    echo "Creating virtual environment..."
    python3 -m venv "$VENV_DIR"
fi

# Activate the virtual environment
source "$VENV_DIR/bin/activate"

# Install dependencies
if [ -f "requirements.txt" ]; then
    echo "Installing dependencies from requirements.txt..."
    pip install -r requirements.txt
else
    echo "No requirements.txt found. Skipping dependency install."
fi

echo "Virtual environment activated."
echo "You're now in the Python environment. Type 'deactivate' to exit."

echo "Starting API..."
python api.py
