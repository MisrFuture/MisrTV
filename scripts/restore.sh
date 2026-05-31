#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

BACKUP_FILE="${1:-}"

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: $0 <backup-file.sql.gz|backup-file.sql>"
  echo ""
  echo "Available backups:"
  ls -lh "$(dirname "$0")/../backups/" 2>/dev/null || echo "  No backups found"
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "ERROR: File not found: $BACKUP_FILE"
  exit 1
fi

echo "WARNING: This will replace all data in the database!"
read -rp "Are you sure? [y/N] " confirm
if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
  echo "Restore cancelled."
  exit 0
fi

if command -v docker &> /dev/null; then
  if [[ "$BACKUP_FILE" == *.gz ]]; then
    gunzip -c "$BACKUP_FILE" | docker compose -f "$(dirname "$0")/../docker-compose.yml" exec -T postgres \
      psql -U misrtv misrtv
  else
    cat "$BACKUP_FILE" | docker compose -f "$(dirname "$0")/../docker-compose.yml" exec -T postgres \
      psql -U misrtv misrtv
  fi
elif command -v psql &> /dev/null; then
  if [ -z "${DB_PASSWORD:-}" ]; then
    echo "ERROR: DB_PASSWORD environment variable not set"
    exit 1
  fi
  if [[ "$BACKUP_FILE" == *.gz ]]; then
    gunzip -c "$BACKUP_FILE" | PGPASSWORD="$DB_PASSWORD" psql -h "${DB_HOST:-localhost}" \
      -U "${DB_USER:-misrtv}" "${DB_NAME:-misrtv}"
  else
    PGPASSWORD="$DB_PASSWORD" psql -h "${DB_HOST:-localhost}" \
      -U "${DB_USER:-misrtv}" "${DB_NAME:-misrtv}" < "$BACKUP_FILE"
  fi
else
  echo "ERROR: No PostgreSQL tools or Docker available"
  exit 1
fi

echo "Restore complete from: $BACKUP_FILE"
