"use client";

const PLAYLISTS_KEY = "misrtv-playlists";

export interface Playlist {
  id: string;
  name: string;
  movieIds: string[];
  createdAt: string;
}

export function getPlaylists(): Playlist[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PLAYLISTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePlaylists(playlists: Playlist[]) {
  localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists));
}

export function createPlaylist(name: string): Playlist {
  const playlists = getPlaylists();
  const newList: Playlist = {
    id: Date.now().toString(),
    name,
    movieIds: [],
    createdAt: new Date().toISOString(),
  };
  savePlaylists([...playlists, newList]);
  return newList;
}

export function addMovieToPlaylist(playlistId: string, movieId: string) {
  const playlists = getPlaylists();
  const next = playlists.map((p) =>
    p.id === playlistId && !p.movieIds.includes(movieId)
      ? { ...p, movieIds: [...p.movieIds, movieId] }
      : p
  );
  savePlaylists(next);
}

export function removeMovieFromPlaylist(playlistId: string, movieId: string) {
  const playlists = getPlaylists();
  const next = playlists.map((p) =>
    p.id === playlistId
      ? { ...p, movieIds: p.movieIds.filter((id) => id !== movieId) }
      : p
  );
  savePlaylists(next);
}

export function deletePlaylist(id: string) {
  savePlaylists(getPlaylists().filter((p) => p.id !== id));
}
