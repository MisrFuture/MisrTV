"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { List, Plus, Trash2 } from "lucide-react";
import { getPlaylists, createPlaylist, deletePlaylist, type Playlist } from "@/lib/playlists";
import { useLocale } from "@/context/locale-context";

export default function PlaylistsPage() {
  const { locale } = useLocale();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    setPlaylists(getPlaylists());
  }, []);

  function handleCreate() {
    if (!newName.trim()) return;
    createPlaylist(newName.trim());
    setPlaylists(getPlaylists());
    setNewName("");
  }

  function handleDelete(id: string) {
    deletePlaylist(id);
    setPlaylists(getPlaylists());
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">
        {locale === "ar" ? "قوائمي" : "My Collections"}
      </h1>

      <div className="mt-6 flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          placeholder={locale === "ar" ? "اسم القائمة الجديدة..." : "New collection name..."}
          className="flex-1 rounded-xl border border-cinema-border bg-cinema-card px-4 py-2.5 text-sm text-cinema-white placeholder:text-cinema-muted transition-all focus:border-cinema-red focus:outline-none"
        />
        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center gap-2 rounded-xl border border-cinema-red bg-cinema-red px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-cinema-red/90 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          {locale === "ar" ? "إنشاء" : "Create"}
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {playlists.length === 0 && (
          <p className="col-span-full py-12 text-center text-cinema-muted">
            {locale === "ar" ? "لا توجد قوائم بعد" : "No collections yet"}
          </p>
        )}
        {playlists.map((p) => (
          <div key={p.id} className="group rounded-2xl border border-cinema-border bg-cinema-card p-5 transition-all hover:border-cinema-red/30">
            <div className="flex items-start justify-between">
              <Link href={`/playlists/${p.id}`} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cinema-red/10">
                  <List className="h-5 w-5 text-cinema-red" />
                </div>
                <div>
                  <p className="font-semibold text-cinema-white transition-colors group-hover:text-cinema-red">{p.name}</p>
                  <p className="text-xs text-cinema-muted">
                    {p.movieIds.length} {locale === "ar" ? "فيلم" : "movies"}
                  </p>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(p.id)}
                className="text-cinema-muted opacity-0 transition-all hover:text-red-400 group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
