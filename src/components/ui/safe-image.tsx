"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Film } from "lucide-react";

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function SafeImage({
  src,
  alt,
  fill,
  className,
  priority,
  sizes,
}: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-cinema-border/20">
        <Film className="h-8 w-8 text-cinema-muted" />
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={800}
      height={1200}
      priority={priority}
      sizes={sizes}
      onError={() => setError(true)}
    />
  );
}
