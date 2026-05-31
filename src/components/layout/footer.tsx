"use client";

import { useLocale } from "@/context/locale-context";

export function Footer() {
  const { dict } = useLocale();
  return (
    <footer className="mt-auto border-t border-cinema-border bg-gradient-to-t from-cinema-card/50 to-transparent py-8 text-center text-sm text-cinema-muted">
      <p>{dict.footer.made}</p>
      <p className="mt-1 text-cinema-red/60">MisrTV © 2026</p>
    </footer>
  );
}
