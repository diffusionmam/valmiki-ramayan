import { KandaCard } from "@/components/KandaCard";
import { KANDA_META, KANDA_SLUGS } from "@/lib/data";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
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

            <div className="animate-fade-up-delay-3 ornament-divider mx-auto mt-8 max-w-xs">
              <span className="font-heading text-saffron">❖</span>
            </div>

            <p className="animate-fade-up-delay-3 mt-4 text-sm italic text-muted-foreground">
              &ldquo;aapadaam apahartaaram daataaram sarvasaMpadaam — I bow again
              and again to Sri Rama who removes all obstacles and grants all
              wealth.&rdquo;
            </p>
          </div>
        </div>

        {/* Decorative background pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]">
          <div className="h-full w-full bg-[repeating-linear-gradient(45deg,currentColor_0px,currentColor_1px,transparent_1px,transparent_12px)]" />
        </div>
      </section>

      {/* Six Kaandas Grid */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            The Six Kaandas
          </h2>
          <p className="mt-2 text-muted-foreground">
            Explore the six books of the Ramayana, each unfolding a unique phase
            of Sri Rama&apos;s journey.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {KANDA_SLUGS.map((slug, i) => {
            const meta = KANDA_META[slug];
            return (
              <KandaCard
                key={slug}
                slug={slug}
                name={meta.name}
                nameEnglish={meta.nameEnglish}
                bookNumber={meta.bookNumber}
                description={meta.description}
                sargaCount={meta.sargaCount}
                icon={meta.icon}
                index={i}
              />
            );
          })}
        </div>
      </section>

      {/* About Snippet */}
      <section className="border-t border-border/40 bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
        </div>
      </section>
    </div>
  );
}
