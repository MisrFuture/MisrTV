import { movies, getFinancialSummary } from "@/data/movies";
import { movieTitle, movieOverview, type Locale } from "@/lib/i18n";
import type { Movie } from "@/types/movie";

export function generateAiResponse(
  prompt: string,
  locale: Locale
): string {
  const lower = prompt.toLowerCase();
  const isAr = locale === "ar";

  // Financial / box office queries
  if (
    lower.includes("oppenheimer") ||
    lower.includes("financial") ||
    lower.includes("box office") ||
    lower.includes("roi") ||
    lower.includes("إيراد") ||
    lower.includes("مالي")
  ) {
    const flop = movies.find((m) => m.slug === "echoes-of-petra");
    const hit = movies.find((m) => m.slug === "the-bridge-cairo");
    if (flop && hit) {
      const f = getFinancialSummary(flop);
      const h = getFinancialSummary(hit);
      return isAr
        ? `تحليل سريع:\n• ${movieTitle(hit, locale)}: ربح صافي ~$${(h.net / 1e6).toFixed(1)}M وعائد ${h.roi.toFixed(0)}% — نجاح إقليمي.\n• ${movieTitle(flop, locale)}: خسارة ~$${Math.abs(f.net / 1e6).toFixed(1)}M — ميزانية $55M مقابل إيرادات $41M.\nنصيحة: راقب نسبة التسويق إلى الميزانية قبل الحكم على الفشل.`
        : `Quick analysis:\n• ${hit.titleEn}: ~$${(h.net / 1e6).toFixed(1)}M net profit, ${h.roi.toFixed(0)}% ROI — strong regional hit.\n• ${flop.titleEn}: ~$${Math.abs(f.net / 1e6).toFixed(1)}M loss — $55M budget vs $41M box office.\nTip: Compare marketing spend to budget before calling a film a flop.`;
    }
  }

  // Comedy / family
  if (
    lower.includes("comedy") ||
    lower.includes("family") ||
    lower.includes("كوميد") ||
    lower.includes("عائل")
  ) {
    const m = movies.find((x) => x.slug === "golden-palm");
    if (m)
      return isAr
        ? `أنصح بـ «${m.titleAr}» — تصنيف ${m.ageRating}، تقييم MisrTV ${m.ratings.misrtv}/10. ${m.overviewAr}`
        : `I recommend "${m.titleEn}" — rated ${m.ageRating}, MisrTV score ${m.ratings.misrtv}/10. ${m.overviewEn}`;
  }

  // Egyptian / Arabic drama
  if (
    lower.includes("egypt") ||
    lower.includes("egyptian") ||
    lower.includes("مصر") ||
    lower.includes("عرب") ||
    lower.includes("arab")
  ) {
    const m = movies.find((x) => x.slug === "the-bridge-cairo");
    if (m)
      return isAr
        ? `«${m.titleAr}» (2025) من أقوى الدراما المصرية مؤخراً. تقييم ${m.ratings.misrtv}/10، تصنيف ${m.ageRating}. الأداء المالي ممتاز مع عائد استثماري قوي في المنطقة.`
        : `"${m.titleEn}" (2025) is standout Egyptian drama. MisrTV ${m.ratings.misrtv}/10, ${m.ageRating}. Excellent box office with strong regional ROI.`;
  }

  // Marvel / blockbuster upcoming
  if (lower.includes("marvel") || lower.includes("upcoming") || lower.includes("قادم")) {
    const upcoming = movies.filter((m) => m.status === "upcoming");
    const lines = upcoming.map(
      (m) =>
        `• ${isAr ? m.titleAr : m.titleEn} (${m.releaseDate}) — MisrTV anticipation ${m.ratings.misrtv}/10`
    );
    return isAr
      ? `أفلام قادمة واعدة:\n${lines.join("\n")}\n«إرث البحر الأحمر» يظهر أعلى توقعات عائد في السوق الخليجي.`
      : `Promising upcoming titles:\n${lines.join("\n")}\n"Red Sea Legacy" shows highest projected Gulf market ROI.`;
  }

  // Dune
  if (lower.includes("dune")) {
    return isAr
      ? "Dune 3 غير موجود في قاعدة MisrTV بعد — لكن بناءً على أداء «أفق الصحراء» (خيال علمي خليجي)، الجمهور العربي يفضل الملحمات البصرية ذات البطاقات الإقليمية."
      : "Dune 3 isn't in MisrTV DB yet — based on 'Desert Horizon' performance, Arab audiences favor visual epics with regional casts.";
  }

  // Horror / skip
  if (lower.includes("horror") || lower.includes("skip") || lower.includes("رعب")) {
    const m = movies.find((x) => x.slug === "studio-zero");
    if (m) {
      const f = getFinancialSummary(m);
      return isAr
        ? `تجنب «${m.titleAr}» — تقييم ${m.ratings.misrtv}/10، خسارة ~$${Math.abs(f.net / 1000).toFixed(0)}K. دراسة حالة لفشل جماهيري.`
        : `Skip "${m.titleEn}" — ${m.ratings.misrtv}/10, lost ~$${Math.abs(f.net / 1000).toFixed(0)}K. A textbook crowd flop.`;
    }
  }

  // Default smart recommendation
  const top = [...movies]
    .filter((m) => m.status === "released" && m.contentRating !== "poor")
    .sort((a, b) => b.ratings.misrtv - a.ratings.misrtv)
    .slice(0, 3);

  const recs = top
    .map(
      (m) =>
        `• ${movieTitle(m, locale)} (${m.ageRating}, ${m.ratings.misrtv}/10)`
    )
    .join("\n");

  return isAr
    ? `بناءً على سؤالك، إليك أفضل 3 اختيارات الآن:\n${recs}\nاسأل عن فيلم محدد للحصول على تحليل مالي وتصنيف عمري.`
    : `Based on your question, top 3 picks right now:\n${recs}\nAsk about a specific title for financial breakdown and age ratings.`;
}

export function generateMovieInsight(movie: Movie, locale: Locale): string {
  const fin = getFinancialSummary(movie);
  const isAr = locale === "ar";

  if (movie.status === "upcoming") {
    return isAr
      ? `فيلم قادم (${movie.releaseDate}). توقع MisrTV: ${movie.ratings.misrtv}/10. الميزانية $${(movie.financials.budget / 1e6).toFixed(0)}M — راقب العرض الأول إقليمياً.`
      : `Upcoming (${movie.releaseDate}). MisrTV anticipation: ${movie.ratings.misrtv}/10. Budget $${(movie.financials.budget / 1e6).toFixed(0)}M — watch regional premiere buzz.`;
  }

  const verdict =
    fin.status === "profit"
      ? isAr
        ? "نجاح مالي"
        : "financial success"
      : fin.status === "loss"
        ? isAr
          ? "خسارة شباك التذاكر"
          : "box office loss"
        : isAr
          ? "قريب من التعادل"
          : "near break-even";

  return isAr
    ? `${movie.titleAr}: ${verdict}. تقييم الجودة «${movie.contentRating}»، ${movie.ageRating}. متوسط التقييمات ${((movie.ratings.imdb + movie.ratings.misrtv) / 2).toFixed(1)}/10. ${movieOverview(movie, locale).slice(0, 120)}...`
    : `${movie.titleEn}: ${verdict}. Quality "${movie.contentRating}", ${movie.ageRating}. Avg score ${((movie.ratings.imdb + movie.ratings.misrtv) / 2).toFixed(1)}/10. ${movie.overviewEn.slice(0, 120)}...`;
}
