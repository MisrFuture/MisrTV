#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'
BOLD='\033[1m'

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

help_menu() {
  echo ""
  echo -e "${BOLD}MisrTV — Master Run Script${NC}"
  echo ""
  echo "Usage: ./scripts/run.sh <command>"
  echo ""
  echo "  ${GREEN}setup${NC}        Full setup: install deps, build, seed"
  echo "  ${GREEN}dev${NC}          Start development servers"
  echo "  ${GREEN}prod${NC}         Start production (Docker Compose)"
  echo "  ${GREEN}stop${NC}         Stop all services"
  echo "  ${GREEN}migrate${NC}      Run database migrations"
  echo "  ${GREEN}seed${NC}         Seed database with movie data"
  echo "  ${GREEN}scrape${NC}       Run TMDB scraper (continuous)"
  echo "  ${GREEN}scrape:once${NC}  Run TMDB scraper once"
  echo "  ${GREEN}backup${NC}       Backup PostgreSQL database"
  echo "  ${GREEN}restore${NC}      Restore PostgreSQL database"
  echo "  ${GREEN}health${NC}       Health check all services"
  echo "  ${GREEN}audit${NC}        Run security audit"
  echo "  ${GREEN}logs${NC}         View Docker logs"
  echo "  ${GREEN}rebuild${NC}      Rebuild and restart Docker"
  echo "  ${GREEN}help${NC}         Show this help menu"
  echo ""
}

case "${1:-help}" in
  setup)
    echo -e "${BLUE}[1/5]${NC} Installing Node dependencies..."
    npm install
    echo -e "${BLUE}[2/5]${NC} Installing Go dependencies..."
    (cd backend && go mod download)
    echo -e "${BLUE}[3/5]${NC} Building Go backend..."
    (cd backend && go build -o bin/server ./cmd/server && go build -o bin/seed ./cmd/seed)
    echo -e "${BLUE}[4/5]${NC} Starting Docker services..."
    docker compose up -d migrate
    docker compose up -d
    echo -e "${BLUE}[5/5]${NC} Seeding database..."
    (cd backend && go run ./cmd/seed)
    echo ""
    echo -e "${GREEN}Setup complete!${NC}"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend:  http://localhost:8080"
    echo "  Grafana:  http://localhost:3001 (configured credentials)"
    ;;
  dev)
    echo -e "${YELLOW}Starting both frontend and backend...${NC}"
    echo "  Frontend will start on http://localhost:3000"
    echo "  Backend will start on http://localhost:8080"
    echo ""
    (cd backend && go run ./cmd/server &)
    npm run dev
    ;;
  prod)
    docker compose up -d --build
    echo ""
    echo -e "${GREEN}Production started${NC}"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend:  http://localhost:8080"
    echo "  Grafana:  http://localhost:3001"
    ;;
  stop)
    docker compose down 2>/dev/null || true
    pkill -f "go run.*cmd/server" 2>/dev/null || true
    echo "All services stopped."
    ;;
  migrate)
    echo "Running database migrations..."
    docker compose run --rm migrate 2>/dev/null || (cd backend && go run ./cmd/migrate)
    ;;
  seed)
    echo "Seeding database..."
    docker compose exec backend /app/seed 2>/dev/null || (cd backend && go run ./cmd/seed)
    ;;
  scrape)
    echo "Starting TMDB scraper (continuous)..."
    python3 scripts/scraper.py --watch
    ;;
  scrape:once)
    echo "Running TMDB scraper once..."
    python3 scripts/scraper.py
    ;;
  backup)
    bash scripts/backup.sh
    ;;
  restore)
    bash scripts/restore.sh "${2:-}"
    ;;
  health)
    bash scripts/health-check.sh
    ;;
  audit)
    bash scripts/security-audit.sh
    ;;
  logs)
    docker compose logs -f
    ;;
  rebuild)
    docker compose up -d --build
    ;;
  help|*)
    help_menu
    ;;
esac
