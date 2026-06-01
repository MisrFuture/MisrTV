"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MovieCard } from "@/components/movies/movie-card";
import { MovieGridSkeleton } from "@/components/movies/movie-card-skeleton";
import { movies } from "@/data/movies";
import { useLocale } from "@/context/locale-context";
import type { ContentRating } from "@/types/movie";

function MoviesContent() {
  const { dict, locale } = useLocale();
  const params = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();
  const filter = params.get("filter");
  const quality = params.get("quality") as ContentRating | null;

  const filtered = useMemo(() => {
    let list = [...movies];
    if (q) {
      list = list.filter(
        (m) =>
          m.titleEn.toLowerCase().includes(q) ||
          m.titleAr.includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.cast.some((c) => c.toLowerCase().includes(q))
      );
    }
    if (filter === "arab") {
      list = list.filter((m) => m.tags.includes("arab") || m.country === "Egypt");
    }
    if (quality) {
      list = list.filter((m) => m.contentRating === quality);
    }
    return list.sort((a, b) => b.ratings.misrtv - a.ratings.misrtv);
  }, [q, filter, quality]);

  const filters = [
    { key: "", label: dict.filters.all },
    { key: "excellent", label: dict.filters.excellent, quality: "excellent" as const },
    { key: "good", label: dict.filters.good, quality: "good" as const },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">{dict.nav.movies}</h1>
      {q && (
        <p className="mt-2 text-cinema-muted">
          {locale === "ar" ? `نتائج: "${q}"` : `Results for "${q}"`} — {filtered.length}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <a
            key={f.key}
            href={
              f.quality
                ? `/movies?quality=${f.quality}`
                : "/movies"
            }
            className="rounded-lg border border-cinema-border px-3 py-1.5 text-sm text-cinema-muted transition-all duration-200 hover:border-cinema-red hover:text-cinema-red"
          >
            {f.label}
          </a>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filtered.map((m, i) => (
          <div key={m.id} className="opacity-0 animate-slide-up" style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}>
            <MovieCard movie={m} showFinance />
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center text-cinema-muted">
          {locale === "ar" ? "لا توجد نتائج" : "No movies found"}
        </p>
      )}
    </div>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={<MovieGridSkeleton count={10} />}>
      <MoviesContent />
    </Suspense>
  );
}
