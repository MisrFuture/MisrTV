"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { getPlaylists, deletePlaylist, removeMovieFromPlaylist, type Playlist } from "@/lib/playlists";
import { movies, getMovieById } from "@/data/movies";
import { useLocale } from "@/context/locale-context";
import { MovieCard } from "@/components/movies/movie-card";

export default function PlaylistDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { locale } = useLocale();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    setPlaylist(getPlaylists().find((p) => p.id === id) || null);
  }, [id]);

  if (!playlist) {
    return (
      <div className="py-20 text-center">
        <p className="text-cinema-muted">{locale === "ar" ? "القائمة غير موجودة" : "Collection not found"}</p>
        <Link href="/playlists" className="mt-4 inline-block text-cinema-red hover:underline">{locale === "ar" ? "العودة للقوائم" : "Back to collections"}</Link>
      </div>
    );
  }

  const listMovies = playlist.movieIds
    .map((mid) => getMovieById(mid))
    .filter(Boolean) as typeof movies;

  return (
    <div>
      <Link href="/playlists" className="mb-6 inline-flex items-center gap-2 text-sm text-cinema-muted transition-colors hover:text-cinema-red">
        <ArrowLeft className="h-4 w-4" />
        {locale === "ar" ? "القوائم" : "Collections"}
      </Link>

      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">{playlist.name}</h1>
        <button
          type="button"
          onClick={() => {
            deletePlaylist(playlist.id);
            window.location.href = "/playlists";
          }}
          className="flex items-center gap-2 text-sm text-cinema-muted transition-colors hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
          {locale === "ar" ? "حذف القائمة" : "Delete"}
        </button>
      </div>

      {listMovies.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {listMovies.map((m) => (
            <div key={m.id} className="relative group">
              <MovieCard movie={m} />
              <button
                type="button"
                onClick={() => {
                  removeMovieFromPlaylist(playlist.id, m.id);
                  setPlaylist(getPlaylists().find((p) => p.id === id) || null);
                }}
                className="absolute right-2 top-2 z-10 rounded-lg bg-black/70 p-1.5 text-cinema-muted opacity-0 transition-all hover:text-red-400 group-hover:opacity-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-cinema-muted">
          {locale === "ar" ? "هذه القائمة فارغة" : "This collection is empty"}
        </p>
      )}
    </div>
  );
}
