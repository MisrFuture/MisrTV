"use client";

import type { Movie } from "@/types/movie";
import { getFinancialSummary } from "@/data/movies";
import { useLocale } from "@/context/locale-context";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinancialPanelProps {
  movie: Movie;
}

export function FinancialPanel({ movie }: FinancialPanelProps) {
  const { locale, dict } = useLocale();
  const fin = getFinancialSummary(movie);

  if (movie.status === "upcoming") {
    return (
      <div className="rounded-2xl border border-cinema-border bg-cinema-card/50 p-6 text-center text-cinema-muted">
        {locale === "ar"
          ? "التحليل المالي متاح بعد الإصدار"
          : "Financial analysis available after release"}
      </div>
    );
  }

  const Icon =
    fin.status === "profit"
      ? TrendingUp
      : fin.status === "loss"
        ? TrendingDown
        : Minus;

  const items = [
    { label: dict.movie.budget, value: formatCurrency(fin.budget, locale) },
    { label: dict.movie.boxOffice, value: formatCurrency(fin.boxOffice, locale) },
    {
      label: fin.net >= 0 ? dict.movie.profit : dict.movie.loss,
      value: formatCurrency(Math.abs(fin.net), locale),
      highlight: true,
      positive: fin.net >= 0,
    },
    {
      label: dict.movie.roi,
      value: `${fin.roi >= 0 ? "+" : ""}${fin.roi.toFixed(0)}%`,
      highlight: true,
      positive: fin.roi >= 0,
    },
  ];

  return (
    <div className="rounded-2xl border border-cinema-border bg-gradient-to-br from-cinema-card to-cinema-dark p-6">
      <div
        className={cn(
          "mb-6 flex items-center gap-3 rounded-xl p-4",
          fin.status === "profit" && "bg-emerald-500/10 text-emerald-400",
          fin.status === "loss" && "bg-red-500/10 text-red-400",
          fin.status === "breakEven" && "bg-zinc-500/10 text-zinc-400"
        )}
      >
        <Icon className="h-8 w-8" />
        <div>
          <p className="text-lg font-bold">
            {dict.status[fin.status]}
          </p>
          <p className="text-sm opacity-80">
            {locale === "ar"
              ? "بعد الميزانية والتسويق"
              : "After budget & marketing"}
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className={cn(
              "rounded-xl border border-cinema-border/80 p-4",
              item.highlight && "border-cinema-gold/30"
            )}
          >
            <p className="text-xs text-cinema-muted">{item.label}</p>
            <p
              className={cn(
                "mt-1 text-xl font-bold",
                item.highlight &&
                  (item.positive ? "text-emerald-400" : "text-red-400")
              )}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
