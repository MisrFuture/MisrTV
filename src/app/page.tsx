"use client";

import { Hero } from "@/components/home/hero";
import { MovieCard } from "@/components/movies/movie-card";
import { useLocale } from "@/context/locale-context";
import {
  getTrendingMovies,
  getUpcomingMovies,
  getArabCinemaMovies,
} from "@/data/movies";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const { dict } = useLocale();
  const trending = getTrendingMovies();
  const upcoming = getUpcomingMovies();
  const arab = getArabCinemaMovies().slice(0, 4);

  return (
    <div className="space-y-12">
      <Hero />

      <Section title={dict.sections.trending} href="/movies">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {trending.map((m) => (
            <MovieCard key={m.id} movie={m} showFinance />
          ))}
        </div>
      </Section>

      <Section title={dict.sections.arabCinema} href="/movies?filter=arab">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {arab.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </Section>

      <Section title={dict.sections.upcoming} href="/upcoming">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {upcoming.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-white">{title}</h2>
        <Link
          href={href}
          className="flex items-center gap-1 text-sm text-cinema-gold hover:underline"
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {children}
    </section>
  );
}
