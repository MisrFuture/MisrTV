#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

ACTION="${1:-up}"
PROFILE="${2:-full}"

COMPOSE_FILE="$(dirname "$0")/../docker-compose.yml"

case "$ACTION" in
  up)
    echo "Starting all services..."
    docker compose -f "$COMPOSE_FILE" up -d migrate
    docker compose -f "$COMPOSE_FILE" up -d
    echo ""
    echo "Services:"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend:  http://localhost:8080"
    echo "  Grafana:  http://localhost:3001 (configured credentials)"
    ;;
  down)
    echo "Stopping all services..."
    docker compose -f "$COMPOSE_FILE" down
    ;;
  logs)
    docker compose -f "$COMPOSE_FILE" logs -f
    ;;
  rebuild)
    echo "Rebuilding and starting..."
    docker compose -f "$COMPOSE_FILE" up -d --build
    ;;
  ps)
    docker compose -f "$COMPOSE_FILE" ps
    ;;
  seed)
    echo "Running database seed..."
    docker compose -f "$COMPOSE_FILE" exec backend /server seed
    ;;
  *)
    echo "Usage: $0 {up|down|logs|rebuild|ps|seed}"
    exit 1
    ;;
esac
