#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

MODE="${1:-frontend}"

case "$MODE" in
  frontend)
    echo "Starting Next.js frontend..."
    cd "$(dirname "$0")/.."
    npm run dev
    ;;
  backend)
    echo "Starting Go backend..."
    cd "$(dirname "$0")/../backend"
    go run ./cmd/server
    ;;
  seed)
    echo "Seeding database..."
    cd "$(dirname "$0")/../backend"
    go run ./cmd/seed
    ;;
  migrate)
    echo "Running migrations..."
    cd "$(dirname "$0")/../backend"
    go run ./cmd/migrate
    ;;
  all)
    echo "Starting frontend + backend (need two terminals)..."
    echo "  Terminal 1: ./scripts/dev.sh backend"
    echo "  Terminal 2: ./scripts/dev.sh frontend"
    ;;
  *)
    echo "Usage: $0 {frontend|backend|seed|all}"
    exit 1
    ;;
esac
