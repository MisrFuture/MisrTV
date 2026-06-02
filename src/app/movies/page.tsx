"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, X, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { MovieCard } from "@/components/movies/movie-card";
import { MovieGridSkeleton } from "@/components/movies/movie-card-skeleton";
import { movies } from "@/data/movies";
import { useLocale } from "@/context/locale-context";
import { useDebounce } from "@/lib/use-debounce";
import { cn } from "@/lib/utils";
import type { ContentRating } from "@/types/movie";

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 12;

const allGenres = [...new Set(movies.flatMap((m) => m.genres))].sort();
const allGenresAr = [...new Set(movies.flatMap((m) => m.genresAr))].sort();

function MoviesContent() {
  const { dict, locale } = useLocale();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = (params.get("q") || "").toLowerCase();
  const filter = params.get("filter");
  const quality = params.get("quality") as ContentRating | null;
  const selectedGenre = params.get("genre") || "";
  const yearFrom = parseInt(params.get("yearFrom") || "", 10) || 0;
  const yearTo = parseInt(params.get("yearTo") || "", 10) || 0;
  const sortBy = params.get("sort") || "misrtv";

  const [searchInput, setSearchInput] = useState(params.get("q") || "");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [showAllGenres, setShowAllGenres] = useState(false);
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
    if (selectedGenre) {
      list = list.filter((m) => m.genres.includes(selectedGenre));
    }
    if (yearFrom) {
      list = list.filter((m) => m.year >= yearFrom);
    }
    if (yearTo) {
      list = list.filter((m) => m.year <= yearTo);
    }
    if (sortBy === "year") list.sort((a, b) => b.year - a.year);
    else if (sortBy === "title") list.sort((a, b) => a.titleEn.localeCompare(b.titleEn));
    else if (sortBy === "boxOffice") list.sort((a, b) => b.financials.boxOffice - a.financials.boxOffice);
    else if (sortBy === "roi") {
      const roi = (m: typeof movies[0]) => {
        const tc = m.financials.budget + (m.financials.marketing || 0);
        return tc > 0 ? (m.financials.boxOffice - tc) / tc : 0;
      };
      list.sort((a, b) => roi(b) - roi(a));
    } else list.sort((a, b) => b.ratings.misrtv - a.ratings.misrtv);
    return list;
  }, [q, filter, quality, selectedGenre, yearFrom, yearTo, sortBy]);

  const visibleMovies = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [q, filter, quality, selectedGenre, yearFrom, yearTo, sortBy]);

  function loadMore() {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, filtered.length));
  }

  function setParam(key: string, value: string) {
    const newParams = new URLSearchParams(params.toString());
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    router.push(`${pathname}?${newParams.toString()}`);
  }

  const qualityFilters = [
    { key: "", label: dict.filters.all },
    { key: "excellent", label: dict.filters.excellent, quality: "excellent" as const },
    { key: "good", label: dict.filters.good, quality: "good" as const },
  ];

  const genres = locale === "ar" ? allGenresAr : allGenres;
  const displayGenres = showAllGenres ? genres : genres.slice(0, 8);

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
        {qualityFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setParam("quality", f.quality || "")}
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

      <div className="mt-3">
        <select
          value={sortBy}
          onChange={(e) => setParam("sort", e.target.value)}
          className="rounded-lg border border-cinema-border bg-cinema-card px-3 py-1.5 text-sm text-cinema-white transition-all focus:border-cinema-red focus:outline-none"
        >
          <option value="misrtv">{dict.filters.all}</option>
          <option value="year">{locale === "ar" ? "السنة" : "Year"}</option>
          <option value="title">{locale === "ar" ? "الاسم" : "Title"}</option>
          <option value="boxOffice">{locale === "ar" ? "الإيرادات" : "Box Office"}</option>
          <option value="roi">ROI</option>
        </select>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {displayGenres.map((genre) => {
          const isActive = selectedGenre === genre;
          return (
            <button
              key={genre}
              type="button"
              onClick={() => setParam("genre", isActive ? "" : genre)}
              className={cn(
                "rounded-lg border px-2.5 py-1 text-xs transition-all duration-200",
                isActive
                  ? "border-cinema-yellow/50 bg-cinema-yellow/15 text-cinema-yellow"
                  : "border-cinema-border/50 text-cinema-muted hover:border-cinema-yellow/30 hover:text-cinema-white"
              )}
            >
              {genre}
            </button>
          );
        })}
        {genres.length > 8 && (
          <button
            type="button"
            onClick={() => setShowAllGenres(!showAllGenres)}
            className="flex items-center gap-1 rounded-lg border border-cinema-border/30 px-2.5 py-1 text-xs text-cinema-muted transition-colors hover:text-cinema-white"
          >
            {showAllGenres ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {showAllGenres
              ? (locale === "ar" ? "أقل" : "Less")
              : (locale === "ar" ? `${genres.length - 8} أكثر` : `${genres.length - 8} more`)}
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Calendar className="h-4 w-4 text-cinema-muted" />
        <input
          type="number"
          value={yearFrom || ""}
          onChange={(e) => setParam("yearFrom", e.target.value)}
          placeholder={locale === "ar" ? "من سنة" : "From year"}
          className="w-24 rounded-lg border border-cinema-border/50 bg-cinema-card px-3 py-1.5 text-sm text-cinema-white placeholder:text-cinema-muted transition-all focus:border-cinema-red focus:outline-none"
          min={2000}
          max={2026}
        />
        <span className="text-cinema-muted">—</span>
        <input
          type="number"
          value={yearTo || ""}
          onChange={(e) => setParam("yearTo", e.target.value)}
          placeholder={locale === "ar" ? "إلى سنة" : "To year"}
          className="w-24 rounded-lg border border-cinema-border/50 bg-cinema-card px-3 py-1.5 text-sm text-cinema-white placeholder:text-cinema-muted transition-all focus:border-cinema-red focus:outline-none"
          min={2000}
          max={2026}
        />
        {(yearFrom > 0 || yearTo > 0) && (
          <button
            type="button"
            onClick={() => {
              const p = new URLSearchParams(params.toString());
              p.delete("yearFrom");
              p.delete("yearTo");
              router.push(`${pathname}?${p.toString()}`);
            }}
            className="text-xs text-cinema-muted underline transition-colors hover:text-cinema-red"
          >
            {locale === "ar" ? "مسح" : "Clear"}
          </button>
        )}
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
