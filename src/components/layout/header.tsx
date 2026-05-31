"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Sparkles, User, Calendar, Home, Languages } from "lucide-react";
import { useLocale } from "@/context/locale-context";
import { cn } from "@/lib/utils";

export function Header() {
  const { dict, locale, toggleLocale, rtl } = useLocale();
  const pathname = usePathname();

  const links = [
    { href: "/", label: dict.nav.home, icon: Home },
    { href: "/movies", label: dict.nav.movies, icon: Film },
    { href: "/upcoming", label: dict.nav.upcoming, icon: Calendar },
    { href: "/ai", label: dict.nav.ai, icon: Sparkles },
    { href: "/profile", label: dict.nav.profile, icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-cinema-border/80 bg-cinema-dark/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cinema-gold to-amber-600 text-cinema-dark">
            <Film className="h-5 w-5" />
          </span>
          <span className="bg-gradient-to-r from-cinema-gold to-amber-200 bg-clip-text text-transparent">
            {dict.brand}
          </span>
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-1 md:flex",
            rtl && "flex-row-reverse"
          )}
        >
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === href
                  ? "bg-cinema-gold/15 text-cinema-gold"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleLocale}
          className="flex items-center gap-2 rounded-lg border border-cinema-border bg-cinema-card px-3 py-2 text-sm text-zinc-300 transition hover:border-cinema-gold/50 hover:text-cinema-gold"
          aria-label="Toggle language"
        >
          <Languages className="h-4 w-4" />
          {locale === "en" ? "العربية" : "English"}
        </button>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-cinema-border/50 px-4 py-2 md:hidden">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "whitespace-nowrap rounded-lg px-3 py-1.5 text-xs",
              pathname === href
                ? "bg-cinema-gold/15 text-cinema-gold"
                : "text-zinc-400"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
