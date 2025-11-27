#!/usr/bin/env bash
set -euo pipefail

echo "This script builds the docker images, starts the stack, waits for services, and runs basic smoke tests."

echo "Make sure Docker daemon is running."

docker-compose build --build-arg ARCH=amd64

docker-compose up -d

# wait for services
sleep 3

# smoke-tests
echo "Testing item-service..."
curl -s -X POST http://localhost:3003/items -H "Content-Type: application/json" -d '{"name":"docker-smoke-item"}' || true
sleep 0.5
curl -s http://localhost:3003/items || true

echo "Testing user-service (register + login)..."
curl -s -X POST http://localhost:3002/users -H "Content-Type: application/json" -d '{"name":"Docker User","email":"docker@example.com","password":"secret"}' || true
sleep 0.5
curl -s -X POST http://localhost:3002/login -H "Content-Type: application/json" -d '{"email":"docker@example.com","password":"secret"}' || true

echo "Logs (last 200 lines combined):"
docker-compose logs --tail=200

echo "All done. If tests failed, inspect logs above."

