"use client";

import Link from "next/link";
import { Film, Home, Clapperboard } from "lucide-react";
import { useLocale } from "@/context/locale-context";

export default function NotFoundPage() {
  const { dict, locale } = useLocale();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="relative">
        <Film className="h-24 w-24 text-cinema-red/30" />
        <span className="absolute inset-0 flex items-center justify-center font-display text-5xl font-bold text-cinema-red">
          404
        </span>
      </div>
      <h1 className="font-display text-3xl font-bold">
        {locale === "ar" ? "الصفحة غير موجودة" : "Page not found"}
      </h1>
      <p className="max-w-md text-cinema-muted">
        {locale === "ar"
          ? "هذا المشهد تم حذفه من النص النهائي. الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
          : "This scene was cut from the final script. The page you're looking for doesn't exist or has been moved."}
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-cinema-red bg-cinema-red px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-cinema-red/90 active:scale-95"
        >
          <Home className="h-4 w-4" />
          {locale === "ar" ? "الرئيسية" : "Back to home"}
        </Link>
        <Link
          href="/movies"
          className="inline-flex items-center gap-2 rounded-xl border border-cinema-border px-5 py-2.5 text-sm font-semibold text-cinema-white transition-all duration-200 hover:border-cinema-red hover:text-cinema-red active:scale-95"
        >
          <Clapperboard className="h-4 w-4" />
          {locale === "ar" ? "تصفح الأفلام" : "Browse movies"}
        </Link>
      </div>
    </div>
  );
}
