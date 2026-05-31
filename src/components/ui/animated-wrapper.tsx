"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedWrapperProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in" | "slide-up" | "scale-in" | "slide-down";
  delay?: number;
  stagger?: boolean;
}

export function AnimatedWrapper({
  children,
  className,
  animation = "slide-up",
  delay = 0,
  stagger = false,
}: AnimatedWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        stagger && "opacity-0",
        visible && `animate-${animation}`,
        !stagger && (visible ? `animate-${animation}` : "opacity-0"),
        className
      )}
      style={stagger && visible ? { animation: `slide-up 0.5s ease-out ${delay}ms forwards` } : undefined}
    >
      {children}
    </div>
  );
}

export function StaggerGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {childrenArray.map((child, i) => (
        <div
          key={i}
          className="opacity-0 animate-slide-up"
          style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
