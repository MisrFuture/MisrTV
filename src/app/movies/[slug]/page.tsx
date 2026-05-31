"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Heart, Bookmark, Sparkles } from "lucide-react";
import { getMovieBySlug } from "@/data/movies";
import { useLocale } from "@/context/locale-context";
import { movieTitle, movieOverview } from "@/lib/i18n";
import { FinancialPanel } from "@/components/movies/financial-panel";
import { RatingBars } from "@/components/movies/rating-bars";
import { AgeRatingBadge } from "@/components/movies/age-rating-badge";
import { generateMovieInsight } from "@/lib/ai";
import { toggleLiked, isLiked, toggleWatchlist, getWatchlistIds } from "@/lib/storage";
import Link from "next/link";

export default function MovieDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const movie = getMovieBySlug(slug);
  const { locale, dict } = useLocale();
  const [liked, setLiked] = useState(false);
  const [watchlisted, setWatchlisted] = useState(false);

  useEffect(() => {
    if (movie) {
      setLiked(isLiked(movie.id));
      setWatchlisted(getWatchlistIds().includes(movie.id));
    }
  }, [movie]);

  if (!movie) {
    return (
      <div className="py-20 text-center">
        <p className="text-cinema-muted">Movie not found</p>
        <Link href="/movies" className="mt-4 text-cinema-gold hover:underline">
          Back to movies
        </Link>
      </div>
    );
  }

  const title = movieTitle(movie, locale);
  const overview = movieOverview(movie, locale);
  const genres = locale === "ar" ? movie.genresAr : movie.genres;
  const cast = locale === "ar" ? movie.castAr : movie.cast;
  const insight = generateMovieInsight(movie, locale);

  return (
    <div className="space-y-8">
      <div className="relative -mx-4 h-48 overflow-hidden sm:-mx-6 sm:h-72 md:h-96">
        <Image
          src={movie.backdrop}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/60 to-transparent" />
      </div>

      <div className="relative -mt-32 flex flex-col gap-8 md:flex-row">
        <div className="relative mx-auto h-64 w-44 shrink-0 overflow-hidden rounded-2xl border-2 border-cinema-gold/30 shadow-2xl md:mx-0 md:h-80 md:w-56">
          <Image src={movie.poster} alt={title} fill className="object-cover" />
        </div>
        <div className="flex-1 pt-4 md:pt-16">
          <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-cinema-muted">
            {movie.year} · {movie.runtime} min · {genres.join(" · ")}
          </p>
          <AgeRatingBadge
            ageRating={movie.ageRating}
            contentRating={movie.contentRating}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                toggleLiked(movie.id);
                setLiked(isLiked(movie.id));
              }}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition ${
                liked
                  ? "border-cinema-gold bg-cinema-gold/20 text-cinema-gold"
                  : "border-cinema-border text-zinc-300 hover:border-cinema-gold"
              }`}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              {liked ? dict.movie.removeLike : dict.movie.addLike}
            </button>
            <button
              type="button"
              onClick={() => {
                toggleWatchlist(movie.id);
                setWatchlisted(getWatchlistIds().includes(movie.id));
              }}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition ${
                watchlisted
                  ? "border-violet-500/50 bg-violet-500/20 text-violet-300"
                  : "border-cinema-border text-zinc-300"
              }`}
            >
              <Bookmark className="h-4 w-4" />
              {dict.movie.addWatchlist}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-lg font-semibold">{dict.movie.overview}</h2>
          <p className="leading-relaxed text-zinc-400">{overview}</p>
          <h2 className="mb-3 mt-8 text-lg font-semibold">{dict.movie.cast}</h2>
          <p className="text-zinc-400">{cast.join(" · ")}</p>
        </div>
        <div>
          <h2 className="mb-3 text-lg font-semibold">{dict.movie.ratings}</h2>
          <RatingBars ratings={movie.ratings} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Sparkles className="h-5 w-5 text-violet-400" />
          {dict.movie.aiInsight}
        </h2>
        <p className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4 text-sm text-zinc-300">
          {insight}
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">{dict.movie.analysis}</h2>
        <FinancialPanel movie={movie} />
      </div>
    </div>
  );
}
