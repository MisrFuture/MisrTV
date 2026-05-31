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
        variant === "default" && "bg-cinema-border text-cinema-white",
        variant === "gold" && "bg-cinema-yellow/20 text-cinema-yellow",
        variant === "success" && "bg-cinema-red/20 text-cinema-red-light",
        variant === "danger" && "bg-red-500/20 text-red-400",
        variant === "muted" && "bg-cinema-card text-cinema-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
