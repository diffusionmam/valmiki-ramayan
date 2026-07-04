import Link from "next/link";
import { KandaCard } from "@/components/KandaCard";
import { KANDA_META, KANDA_SLUGS } from "@/lib/data";
import type { KandaSlug } from "@/lib/kanda-meta";
import { Separator } from "@/components/ui/separator";
import { Ornament } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden border-b border-border/40">
        {/* Om watermark */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]"
          aria-hidden
        >
          <svg
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            className="h-[60vh] max-h-[500px] w-auto text-saffron-dark dark:text-saffron"
            suppressHydrationWarning
          >
            <path d="M8 14 C 4 14, 4 9, 9 9 C 14 9, 15 14, 11 16 C 7 18, 8 23, 13 22 C 18 21, 19 15, 24 15 C 28 15, 28 20, 24 20" />
            <path d="M22 9 C 24 7, 27 8, 27 11" />
            <circle cx="24" cy="6" r="0.8" fill="currentColor" stroke="none" />
            <path d="M13 22 C 14 25, 18 26, 21 24" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <p className="animate-fade-up font-heading text-lg text-saffron sm:text-xl">
              श्रीमद्वाल्मीकीयरामायणम्
            </p>
            <h1 className="animate-fade-up-delay-1 mt-4 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Srimad Valmiki Ramayana
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              The timeless Sanskrit epic narrating the journey of virtue — 24,000
              verses across six books, with word-by-word meaning and English
              translation.
            </p>

            <Ornament
              variant="lotus"
              divider
              className="mx-auto mt-8 max-w-xs animate-fade-up-delay-3"
            />

            <p className="animate-fade-up-delay-3 mt-4 text-sm italic text-muted-foreground">
              &ldquo;aapadaam apahartaaram daataaram sarvasaMpadaam — I bow again
              and again to Sri Rama who removes all obstacles and grants all
              wealth.&rdquo;
            </p>

            {/* CTA */}
            <div className="animate-fade-up-delay-3 mt-8">
              <Link
                href="/kanda/bala/"
                className="inline-flex items-center gap-2 rounded-full border border-saffron/40 bg-saffron/10 px-6 py-3 text-sm font-medium text-saffron-dark transition-all hover:bg-saffron/20 hover:border-saffron/60 dark:text-saffron"
              >
                Begin reading
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  suppressHydrationWarning
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Six Kaandas Grid */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-10 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              The Six Kaandas
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore the six books of the Ramayana, each unfolding a unique phase
              of Sri Rama&apos;s journey.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {KANDA_SLUGS.map((slug, i) => {
            const meta = KANDA_META[slug as KandaSlug];
            return (
              <KandaCard
                key={slug}
                slug={slug as KandaSlug}
                name={meta.name}
                nameDevanagari={meta.nameDevanagari}
                nameEnglish={meta.nameEnglish}
                bookNumber={meta.bookNumber}
                description={meta.description}
                sargaCount={meta.sargaCount}
                glyph={meta.glyph}
                index={i}
              />
            );
          })}
        </div>
      </section>

      {/* About Snippet */}
      <section className="border-t border-border/40 bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                About This Project
              </h2>
              <Separator className="mx-auto my-6 max-w-[80px] bg-saffron/40" />
              <p className="leading-relaxed text-muted-foreground">
                This site presents the complete Srimad Valmiki Ramayana with
                original Sanskrit verses in Devanagari, word-by-word meanings, and
                English translations. The content is based on the monumental work
                of Sri Desiraju Hanumanta Rao and Sri K. M. K. Murthy, originally
                published at valmikiramayan.net since 1998.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Ramayana contains 24,000 verses arranged into numerous chapters
                (sargas) contained in 6 books (kaandas). Each verse is rendered in
                Devanagari Unicode alongside its word-by-word meaning and English
                gist.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
