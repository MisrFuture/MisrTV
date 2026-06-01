"use client";

import { useState, useEffect } from "react";
import { MovieCard } from "@/components/movies/movie-card";
import { MovieGridSkeleton } from "@/components/movies/movie-card-skeleton";
import { getUpcomingMovies } from "@/data/movies";
import { useLocale } from "@/context/locale-context";
import { Calendar } from "lucide-react";

export default function UpcomingPage() {
  const { dict, locale } = useLocale();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const upcoming = getUpcomingMovies().sort(
    (a, b) =>
      new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
  );

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <Calendar className="h-8 w-8 text-cinema-yellow" />
        <div>
          <h1 className="font-display text-3xl font-bold">
            {dict.sections.upcoming}
          </h1>
          <p className="text-cinema-muted">
            {locale === "ar"
              ? "أفلام قادمة مع توقعات مصر تي في"
              : "Upcoming releases with MisrTV anticipation scores"}
          </p>
        </div>
      </div>
      {loading ? (
        <MovieGridSkeleton count={8} />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {upcoming.map((m, i) => (
            <div key={m.id} className="opacity-0 animate-slide-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}>
              <MovieCard movie={m} />
              <p className="mt-2 text-center text-xs text-cinema-yellow">
                {new Date(m.releaseDate).toLocaleDateString(
                  locale === "ar" ? "ar-EG" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
