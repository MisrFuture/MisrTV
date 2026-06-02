"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeftRight, RotateCcw, Star } from "lucide-react";
import { movies } from "@/data/movies";
import { useLocale } from "@/context/locale-context";
import { movieTitle } from "@/lib/i18n";
import { SafeImage } from "@/components/ui/safe-image";
import type { Movie } from "@/types/movie";

export default function ComparePage() {
  const { dict, locale, rtl } = useLocale();
  const [firstId, setFirstId] = useState<string | null>(null);
  const [secondId, setSecondId] = useState<string | null>(null);
  const [step, setStep] = useState<"first" | "second" | "result">("first");

  const first = useMemo(
    () => (firstId ? movies.find((m) => m.id === firstId) : null),
    [firstId]
  );
  const second = useMemo(
    () => (secondId ? movies.find((m) => m.id === secondId) : null),
    [secondId]
  );

  function selectMovie(id: string) {
    if (step === "first") {
      setFirstId(id);
      setStep("second");
    } else if (step === "second" && id !== firstId) {
      setSecondId(id);
      setStep("result");
    }
  }

  function reset() {
    setFirstId(null);
    setSecondId(null);
    setStep("first");
  }

  if (step === "first" || step === "second") {
    const exclude = step === "second" ? firstId : null;
    const available = movies.filter((m) => m.id !== exclude);

    return (
      <div>
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">{dict.compare.title}</h1>
          <p className="mt-2 text-cinema-muted">{dict.compare.subtitle}</p>
        </div>

        {first && (
          <div className="mb-6 flex items-center gap-4 rounded-xl border border-cinema-border bg-cinema-card p-4">
            <div className="relative h-16 w-12 overflow-hidden rounded-lg">
              <SafeImage src={first.poster} alt="" fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs text-cinema-muted">
                {step === "second" ? dict.compare.selectSecond : dict.compare.selectFirst}
              </p>
              <p className="font-semibold">{movieTitle(first, locale)}</p>
            </div>
          </div>
        )}

        {!first && (
          <p className="mb-6 text-cinema-yellow">
            {dict.compare.selectFirst}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {available.map((m) => {
            const title = movieTitle(m, locale);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => selectMovie(m.id)}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-cinema-border bg-cinema-card text-start transition-all duration-200 hover:border-cinema-red/50 hover:shadow-lg hover:shadow-cinema-red/5"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <SafeImage
                    src={m.poster}
                    alt={title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 text-sm font-semibold text-cinema-yellow backdrop-blur">
                    <Star className="h-3 w-3 fill-cinema-yellow" />
                    {m.ratings.misrtv}
                  </div>
                </div>
                <div className="p-2">
                  <p className="line-clamp-1 text-sm font-medium">{title}</p>
                  <p className="text-xs text-cinema-muted">{m.year}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (!first || !second) return null;

  function better(a: number, b: number): "first" | "second" | undefined {
    return a > b ? "first" : b > a ? "second" : undefined;
  }

  const rows: { label: string; arLabel: string; val1: string; val2: string; highlight?: "first" | "second" }[] = [
    { label: dict.compare.year, arLabel: dict.compare.year, val1: String(first.year), val2: String(second.year) },
    { label: dict.compare.runtime, arLabel: dict.compare.runtime, val1: `${first.runtime} min`, val2: `${second.runtime} min` },
    { label: dict.compare.genre, arLabel: dict.compare.genre, val1: (locale === "ar" ? first.genresAr : first.genres).join(", "), val2: (locale === "ar" ? second.genresAr : second.genres).join(", ") },
    { label: dict.compare.director, arLabel: dict.compare.director, val1: locale === "ar" ? first.directorAr : first.director, val2: locale === "ar" ? second.directorAr : second.director },
    { label: dict.compare.ageRating, arLabel: dict.compare.ageRating, val1: first.ageRating, val2: second.ageRating },
    { label: dict.compare.quality, arLabel: dict.compare.quality, val1: dict.contentRatings[first.contentRating], val2: dict.contentRatings[second.contentRating] },
    { label: `MisrTV`, arLabel: `MisrTV`, val1: String(first.ratings.misrtv), val2: String(second.ratings.misrtv), highlight: better(first.ratings.misrtv, second.ratings.misrtv) },
    { label: "IMDB", arLabel: "IMDB", val1: String(first.ratings.imdb), val2: String(second.ratings.imdb), highlight: better(first.ratings.imdb, second.ratings.imdb) },
    { label: "Rotten Tomatoes", arLabel: "Rotten Tomatoes", val1: `${first.ratings.rottenTomatoes}%`, val2: `${second.ratings.rottenTomatoes}%`, highlight: better(first.ratings.rottenTomatoes, second.ratings.rottenTomatoes) },
    { label: dict.compare.budget, arLabel: dict.compare.budget, val1: `$${(first.financials.budget / 1e6).toFixed(1)}M`, val2: `$${(second.financials.budget / 1e6).toFixed(1)}M` },
    { label: dict.compare.boxOffice, arLabel: dict.compare.boxOffice, val1: `$${(first.financials.boxOffice / 1e6).toFixed(1)}M`, val2: `$${(second.financials.boxOffice / 1e6).toFixed(1)}M`, highlight: better(first.financials.boxOffice, second.financials.boxOffice) },
    { label: dict.compare.roi, arLabel: dict.compare.roi, val1: `${calcROI(first)}%`, val2: `${calcROI(second)}%`, highlight: better(Number(calcROI(first)), Number(calcROI(second))) },
  ];

  const title1 = movieTitle(first, locale);
  const title2 = movieTitle(second, locale);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">{dict.compare.title}</h1>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl border border-cinema-border px-4 py-2 text-sm text-cinema-muted transition-all duration-200 hover:border-cinema-red hover:text-cinema-red active:scale-95"
        >
          <RotateCcw className="h-4 w-4" />
          {dict.compare.startOver}
        </button>
      </div>

      <div className={`flex items-start gap-4 ${rtl ? "flex-row-reverse" : ""}`}>
        <div className="flex-1">
          <Link href={`/movies/${first.slug}`} className="group block">
            <div className="relative mx-auto mb-3 h-64 w-44 overflow-hidden rounded-xl border-2 border-cinema-border transition-all duration-200 group-hover:border-cinema-red/50">
              <SafeImage src={first.poster} alt={title1} fill className="object-cover" />
            </div>
            <p className="text-center font-semibold group-hover:text-cinema-red transition-colors">{title1}</p>
          </Link>
        </div>

        <div className="flex shrink-0 items-center pt-16">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cinema-yellow/40 bg-cinema-yellow/10">
            <ArrowLeftRight className="h-5 w-5 text-cinema-yellow" />
          </div>
        </div>

        <div className="flex-1">
          <Link href={`/movies/${second.slug}`} className="group block">
            <div className="relative mx-auto mb-3 h-64 w-44 overflow-hidden rounded-xl border-2 border-cinema-border transition-all duration-200 group-hover:border-cinema-red/50">
              <SafeImage src={second.poster} alt={title2} fill className="object-cover" />
            </div>
            <p className="text-center font-semibold group-hover:text-cinema-red transition-colors">{title2}</p>
          </Link>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-cinema-border">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`flex items-center border-b border-cinema-border/50 last:border-0 ${
              i % 2 === 0 ? "bg-cinema-card/50" : ""
            }`}
          >
            <div className="w-1/3 px-4 py-3 text-sm font-medium text-cinema-muted">
              {locale === "ar" ? row.arLabel : row.label}
            </div>
            <div className="flex w-2/3 items-center">
              <div className={`flex-1 px-4 py-3 text-sm ${row.highlight === "first" ? "text-cinema-yellow font-semibold" : "text-cinema-white"}`}>
                {row.val1}
              </div>
              <div className={`flex-1 px-4 py-3 text-sm ${row.highlight === "second" ? "text-cinema-yellow font-semibold" : "text-cinema-white"}`}>
                {row.val2}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function calcROI(movie: Movie): string {
  const totalCost = movie.financials.budget + (movie.financials.marketing || 0);
  if (totalCost === 0) return "0";
  return ((movie.financials.boxOffice - totalCost) / totalCost * 100).toFixed(0);
}
