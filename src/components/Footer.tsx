import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { KANDA_META, KANDA_SLUGS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🙏</span>
              <span className="font-heading text-lg font-bold text-primary">
                Valmiki Ramayana
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A modern presentation of the ancient Sanskrit epic, Srimad Valmiki
              Ramayana — 24,000 verses across 6 Kaandas.
            </p>
          </div>

          {/* Six Kaandas */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Six Kaandas
            </h3>
            <ul className="space-y-2">
              {KANDA_SLUGS.map((slug) => {
                const meta = KANDA_META[slug];
                return (
                  <li key={slug}>
                    <Link
                      href={`/kanda/${slug}`}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {meta.icon} {meta.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Pages
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  About the Ramayana
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/authors"
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
          <p className="font-heading text-sm text-muted-foreground/60">
            श्रीरामजयम्
          </p>
        </div>
      </div>
    </footer>
  );
}
