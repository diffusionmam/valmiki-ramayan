import { cn } from "@/lib/utils";

type OrnamentVariant = "lotus" | "kalasha" | "mandala" | "diamond" | "torana";

interface OrnamentProps {
  variant?: OrnamentVariant;
  className?: string;
  /** Render as a horizontal divider with flanking gradient rules. */
  divider?: boolean;
}

/**
 * Ornamental SVG flourishes inspired by temple iconography.
 * Use `divider` for a centered ornament between gradient lines,
 * or omit it for a standalone mark.
 */
export function Ornament({
  variant = "lotus",
  className,
  divider = false,
}: OrnamentProps) {
  const mark = <OrnamentMark variant={variant} className={cn("h-6 w-6", className)} />;

  if (!divider) return mark;

  return (
    <div
      className="ornament-divider flex items-center justify-center gap-4"
      role="separator"
      aria-orientation="horizontal"
    >
      {mark}
    </div>
  );
}

function OrnamentMark({
  variant,
  className,
}: {
  variant: OrnamentVariant;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    suppressHydrationWarning: true,
    className,
  };

  switch (variant) {
    case "lotus":
      return (
        <svg {...common}>
          {/* Center petal */}
          <path d="M12 4 C 14 9, 14 13, 12 16 C 10 13, 10 9, 12 4 Z" />
          {/* Side petals */}
          <path d="M12 16 C 8 12, 6 9, 6 13 C 6 15, 9 16, 12 16 Z" />
          <path d="M12 16 C 16 12, 18 9, 18 13 C 18 15, 15 16, 12 16 Z" />
          {/* Outer petals */}
          <path d="M12 16 C 6 14, 3 12, 4 15 C 5 17, 9 17, 12 16 Z" />
          <path d="M12 16 C 18 14, 21 12, 20 15 C 19 17, 15 17, 12 16 Z" />
          {/* Base */}
          <path d="M6 17 L 18 17" />
        </svg>
      );

    case "kalasha":
      // Sacred vessel — coconut + pot.
      return (
        <svg {...common}>
          {/* Coconut / crown */}
          <path d="M10 3 C 10 1, 14 1, 14 3 L 14 5 L 10 5 Z" />
          <path d="M9 5 L 15 5" />
          {/* Neck */}
          <path d="M10 5 C 10 7, 14 7, 14 5" />
          {/* Pot body */}
          <path d="M8 8 C 6 11, 6 16, 9 18 L 15 18 C 18 16, 18 11, 16 8 Z" />
          {/* Base */}
          <path d="M9 18 L 15 18" />
          <path d="M8 20 L 16 20" />
          {/* Decorative band */}
          <path d="M7 12 L 17 12" />
        </svg>
      );

    case "mandala":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5.5" />
          <circle cx="12" cy="12" r="2" />
          {/* Spokes */}
          <path d="M12 3 L 12 21" />
          <path d="M3 12 L 21 12" />
          <path d="M5.6 5.6 L 18.4 18.4" />
          <path d="M18.4 5.6 L 5.6 18.4" />
        </svg>
      );

    case "diamond":
      return (
        <svg {...common}>
          <path d="M12 3 L 21 12 L 12 21 L 3 12 Z" />
          <path d="M12 3 L 12 21" />
          <path d="M3 12 L 21 12" />
          <path d="M6.5 6.5 L 17.5 17.5" />
          <path d="M17.5 6.5 L 6.5 17.5" />
        </svg>
      );

    case "torana":
      // Decorative arch / doorway.
      return (
        <svg {...common}>
          <path d="M3 20 L 3 12 C 3 6, 9 4, 12 4 C 15 4, 21 6, 21 12 L 21 20" />
          <path d="M6 20 L 6 13 C 6 9, 9 7, 12 7 C 15 7, 18 9, 18 13 L 18 20" />
          <path d="M1 20 L 23 20" />
          <circle cx="12" cy="4" r="1" />
        </svg>
      );

    default:
      return null;
  }
}
