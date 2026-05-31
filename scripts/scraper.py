#!/usr/bin/env python3
"""MisrTV Movie Scraper — fetches movies from TMDB (2000-present) continuously.

Usage:
  export TMDB_API_KEY="your_key"
  python scripts/scraper.py                  # one full sync
  python scripts/scraper.py --watch           # continuous mode (checks every 6h)
  python scripts/scraper.py --year 2024       # fetch specific year
  python scripts/scraper.py --output data.json

Requires: pip install requests
"""

import argparse
import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

TMDB_API_KEY = os.environ.get("TMDB_API_KEY", "")
TMDB_BASE = "https://api.themoviedb.org/3"
REQUIRED_FIELDS = {"id", "title", "overview", "release_date", "vote_average", "poster_path", "backdrop_path"}

DATA_DIR = Path(__file__).resolve().parent.parent / "src" / "data"
OUTPUT_FILE = DATA_DIR / "tmdb_movies.json"
LOG_FILE = Path(__file__).resolve().parent / "scraper.log"

AGE_MAP = {
    "G": "G", "PG": "PG", "PG-13": "PG-13", "R": "R",
    "NC-17": "18+", "NR": "NR",
}


def log(msg: str) -> None:
    ts = datetime.now().isoformat()
    line = f"[{ts}] {msg}"
    print(line)
    with open(LOG_FILE, "a") as f:
        f.write(line + "\n")


def tmdb_get(path: str, params: dict[str, Any] | None = None) -> dict[str, Any] | None:
    if not TMDB_API_KEY:
        log("ERROR: TMDB_API_KEY not set. Export TMDB_API_KEY=your_key")
        return None
    url = f"{TMDB_BASE}{path}"
    p = {"api_key": TMDB_API_KEY, **(params or {})}
    for attempt in range(3):
        try:
            import requests
            resp = requests.get(url, params=p, timeout=30)
            if resp.status_code == 429:
                wait = int(resp.headers.get("Retry-After", 60))
                log(f"Rate limited. Waiting {wait}s...")
                time.sleep(wait)
                continue
            resp.raise_for_status()
            return resp.json()
        except Exception as e:
            log(f"API error (attempt {attempt + 1}/3): {e}")
            time.sleep(2 ** attempt)
    return None


def fetch_certification(movie_id: int) -> str:
    """Fetch US MPAA rating for a movie."""
    data = tmdb_get(f"/movie/{movie_id}/release_dates")
    if not data:
        return "NR"
    for r in data.get("results", []):
        if r.get("iso_3166_1") == "US":
            for rd in r.get("release_dates", []):
                cert = rd.get("certification", "")
                if cert in AGE_MAP:
                    return AGE_MAP[cert]
    return "NR"


def fetch_genres() -> dict[int, str]:
    """Fetch TMDB genre list."""
    data = tmdb_get("/genre/movie/list", {"language": "en-US"})
    if not data:
        return {}
    return {g["id"]: g["name"] for g in data.get("genres", [])}


def movie_to_record(m: dict[str, Any], genre_map: dict[int, str]) -> dict[str, Any] | None:
    """Convert TMDB movie dict to our format."""
    if not m.get("title") or not m.get("release_date"):
        return None

    try:
        year = int(m["release_date"][:4])
    except (ValueError, IndexError):
        year = 0

    if year < 2000:
        return None

    poster = m.get("poster_path", "")
    backdrop = m.get("backdrop_path", "")
    genres = [genre_map.get(gid, "") for gid in m.get("genre_ids", []) if gid in genre_map]

    # Determine content rating from vote average
    va = m.get("vote_average", 0)
    if va >= 8.0:
        content_rating = "excellent"
    elif va >= 6.5:
        content_rating = "good"
    elif va >= 4.0:
        content_rating = "mixed"
    else:
        content_rating = "poor"

    status = "released" if year <= datetime.now().year else "upcoming"

    return {
        "tmdb_id": m["id"],
        "title": m["title"],
        "overview": m.get("overview", ""),
        "year": year,
        "poster": f"https://image.tmdb.org/t/p/w400{poster}" if poster else "",
        "backdrop": f"https://image.tmdb.org/t/p/w1280{backdrop}" if backdrop else "",
        "genres": genres,
        "rating": round(va, 1),
        "vote_count": m.get("vote_count", 0),
        "age_rating": "NR",
        "content_rating": content_rating,
        "status": status,
        "release_date": m.get("release_date", ""),
    }


