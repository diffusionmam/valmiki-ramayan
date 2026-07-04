import { cn } from "@/lib/utils";
import type { KandaGlyphName } from "@/lib/kanda-meta";

interface KandaGlyphProps {
  name: KandaGlyphName;
  className?: string;
  /** When true, the glyph strokes draw in via stroke-dashoffset. */
  animate?: boolean;
  /** Stroke width. */
  strokeWidth?: number;
}

/**
 * Hand-crafted line-art glyphs for the six Kaandas.
 * Stroke-based so they can draw-on-reveal and inherit `currentColor`.
 */
export function KandaGlyph({
  name,
  className,
  animate = false,
  strokeWidth = 1.4,
}: KandaGlyphProps) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    suppressHydrationWarning: true,
    className: cn(
      "h-7 w-7",
      animate && "glyph-draw",
      className
    ),
  };

  switch (name) {
    case "bow":
      // Shiva's bow — curved limb, string, arrow nocked.
      return (
        <svg {...common}>
          {/* Bow limb */}
          <path d="M14 6 C 6 18, 6 30, 14 42" />
          {/* Bowstring */}
          <path d="M14 6 L 14 42" />
          {/* Arrow */}
          <path d="M9 24 L 40 24" />
          <path d="M36 20 L 40 24 L 36 28" />
          {/* Grip */}
          <path d="M11 21 L 11 27" />
        </svg>
      );

    case "throne":
      // Throne / palace — coronation, Ayodhya.
      return (
        <svg {...common}>
          {/* Throne backrest */}
          <path d="M16 14 L 16 30" />
          <path d="M32 14 L 32 30" />
          {/* Top crown ornament */}
          <path d="M16 14 C 20 8, 28 8, 32 14" />
          <path d="M24 8 L 24 12" />
          <circle cx="24" cy="6" r="1.5" />
          {/* Seat */}
          <path d="M12 30 L 36 30" />
          {/* Armrests */}
          <path d="M12 30 L 12 36 L 36 36 L 36 30" />
          {/* Legs */}
          <path d="M15 36 L 15 42" />
          <path d="M33 36 L 33 42" />
          {/* Base */}
          <path d="M10 42 L 38 42" />
        </svg>
      );

    case "tree":
      // Leafy tree — Dandaka forest.
      return (
        <svg {...common}>
          {/* Canopy */}
          <path d="M24 6 C 16 10, 14 18, 18 22 C 14 24, 14 30, 20 30 C 18 34, 24 36, 24 36 C 24 36, 30 34, 28 30 C 34 30, 34 24, 30 22 C 34 18, 32 10, 24 6 Z" />
          {/* Trunk */}
          <path d="M24 30 L 24 42" />
          {/* Roots / ground */}
          <path d="M16 42 L 32 42" />
          <path d="M19 42 L 21 38" />
          <path d="M29 42 L 27 38" />
        </svg>
      );

    case "vanara":
      // Vanara (monkey) face — Kishkindha.
      return (
        <svg {...common}>
          {/* Face outline */}
          <path d="M16 18 C 16 12, 32 12, 32 18 L 32 30 C 32 36, 16 36, 16 30 Z" />
          {/* Ears */}
          <path d="M14 16 C 11 14, 10 18, 12 20" />
          <path d="M34 16 C 37 14, 38 18, 36 20" />
          {/* Eyes */}
          <circle cx="20" cy="23" r="1.3" />
          <circle cx="28" cy="23" r="1.3" />
          {/* Muzzle */}
          <path d="M19 28 C 22 30, 26 30, 29 28" />
          <path d="M24 28 L 24 31" />
          {/* Brow crest */}
          <path d="M18 20 L 22 21" />
          <path d="M30 20 L 26 21" />
        </svg>
      );

    case "wave":
      // Ocean wave + leap arc — Hanuman's leap, Sundara.
      return (
        <svg {...common}>
          {/* Leap arc */}
          <path d="M6 36 C 14 8, 34 8, 42 36" />
          {/* Sun/moon */}
          <circle cx="24" cy="14" r="3" />
          {/* Waves */}
          <path d="M6 38 C 10 35, 14 38, 18 38 C 22 38, 22 35, 26 35 C 30 35, 30 38, 34 38 C 38 38, 38 35, 42 38" />
          <path d="M6 42 C 10 40, 14 42, 18 42 C 22 42, 22 40, 26 40 C 30 40, 30 42, 34 42 C 38 42, 38 40, 42 42" />
        </svg>
      );

    case "swords":
      // Crossed weapons — the great war, Yuddha.
      return (
        <svg {...common}>
          {/* Sword 1 (top-left to bottom-right) */}
          <path d="M10 10 L 34 34" />
          <path d="M8 12 L 12 8" />
          <path d="M7 14 L 11 14 L 11 10" />
          {/* Sword 2 (top-right to bottom-left) */}
          <path d="M38 10 L 14 34" />
          <path d="M40 12 L 36 8" />
          <path d="M41 14 L 37 14 L 37 10" />
          {/* Pommels */}
          <circle cx="34" cy="34" r="1.5" />
          <circle cx="14" cy="34" r="1.5" />
        </svg>
      );

    default:
      return null;
  }
}
