#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# EAZYBE 301 REDIRECT - ONE-CLICK DEPLOYMENT SCRIPT
# ═══════════════════════════════════════════════════════════════
#
# Instructions:
# 1. Upload this entire folder to your production server
# 2. Run: bash DEPLOY_NOW.sh
#
# This script will:
# - Pull latest changes from git
# - Build the project with 301 redirects
# - Deploy with docker-compose
# - Verify the redirect is working
# ═══════════════════════════════════════════════════════════════

set -e  # Exit on any error

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Eazybe 301 Redirect Deployment - Starting...             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Pull latest changes
echo "📥 Step 1/5: Pulling latest changes from git..."
git pull origin main
echo "✅ Git pull complete"
echo ""

# Step 2: Install dependencies
echo "📦 Step 2/5: Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Step 3: Build production bundle
echo "🔨 Step 3/5: Building production bundle..."
npm run build
echo "✅ Build complete"
echo ""

# Step 4: Deploy with docker-compose
echo "🚀 Step 4/5: Deploying with Docker Compose..."
docker-compose down
docker-compose up -d --build
echo "✅ Deployment complete"
echo ""

# Step 5: Verify the redirect
echo "🧪 Step 5/5: Verifying 301 redirect..."
sleep 5
echo ""
echo "Testing: curl -I http://localhost/product/pipedrive-whatsapp-integration"
curl -I http://localhost/product/pipedrive-whatsapp-integration
echo ""

# Final check
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✅ DEPLOYMENT COMPLETE!                                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📋 What was deployed:"
echo "  • 301 redirect: /product/pipedrive-whatsapp-integration → /pipedrive-whatsapp-integration"
echo "  • Server-level nginx redirect (HTTP 301)"
echo "  • Client-side React Router redirect"
echo ""
echo "🌐 Verify live redirect:"
echo "  curl -I https://eazybe.com/product/pipedrive-whatsapp-integration"
echo ""
echo "Expected result:"
echo "  HTTP/1.1 301 Moved Permanently"
echo "  Location: /pipedrive-whatsapp-integration"
echo ""
