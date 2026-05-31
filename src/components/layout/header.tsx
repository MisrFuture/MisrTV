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
    <header className="sticky top-0 z-50 border-b border-cinema-border/80 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cinema-red to-cinema-red-dark text-white shadow-lg shadow-cinema-red/30">
            <Film className="h-5 w-5" />
          </span>
          <span className="bg-gradient-to-r from-cinema-red via-cinema-red-light to-cinema-yellow bg-clip-text text-transparent">
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
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                pathname === href
                  ? "bg-cinema-red/15 text-cinema-red font-semibold"
                  : "text-cinema-muted hover:bg-cinema-card hover:text-cinema-white"
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
          className="flex items-center gap-2 rounded-lg border border-cinema-border bg-cinema-card px-3 py-2 text-sm text-cinema-muted transition-all duration-200 hover:border-cinema-red/50 hover:text-cinema-red"
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
              "whitespace-nowrap rounded-lg px-3 py-1.5 text-xs transition-colors",
              pathname === href
                ? "bg-cinema-red/15 text-cinema-red"
                : "text-cinema-muted"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
