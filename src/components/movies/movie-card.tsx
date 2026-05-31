"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, TrendingUp, TrendingDown } from "lucide-react";
import type { Movie } from "@/types/movie";
import { useLocale } from "@/context/locale-context";
import { movieTitle } from "@/lib/i18n";
import { getFinancialSummary } from "@/data/movies";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  showFinance?: boolean;
}

export function MovieCard({ movie, showFinance = false }: MovieCardProps) {
  const { locale, dict, rtl } = useLocale();
  const title = movieTitle(movie, locale);
  const genres = locale === "ar" ? movie.genresAr : movie.genres;
  const fin = getFinancialSummary(movie);

  return (
    <Link
      href={`/movies/${movie.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-cinema-border bg-cinema-card transition hover:border-cinema-gold/40 hover:shadow-lg hover:shadow-cinema-gold/5"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={movie.poster}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-transparent to-transparent" />
        <div
          className={cn(
            "absolute top-2 flex gap-1",
            rtl ? "left-2" : "right-2"
          )}
        >
          <Badge variant="gold">{movie.ageRating}</Badge>
          {movie.status === "upcoming" && (
            <Badge variant="muted">
              {locale === "ar" ? "قريباً" : "Soon"}
            </Badge>
          )}
        </div>
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <span className="flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 text-sm font-semibold text-cinema-gold backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-cinema-gold" />
            {movie.ratings.misrtv || "—"}
          </span>
          <Badge
            variant={
              movie.contentRating === "excellent"
                ? "success"
                : movie.contentRating === "poor"
                  ? "danger"
                  : "default"
            }
          >
            {dict.contentRatings[movie.contentRating]}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-1 font-semibold text-white group-hover:text-cinema-gold">
          {title}
        </h3>
        <p className="mt-0.5 text-xs text-cinema-muted">
          {movie.year} · {genres.slice(0, 2).join(" · ")}
        </p>
        {showFinance && movie.status === "released" && (
          <p
            className={cn(
              "mt-2 flex items-center gap-1 text-xs",
              fin.status === "profit" ? "text-emerald-400" : "text-red-400"
            )}
          >
            {fin.status === "profit" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {fin.status === "profit"
              ? dict.status.profit
              : fin.status === "loss"
                ? dict.status.loss
                : dict.status.breakEven}
          </p>
        )}
      </div>
    </Link>
  );
}
