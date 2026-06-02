"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Heart, Bookmark, Sparkles, Play } from "lucide-react";
import { getMovieBySlug } from "@/data/movies";
import { useLocale } from "@/context/locale-context";
import { movieTitle, movieOverview } from "@/lib/i18n";
import { FinancialPanel } from "@/components/movies/financial-panel";
import { RatingBars } from "@/components/movies/rating-bars";
import { AgeRatingBadge } from "@/components/movies/age-rating-badge";
import { SafeImage } from "@/components/ui/safe-image";
import { Modal } from "@/components/ui/modal";
import { MovieDetailSkeleton } from "@/components/movies/movie-detail-skeleton";
import { generateMovieInsight } from "@/lib/ai";
import { toggleLiked, isLiked, toggleWatchlist, getWatchlistIds, addRecentMovie } from "@/lib/storage";
import { useToast } from "@/context/toast-context";
import Link from "next/link";

export default function MovieDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale, dict } = useLocale();
  const [liked, setLiked] = useState(false);
  const [watchlisted, setWatchlisted] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const m = getMovieBySlug(slug);
    if (m) addRecentMovie(m.id);
  }, [slug]);

  if (loading || !slug) {
    return <MovieDetailSkeleton />;
  }

  const movie = getMovieBySlug(slug);

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
      <div className="relative -mx-4 h-48 overflow-hidden sm:-mx-6 sm:h-72 md:h-96 animate-scale-in">
        <SafeImage
          src={movie.backdrop}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative -mt-32 flex flex-col gap-8 md:flex-row">
        <div className="relative mx-auto h-64 w-44 shrink-0 overflow-hidden rounded-2xl border-2 border-cinema-red/30 shadow-2xl shadow-cinema-red/10 animate-scale-in md:mx-0 md:h-80 md:w-56">
          <SafeImage src={movie.poster} alt={title} fill className="object-cover" />
        </div>
        <div className="flex-1 pt-4 md:pt-16 animate-slide-up">
          <h1 className="font-display text-3xl font-bold md:text-4xl gradient-text">
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
              {movie.trailer && (
                <button
                  type="button"
                  onClick={() => {
                    setTrailerOpen(true);
                    toast(
                      locale === "ar" ? "جاري تشغيل الإعلان..." : "Loading trailer...",
                      "info"
                    );
                  }}
                  className="flex items-center gap-2 rounded-xl border border-cinema-red/40 bg-cinema-red/10 px-4 py-2 text-sm text-cinema-red transition-all duration-200 hover:bg-cinema-red/20 active:scale-95"
                >
                  <Play className="h-4 w-4" />
                  {dict.movie.watchTrailer}
                </button>
              )}
            <button
              type="button"
              onClick={() => {
                const nowLiked = !isLiked(movie.id);
                toggleLiked(movie.id);
                setLiked(nowLiked);
                toast(
                  nowLiked
                    ? (locale === "ar" ? "تمت الإضافة إلى المفضلة" : "Added to liked")
                    : (locale === "ar" ? "تمت الإزالة من المفضلة" : "Removed from liked"),
                  nowLiked ? "success" : "info"
                );
              }}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all duration-200 active:scale-95 ${
                liked
                  ? "border-cinema-red bg-cinema-red/20 text-cinema-red"
                  : "border-cinema-border text-cinema-muted hover:border-cinema-red"
              }`}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              {liked ? dict.movie.removeLike : dict.movie.addLike}
            </button>
            <button
              type="button"
              onClick={() => {
                const nowWatchlisted = !getWatchlistIds().includes(movie.id);
                toggleWatchlist(movie.id);
                setWatchlisted(nowWatchlisted);
                toast(
                  nowWatchlisted
                    ? (locale === "ar" ? "تمت الإضافة إلى قائمة المشاهدة" : "Added to watchlist")
                    : (locale === "ar" ? "تمت الإزالة من قائمة المشاهدة" : "Removed from watchlist"),
                  nowWatchlisted ? "success" : "info"
                );
              }}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all duration-200 active:scale-95 ${
                watchlisted
                  ? "border-cinema-yellow/50 bg-cinema-yellow/20 text-cinema-yellow"
                  : "border-cinema-border text-cinema-muted hover:border-cinema-yellow"
              }`}
            >
              <Bookmark className="h-4 w-4" />
              {dict.movie.addWatchlist}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 animate-fade-in">
        <div>
          <h2 className="mb-3 text-lg font-semibold">{dict.movie.overview}</h2>
          <p className="leading-relaxed text-cinema-muted">{overview}</p>
          <h2 className="mb-3 mt-8 text-lg font-semibold">{dict.movie.cast}</h2>
          <p className="text-cinema-muted">{cast.join(" · ")}</p>
        </div>
        <div>
          <h2 className="mb-3 text-lg font-semibold">{dict.movie.ratings}</h2>
          <RatingBars ratings={movie.ratings} />
        </div>
      </div>

      <div className="animate-slide-up">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Sparkles className="h-5 w-5 text-cinema-yellow animate-float" />
          {dict.movie.aiInsight}
        </h2>
        <p className="rounded-2xl border border-cinema-yellow/30 bg-cinema-yellow/10 p-4 text-sm text-cinema-white">
          {insight}
        </p>
      </div>

      <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
        <h2 className="mb-4 text-lg font-semibold">{dict.movie.analysis}</h2>
        <FinancialPanel movie={movie} />
      </div>

      <Modal open={trailerOpen} onClose={() => setTrailerOpen(false)}>
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${movie.trailer}?autoplay=1`}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Modal>
    </div>
  );
}
