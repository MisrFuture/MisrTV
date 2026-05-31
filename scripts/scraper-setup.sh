#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

echo "=== MisrTV Scraper Setup ==="

# Check Python
if ! command -v python3 &>/dev/null; then
  echo "ERROR: python3 not found."
  exit 1
fi

# Install dependencies
echo "[1/3] Installing Python dependencies..."
pip3 install requests --quiet 2>/dev/null || pip install requests --quiet

# Check TMDB key
if [ -z "${TMDB_API_KEY:-}" ]; then
  echo "⚠️  TMDB_API_KEY is not set."
  echo "   Get a free key at https://www.themoviedb.org/settings/api"
  echo "   Then: export TMDB_API_KEY='your_key'"
  echo "   Or add to your ~/.bashrc / ~/.zshrc"
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "[2/3] Setting up cron job..."
CRON_JOB="0 */6 * * * cd ${SCRIPT_DIR}/.. && python3 scripts/scraper.py >> scripts/scraper.log 2>&1"
(crontab -l 2>/dev/null | grep -v "scraper.py"; echo "$CRON_JOB") | crontab -
echo "   Cron job added (runs every 6 hours)"

echo "[3/3] Testing scraper..."
echo "   Run: python3 ${SCRIPT_DIR}/scraper.py --year 2024"
echo ""
echo "=== Setup complete ==="
echo "  - Logs: ${SCRIPT_DIR}/scraper.log"
echo "  - Output: src/data/tmdb_movies.json"
echo "  - Cron: every 6h"
