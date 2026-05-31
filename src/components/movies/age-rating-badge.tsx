"use client";

import type { AgeRating, ContentRating } from "@/types/movie";
import { useLocale } from "@/context/locale-context";
import { Badge } from "@/components/ui/badge";
import { Shield, ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react";

interface AgeRatingBadgeProps {
  ageRating: AgeRating;
  contentRating: ContentRating;
}

const ageColors: Record<AgeRating, string> = {
  G: "text-green-400",
  PG: "text-lime-400",
  "PG-13": "text-yellow-400",
  R: "text-orange-400",
  "18+": "text-red-400",
  NR: "text-zinc-400",
};

export function AgeRatingBadge({
  ageRating,
  contentRating,
}: AgeRatingBadgeProps) {
  const { dict } = useLocale();

  const contentIcon =
    contentRating === "excellent" || contentRating === "good" ? (
      <ThumbsUp className="h-4 w-4" />
    ) : contentRating === "poor" ? (
      <ThumbsDown className="h-4 w-4" />
    ) : (
      <HelpCircle className="h-4 w-4" />
    );

  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-2 rounded-xl border border-cinema-border bg-cinema-card px-4 py-3">
        <Shield className={`h-5 w-5 ${ageColors[ageRating]}`} />
        <div>
          <p className="text-xs text-cinema-muted">{dict.movie.ageRating}</p>
          <p className={`font-bold ${ageColors[ageRating]}`}>{ageRating}</p>
          <p className="text-xs text-zinc-500">
            {dict.ageRatings[ageRating]}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-cinema-border bg-cinema-card px-4 py-3">
        {contentIcon}
        <div>
          <p className="text-xs text-cinema-muted">
            {dict.movie.contentRating}
          </p>
          <Badge
            variant={
              contentRating === "excellent"
                ? "success"
                : contentRating === "poor"
                  ? "danger"
                  : "default"
            }
          >
            {dict.contentRatings[contentRating]}
          </Badge>
        </div>
      </div>
    </div>
  );
}
