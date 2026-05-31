#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

check_url() {
  local name="$1" url="$2"
  if curl -sf "$url" > /dev/null 2>&1; then
    echo -e "  ${GREEN}[UP]${NC} $name ($url)"
  else
    echo -e "  ${RED}[DOWN]${NC} $name ($url)"
  fi
}

echo "MisrTV Health Check"
echo "==================="
check_url "Frontend" "http://localhost:3000"
check_url "Backend" "http://localhost:8080/api/v1/health"
check_url "Grafana" "http://localhost:3001"

echo ""
echo "--- Docker Containers ---"
if command -v docker &> /dev/null; then
  docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null || echo "  Docker not running"
else
  echo "  Docker not available"
fi

echo ""
echo "--- Disk Usage ---"
BACKUP_DIR="$(dirname "$0")/../backups"
if [ -d "$BACKUP_DIR" ]; then
  echo "  Backups: $(du -sh "$BACKUP_DIR" | cut -f1)"
fi
echo "  Project: $(du -sh "$(dirname "$0")/.." --exclude=node_modules --exclude=.next --exclude=backend/bin | cut -f1)"
