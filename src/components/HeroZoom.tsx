"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";

/**
 * Subscribe to the user's `prefers-reduced-motion` setting via
 * useSyncExternalStore — mirrors the ReadingProgress pattern.
 */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const handler = () => onChange();
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

interface HeroZoomProps {
  children: ReactNode;
}

/**
 * Scroll-linked zoom wrapper for the hero background image.
 * Scales from 1.08 → 1.22 as the hero scrolls out of view, creating a
 * bidirectional "pushing deeper / pulling back" parallax. The image
 * element (child) reads --hero-zoom via the `.hero-zoom-image` class.
 * Falls back to a static scale under prefers-reduced-motion.
 */
export function HeroZoom({ children }: HeroZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let ticking = false;
    let lastScale = -1;

    function update() {
      ticking = false;
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const heroHeight = el.offsetHeight;
      // Progress: 0 when hero top is at viewport top, 1 when hero
      // has scrolled one viewport-height out (top <= -heroHeight).
      // Clamp so the zoom never overshoots once the hero is gone.
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(1, heroHeight))
      );

      // 1.08 at rest → 1.22 fully scrolled. Bidirectional by nature:
      // scrolling back up decreases progress and zooms back out.
      const scale = 1.08 + progress * 0.14;

      if (scale !== lastScale && el) {
        lastScale = scale;
        el.style.setProperty("--hero-zoom", scale.toFixed(4));
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {children}
    </div>
  );
}
