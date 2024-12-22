#!/bin/bash

cd /home/jogro/Team-11/mein-chatbot

# Start the Python server
echo "Starting Python server..."
python3 ./app.py &  # Replace with your Python server command

# Start the NPM script
echo "Starting NPM script..."
npm run start &  # Replace "start" with your specific script name

# Wait for both processes to finish
wait