def fetch_year(year: int, genre_map: dict[int, str]) -> list[dict[str, Any]]:
    """Fetch all popular movies for a given year."""
    movies = []
    for page in range(1, 501):  # 500 pages max
        data = tmdb_get("/discover/movie", {
            "primary_release_year": year,
            "sort_by": "popularity.desc",
            "vote_count.gte": 50,
            "page": page,
            "language": "en-US",
        })
        if not data or not data.get("results"):
            break
        results = data["results"]
        for m in results:
            rec = movie_to_record(m, genre_map)
            if rec:
                movies.append(rec)
        if page >= data.get("total_pages", 1):
            break
        if page % 10 == 0:
            log(f"  Year {year}: page {page}/{data.get('total_pages', '?')} — {len(movies)} movies so far")
        time.sleep(0.25)  # be nice to TMDB
    return movies


def fetch_certifications(records: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Batch-fetch age certifications for all records."""
    log(f"Fetching age certifications for {len(records)} movies...")
    for i, rec in enumerate(records):
        cert = fetch_certification(rec["tmdb_id"])
        rec["age_rating"] = cert
        if (i + 1) % 20 == 0:
            log(f"  Certifications: {i + 1}/{len(records)}")
        time.sleep(0.2)
    return records


def sync_all(years: list[int] | None = None, output: str | None = None) -> None:
    """Main sync function."""
    log("Starting MisrTV movie sync...")
    out_path = Path(output) if output else OUTPUT_FILE
    out_path.parent.mkdir(parents=True, exist_ok=True)

    genre_map = fetch_genres()
    if not genre_map:
        log("ERROR: Failed to fetch genres. Check API key.")
        return
    log(f"Loaded {len(genre_map)} genres")

    if years:
        target_years = years
    else:
        current = datetime.now().year
        target_years = list(range(2000, current + 2))  # +2 for upcoming

    all_movies: list[dict[str, Any]] = []
    for y in target_years:
        log(f"Fetching {y}...")
        movies = fetch_year(y, genre_map)
        log(f"  Found {len(movies)} movies for {y}")
        all_movies.extend(movies)

    log(f"Total movies fetched: {len(all_movies)}")

    # Fetch certifications for a subset (top 500 popular)
    all_movies.sort(key=lambda x: x.get("vote_count", 0), reverse=True)
    top = all_movies[:500]
    rest = all_movies[500:]
    top = fetch_certifications(top)
    all_movies = top + rest

    # Deduplicate by tmdb_id
    seen: set[int] = set()
    unique: list[dict[str, Any]] = []
    for m in all_movies:
        if m["tmdb_id"] not in seen:
            seen.add(m["tmdb_id"])
            unique.append(m)
    all_movies = unique

    result = {
        "last_sync": datetime.now(timezone.utc).isoformat(),
        "count": len(all_movies),
        "movies": all_movies,
    }

    out_path.write_text(json.dumps(result, indent=2, ensure_ascii=False))
    log(f"Written {len(all_movies)} movies to {out_path}")


def watch_mode(interval_hours: int = 6) -> None:
    """Continuously sync every N hours."""
    log(f"Watch mode activated. Syncing every {interval_hours}h. PID: {os.getpid()}")
    while True:
        sync_all()
        next_run = datetime.now()
        next_run = next_run.replace(hour=(next_run.hour // interval_hours + 1) * interval_hours, minute=0, second=0)
        wait_seconds = (next_run - datetime.now()).total_seconds()
        log(f"Next sync at {next_run.isoformat()} (in {wait_seconds / 3600:.1f}h)")
        time.sleep(max(wait_seconds, 60))


def main() -> None:
    parser = argparse.ArgumentParser(description="MisrTV Movie Scraper")
    parser.add_argument("--year", type=int, nargs="*", help="Specific year(s) to fetch")
    parser.add_argument("--watch", action="store_true", help="Continuous watch mode")
    parser.add_argument("--interval", type=int, default=6, help="Watch interval in hours (default: 6)")
    parser.add_argument("--output", type=str, help="Output JSON path")
    args = parser.parse_args()

    if args.watch:
        watch_mode(args.interval)
    else:
        sync_all(years=args.year, output=args.output)


if __name__ == "__main__":
    main()
