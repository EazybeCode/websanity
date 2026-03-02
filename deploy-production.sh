#!/bin/bash

# Production Deployment Script for Eazybe
# Run this script on your production server

echo "==================================="
echo "Eazybe Production Deployment"
echo "==================================="

# Navigate to project directory
cd /path/to/websanity || exit 1

# Pull latest changes
echo "Pulling latest changes from git..."
git pull origin main

if [ $? -ne 0 ]; then
    echo "Git pull failed! Aborting deployment."
    exit 1
fi

# Install dependencies (if needed)
echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "npm install failed! Aborting deployment."
    exit 1
fi

# Build the project
echo "Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "Build failed! Aborting deployment."
    exit 1
fi

echo "==================================="
echo "Build successful!"
echo "Deploying with Docker Compose..."
echo "==================================="

# Stop existing containers
docker-compose down

# Start new containers with latest build
docker-compose up -d --build

echo "==================================="
echo "Deployment complete!"
echo "Testing 301 redirect..."
echo "==================================="

# Test the redirect
sleep 5
curl -I http://localhost/product/pipedrive-whatsapp-integration

echo ""
echo "==================================="
echo "Deployment finished!"
echo "==================================="
