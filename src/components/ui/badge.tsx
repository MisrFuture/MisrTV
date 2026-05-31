import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "success" | "danger" | "muted";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-cinema-border text-zinc-300",
        variant === "gold" && "bg-cinema-gold/20 text-cinema-gold",
        variant === "success" && "bg-emerald-500/20 text-emerald-400",
        variant === "danger" && "bg-red-500/20 text-red-400",
        variant === "muted" && "bg-zinc-800 text-cinema-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
