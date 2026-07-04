import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Ornament } from "@/components/Ornament";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <OmMark className="h-6 w-6 text-saffron" />
              <span className="font-heading text-lg font-bold text-primary">
                Valmiki Ramayana
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A modern presentation of the ancient Sanskrit epic, Srimad Valmiki
              Ramayana — 24,000 verses across 6 Kaandas.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about/"
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  About the Ramayana
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery/"
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/"
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/authors/"
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  Translators
                </Link>
              </li>
            </ul>
          </div>

          {/* Credits */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Credits
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Translation by Sri Desiraju Hanumanta Rao &amp; Sri K. M. K.
              Murthy. Original content from{" "}
              <a
                href="https://valmikiramayan.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                valmikiramayan.net
              </a>
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Valmiki Ramayana. Content © 1998–2008
            Desiraju Hanumanta Rao &amp; K. M. K. Murthy.
          </p>
          <div className="flex items-center gap-3 text-muted-foreground/70">
            <span className="font-heading text-sm">श्रीरामजयम्</span>
            <Ornament variant="diamond" className="h-4 w-4 text-saffron/60" />
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Custom Om-style mark for the footer brand. */
function OmMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      suppressHydrationWarning
      className={className}
    >
      <path d="M8 14 C 4 14, 4 9, 9 9 C 14 9, 15 14, 11 16 C 7 18, 8 23, 13 22 C 18 21, 19 15, 24 15 C 28 15, 28 20, 24 20" />
      <path d="M22 9 C 24 7, 27 8, 27 11" />
      <circle cx="24" cy="6" r="0.8" fill="currentColor" stroke="none" />
      <path d="M13 22 C 14 25, 18 26, 21 24" />
    </svg>
  );
}
