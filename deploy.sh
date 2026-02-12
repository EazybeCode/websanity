#!/bin/bash

# Websanity Deployment Script
# Builds the project and deploys to nginx

echo "==================================="
echo "Building Websanity..."
echo "==================================="

# Build the project
npm run build

if [ $? -ne 0 ]; then
    echo "Build failed! Aborting deployment."
    exit 1
fi

echo "==================================="
echo "Build successful!"
echo "Deploying with Docker Compose..."
echo "==================================="

# Stop existing container, remove old dist, start new one
docker-compose down
docker-compose up -d --build

echo "==================================="
echo "Deployment complete!"
echo "Site should be available at http://localhost"
echo "==================================="
