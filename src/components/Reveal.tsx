"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds before the reveal transition starts. */
  delay?: number;
  /** Vertical offset to travel during reveal (px). */
  offset?: number;
  /** Inline styles passed through to the wrapper. */
  style?: CSSProperties;
}

/**
 * Wraps children in a dependency-free scroll-reveal.
 * Respects `prefers-reduced-motion` via CSS (see globals.css).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  offset = 18,
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={{
        transitionDelay: `${delay}ms`,
        "--reveal-offset": `${offset}px`,
        ...style,
      } as CSSProperties}
    >
      {children}
    </div>
  );
}
