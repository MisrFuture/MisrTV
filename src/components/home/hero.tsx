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
    <section className="relative overflow-hidden rounded-3xl border border-cinema-border bg-gradient-to-br from-cinema-card via-cinema-card to-black px-6 py-16 sm:px-12 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient" />
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-3 animate-slide-down text-sm font-medium uppercase tracking-widest text-cinema-yellow">
          {dict.tagline}
        </p>
        <h1 className="animate-fade-in font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl gradient-text">
          {dict.hero.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl animate-slide-up text-lg text-cinema-muted" style={{ animationDelay: "100ms" }}>
          {dict.hero.subtitle}
        </p>
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cinema-muted rtl:left-auto rtl:right-4" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={dict.hero.search}
              className="w-full rounded-xl border border-cinema-border bg-black py-3.5 pl-12 pr-4 text-cinema-white placeholder:text-cinema-muted transition-all duration-300 focus:border-cinema-red focus:outline-none focus:ring-1 focus:ring-cinema-red/50 rtl:pl-4 rtl:pr-12"
            />
          </div>
          <button
            type="submit"
            className="btn-primary animate-pulse-glow"
          >
            {dict.hero.explore}
          </button>
        </form>
        <button
          type="button"
          onClick={() => router.push("/ai")}
          className="mt-4 inline-flex animate-fade-in items-center gap-2 text-sm text-cinema-yellow transition-colors hover:text-cinema-red"
          style={{ animationDelay: "350ms" }}
        >
          <Sparkles className="h-4 w-4" />
          {dict.nav.ai}
        </button>
      </div>
    </section>
  );
}
