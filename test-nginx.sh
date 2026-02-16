#!/bin/bash

echo "=========================================="
echo "Testing nginx.conf syntax..."
docker exec nginx nginx -t cat /etc/nginx/conf.d/nginx.conf
echo ""
echo "=========================================="
echo ""
echo "Current nginx.conf contents:"
echo "=========================================="
docker exec nginx nginx -t cat /etc/nginx/conf.d/nginx.conf
echo ""
echo "To apply changes: 1) Restart container 2) Rebuild image"
echo "=========================================="
