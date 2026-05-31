"use client";

import type { MovieRatings } from "@/types/movie";
import { useLocale } from "@/context/locale-context";

interface RatingBarsProps {
  ratings: MovieRatings;
}

const sources = [
  { key: "misrtv" as const, labelEn: "MisrTV", labelAr: "مصر تي في", color: "bg-cinema-gold" },
  { key: "imdb" as const, labelEn: "IMDB", labelAr: "آي إم دي بي", color: "bg-amber-500" },
  { key: "rottenTomatoes" as const, labelEn: "Tomatoes", labelAr: "طماطم", color: "bg-red-500" },
  { key: "audience" as const, labelEn: "Audience", labelAr: "الجمهور", color: "bg-blue-500" },
];

export function RatingBars({ ratings }: RatingBarsProps) {
  const { locale } = useLocale();

  return (
    <div className="space-y-3">
      {sources.map(({ key, labelEn, labelAr, color }) => {
        const raw = ratings[key];
        const pct = key === "rottenTomatoes" || key === "audience" ? raw : raw * 10;
        if (!raw) return null;
        return (
          <div key={key}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-zinc-400">
                {locale === "ar" ? labelAr : labelEn}
              </span>
              <span className="font-medium text-white">
                {key === "imdb" || key === "misrtv" ? `${raw}/10` : `${raw}%`}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-cinema-border">
              <div
                className={`h-full rounded-full ${color} transition-all`}
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
