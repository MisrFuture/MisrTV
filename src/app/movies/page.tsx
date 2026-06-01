"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, X, ChevronDown } from "lucide-react";
import { MovieCard } from "@/components/movies/movie-card";
import { MovieGridSkeleton } from "@/components/movies/movie-card-skeleton";
import { movies } from "@/data/movies";
import { useLocale } from "@/context/locale-context";
import { useDebounce } from "@/lib/use-debounce";
import type { ContentRating } from "@/types/movie";

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 12;

function MoviesContent() {
  const { dict, locale } = useLocale();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = (params.get("q") || "").toLowerCase();
  const filter = params.get("filter");
  const quality = params.get("quality") as ContentRating | null;

  const [searchInput, setSearchInput] = useState(params.get("q") || "");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    setSearchInput(params.get("q") || "");
  }, [params]);

  useEffect(() => {
    const current = params.get("q") || "";
    if (debouncedSearch !== current) {
      const newParams = new URLSearchParams(params.toString());
      if (debouncedSearch) {
        newParams.set("q", debouncedSearch);
      } else {
        newParams.delete("q");
      }
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    }
  }, [debouncedSearch, params, router, pathname]);

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

  const visibleMovies = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [q, filter, quality]);

  function loadMore() {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, filtered.length));
  }

  const filters = [
    { key: "", label: dict.filters.all },
    { key: "excellent", label: dict.filters.excellent, quality: "excellent" as const },
    { key: "good", label: dict.filters.good, quality: "good" as const },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">{dict.nav.movies}</h1>

      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-cinema-muted rtl:left-auto rtl:right-3" />
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={dict.hero.search}
          className="w-full rounded-xl border border-cinema-border bg-cinema-card py-3 pl-10 pr-10 text-cinema-white placeholder:text-cinema-muted transition-all duration-300 focus:border-cinema-red focus:outline-none focus:ring-1 focus:ring-cinema-red/50 rtl:pl-4 rtl:pr-10"
        />
        {searchInput && (
          <button
            type="button"
            onClick={() => setSearchInput("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cinema-muted transition-colors hover:text-cinema-white rtl:left-3 rtl:right-auto"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {q && (
        <p className="mt-2 text-cinema-muted">
          {locale === "ar" ? `نتائج: "${q}"` : `Results for "${q}"`} — {filtered.length}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => {
              const newParams = new URLSearchParams(params.toString());
              if (f.quality) {
                newParams.set("quality", f.quality);
              } else {
                newParams.delete("quality");
              }
              router.push(`${pathname}?${newParams.toString()}`);
            }}
            className={`rounded-lg border px-3 py-1.5 text-sm transition-all duration-200 ${
              quality === f.quality || (!quality && !f.quality)
                ? "border-cinema-red bg-cinema-red/20 text-cinema-red"
                : "border-cinema-border text-cinema-muted hover:border-cinema-red hover:text-cinema-red"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 && (
        <p className="mt-4 text-xs text-cinema-muted">
          {locale === "ar"
            ? `عرض ${visibleMovies.length} من ${filtered.length} فيلماً`
            : `Showing ${visibleMovies.length} of ${filtered.length} movies`}
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {visibleMovies.map((m, i) => (
          <div key={m.id} className="opacity-0 animate-slide-up" style={{ animationDelay: `${i * 30}ms`, animationFillMode: "forwards" }}>
            <MovieCard movie={m} showFinance />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <ChevronDown className="h-4 w-4" />
            {locale === "ar"
              ? `تحميل المزيد (${filtered.length - visibleCount})`
              : `Load more (${filtered.length - visibleCount})`}
          </button>
        </div>
      )}

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
