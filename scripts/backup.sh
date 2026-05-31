#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

BACKUP_DIR="${BACKUP_DIR:-./backups}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/misrtv_db_$TIMESTAMP.sql"

mkdir -p "$BACKUP_DIR"

if command -v docker &> /dev/null; then
  echo "Backing up PostgreSQL via Docker..."
  docker compose -f "$(dirname "$0")/../docker-compose.yml" exec -T postgres \
    pg_dump -U misrtv misrtv > "$BACKUP_FILE"
elif command -v pg_dump &> /dev/null; then
  echo "Backing up PostgreSQL directly..."
  PGPASSWORD="${DB_PASSWORD:-misrtv}" pg_dump -h "${DB_HOST:-localhost}" \
    -U "${DB_USER:-misrtv}" "${DB_NAME:-misrtv}" > "$BACKUP_FILE"
else
  echo "ERROR: No PostgreSQL tools or Docker available"
  exit 1
fi

gzip -f "$BACKUP_FILE"
echo "Backup saved: ${BACKUP_FILE}.gz ($(du -h "${BACKUP_FILE}.gz" | cut -f1))"
