"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

interface ReadingProgressProps {
  /** Selector for the scroll container to measure (defaults to main content). */
  contentSelector?: string;
}

/**
 * Subscribe to the user's `prefers-reduced-motion` setting via
 * useSyncExternalStore — the React-recommended way to read external
 * state without calling setState synchronously in an effect.
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
    () => false // SSR: assume no reduced motion
  );
}

/**
 * A thin saffron bar fixed beneath the header that fills as the user
 * scrolls through the sarga. Driven by a throttled rAF scroll listener.
 * Falls back to a static full bar under prefers-reduced-motion.
 */
export function ReadingProgress({ contentSelector }: ReadingProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let ticking = false;
    let lastProgress = -1;

    function update() {
      ticking = false;
      const el = contentSelector
        ? document.querySelector(contentSelector)
        : document.documentElement;
      if (!el) return;

      const scrollTop = window.scrollY;
      const docHeight =
        (el as HTMLElement).scrollHeight ??
        document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollable = Math.max(1, docHeight - viewportHeight);
      const progress = Math.min(1, Math.max(0, scrollTop / scrollable));

      if (progress !== lastProgress && barRef.current) {
        lastProgress = progress;
        barRef.current.style.width = `${progress * 100}%`;
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
  }, [contentSelector, reduced]);

  return (
    <div
      ref={barRef}
      className={`reading-progress ${reduced ? "reduced" : ""}`}
      style={reduced ? { width: "100%", opacity: 0.3 } : { width: "0%" }}
      aria-hidden
    />
  );
}
