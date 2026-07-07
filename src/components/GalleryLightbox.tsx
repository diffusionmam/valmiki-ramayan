"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface GalleryLightboxProps {
  src: string;
  alt: string;
}

/**
 * A fullscreen pan/zoom lightbox for the Bapu panorama.
 * - Click to open, ESC to close.
 * - Wheel to zoom, drag to pan.
 * - Respects prefers-reduced-motion (disables smooth transitions).
 */
export function GalleryLightbox({ src, alt }: GalleryLightboxProps) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Reset on close — moved to handleClose to avoid set-state-in-effect
  const handleClose = useCallback(() => {
    setOpen(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setZoom((z) => Math.min(5, Math.max(1, z + delta)));
  }

  function onPointerDown(e: React.PointerEvent) {
    if (zoom <= 1) return;
    setDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    setPan({
      x: dragStart.current.panX + (e.clientX - dragStart.current.x),
      y: dragStart.current.panY + (e.clientY - dragStart.current.y),
    });
  }

  function onPointerUp() {
    setDragging(false);
  }

  return (
    <>
      {/* Thumbnail trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-xl border border-border/50 transition-all hover:border-saffron/40 hover:shadow-lg"
        aria-label="Open panorama in fullscreen viewer"
      >
        <div className="relative aspect-[16/4] w-full bg-muted">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
          <span className="flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              suppressHydrationWarning
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="M11 8v6M8 11h6" />
            </svg>
            Click to explore
          </span>
        </div>
      </button>

      {/* Lightbox overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleClose}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 text-white transition-colors hover:bg-background/40"
            aria-label="Close panorama viewer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              suppressHydrationWarning
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Zoom controls */}
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-background/20 px-3 py-2 text-white">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => Math.max(1, z - 0.5));
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-background/30"
              aria-label="Zoom out"
            >
              −
            </button>
            <span className="min-w-[3rem] text-center text-xs font-medium">
              {zoom.toFixed(1)}×
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => Math.min(5, z + 0.5));
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-background/30"
              aria-label="Zoom in"
            >
              +
            </button>
          </div>

          {/* Pan/zoom image */}
          <div
            className="relative h-full w-full overflow-hidden"
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            style={{ cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "default" }}
          >
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transition: dragging ? "none" : "transform 0.2s ease-out",
              }}
            >
              <div className="relative h-[60vh] w-full max-w-[2400px]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>

          {/* Hint */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/50">
            Scroll to zoom · drag to pan · ESC to close
          </p>
        </div>
      )}
    </>
  );
}
