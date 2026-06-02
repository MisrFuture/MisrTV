"use client";

import { defaultUser } from "@/data/movies";

const LIKED_KEY = "misrtv-liked";
const WATCHLIST_KEY = "misrtv-watchlist";

export function getLikedIds(): string[] {
  if (typeof window === "undefined") return defaultUser.likedMovieIds;
  try {
    const raw = localStorage.getItem(LIKED_KEY);
    return raw ? JSON.parse(raw) : defaultUser.likedMovieIds;
  } catch {
    return defaultUser.likedMovieIds;
  }
}

export function setLikedIds(ids: string[]) {
  localStorage.setItem(LIKED_KEY, JSON.stringify(ids));
}

export function toggleLiked(movieId: string): string[] {
  const ids = getLikedIds();
  const next = ids.includes(movieId)
    ? ids.filter((id) => id !== movieId)
    : [...ids, movieId];
  setLikedIds(next);
  return next;
}

export function isLiked(movieId: string): boolean {
  return getLikedIds().includes(movieId);
}

export function getWatchlistIds(): string[] {
  if (typeof window === "undefined") return defaultUser.watchlistIds;
  try {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    return raw ? JSON.parse(raw) : defaultUser.watchlistIds;
  } catch {
    return defaultUser.watchlistIds;
  }
}

export function toggleWatchlist(movieId: string): string[] {
  const ids = getWatchlistIds();
  const next = ids.includes(movieId)
    ? ids.filter((id) => id !== movieId)
    : [...ids, movieId];
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(next));
  return next;
}

const RECENT_KEY = "misrtv-recent";

export function addRecentMovie(movieId: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    const next = [movieId, ...ids.filter((id) => id !== movieId)].slice(0, 10);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function getRecentIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
