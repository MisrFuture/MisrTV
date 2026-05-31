"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { useLocale } from "@/context/locale-context";

export function Hero() {
  const { dict } = useLocale();
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/movies?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/movies");
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-cinema-border bg-cinema-card px-6 py-16 sm:px-12 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-cinema-gold">
          {dict.tagline}
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {dict.hero.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
          {dict.hero.subtitle}
        </p>
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cinema-muted rtl:left-auto rtl:right-4" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={dict.hero.search}
              className="w-full rounded-xl border border-cinema-border bg-cinema-dark py-3.5 pl-12 pr-4 text-white placeholder:text-cinema-muted focus:border-cinema-gold focus:outline-none focus:ring-1 focus:ring-cinema-gold rtl:pl-4 rtl:pr-12"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-cinema-gold to-amber-500 px-6 py-3.5 font-semibold text-cinema-dark transition hover:opacity-90"
          >
            {dict.hero.explore}
          </button>
        </form>
        <button
          type="button"
          onClick={() => router.push("/ai")}
          className="mt-4 inline-flex items-center gap-2 text-sm text-cinema-gold hover:underline"
        >
          <Sparkles className="h-4 w-4" />
          {dict.nav.ai}
        </button>
      </div>
    </section>
  );
}
