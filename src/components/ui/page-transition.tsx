"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [display, setDisplay] = useState(children);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
    const timeout = setTimeout(() => {
      setDisplay(children);
      setTransitioning(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, [pathname, children]);

  return (
    <div
      className={`transition-all duration-300 ${
        transitioning ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {display}
    </div>
  );
}
