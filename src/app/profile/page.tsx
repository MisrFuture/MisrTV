"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Heart, Bookmark, MapPin, Calendar } from "lucide-react";
import { defaultUser, movies, getMovieById } from "@/data/movies";
import { useLocale } from "@/context/locale-context";
import { MovieCard } from "@/components/movies/movie-card";
import { SafeImage } from "@/components/ui/safe-image";
import { getLikedIds, getWatchlistIds } from "@/lib/storage";

export default function ProfilePage() {
  const { dict, locale } = useLocale();
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [watchIds, setWatchIds] = useState<string[]>([]);

  useEffect(() => {
    setLikedIds(getLikedIds());
    setWatchIds(getWatchlistIds());
  }, []);

  const user = defaultUser;
  const name = locale === "ar" ? user.nameAr : user.name;
  const bio = locale === "ar" ? user.bioAr : user.bio;
  const region = locale === "ar" ? user.regionAr : user.region;

  const likedMovies = likedIds
    .map((id) => getMovieById(id))
    .filter(Boolean) as typeof movies;
  const watchMovies = watchIds
    .map((id) => getMovieById(id))
    .filter(Boolean) as typeof movies;

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-cinema-border bg-cinema-card p-8 sm:flex-row sm:items-start">
        <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-cinema-red shadow-lg shadow-cinema-red/20">
          <SafeImage src={user.avatar} alt={name} fill className="object-cover" />
        </div>
        <div className="flex-1 text-center sm:text-start">
          <h1 className="flex items-center justify-center gap-2 font-display text-2xl font-bold sm:justify-start">
            <User className="h-6 w-6 text-cinema-red" />
            {dict.profile.title}
          </h1>
          <p className="mt-1 text-xl text-white">{name}</p>
          <p className="mt-2 text-cinema-muted">{bio}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-zinc-500 sm:justify-start">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {region}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {dict.profile.memberSince}{" "}
              {new Date(user.joined).toLocaleDateString(
                locale === "ar" ? "ar-EG" : "en-US",
                { year: "numeric", month: "long" }
              )}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <Stat
            icon={<Heart className="h-5 w-5 text-red-400" />}
            value={likedMovies.length}
            label={dict.profile.moviesLiked}
          />
          <Stat
            icon={<Bookmark className="h-5 w-5 text-violet-400" />}
            value={watchMovies.length}
            label={dict.profile.watchlist}
          />
        </div>
      </div>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <Heart className="h-5 w-5 text-cinema-red" />
          {dict.profile.liked}
        </h2>
        {likedMovies.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {likedMovies.map((m, i) => (
              <div key={m.id} className="opacity-0 animate-slide-up" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}>
                <MovieCard movie={m} />
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-cinema-border py-8 text-center text-cinema-muted animate-fade-in">
            {locale === "ar"
              ? "لم تعجبك أي أفلام بعد — تصفح الأفلام وأضف ❤️"
              : "No liked movies yet — browse and tap ❤️"}
            <Link href="/movies" className="mt-2 block text-cinema-red transition-colors hover:text-cinema-yellow">
              {dict.nav.movies}
            </Link>
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <Bookmark className="h-5 w-5 text-violet-400" />
          {dict.profile.watchlist}
        </h2>
        {watchMovies.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {watchMovies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        ) : (
          <p className="text-cinema-muted text-sm">
            {locale === "ar" ? "قائمة المشاهدة فارغة" : "Watchlist is empty"}
          </p>
        )}
      </section>
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-cinema-border bg-cinema-dark px-6 py-4">
      <div className="flex justify-center">{icon}</div>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-cinema-muted">{label}</p>
    </div>
  );
}
