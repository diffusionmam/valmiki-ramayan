import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getKanda, getKandaMeta, KANDA_SLUGS } from "@/lib/data";
import type { KandaSlug } from "@/lib/kanda-meta";
import { KANDA_ARCS } from "@/lib/kanda-arcs";
import { SargaExplorer } from "@/components/SargaExplorer";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { KandaGlyph } from "@/components/KandaGlyph";
import { Reveal } from "@/components/Reveal";
import { Ornament } from "@/components/Ornament";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface KandaPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return KANDA_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: KandaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = getKandaMeta(slug);
  if (!meta) return {};
  return {
    title: `${meta.name} — ${meta.nameEnglish}`,
    description: meta.description,
  };
}

export default async function KandaPage({ params }: KandaPageProps) {
  const { slug } = await params;
  const meta = getKandaMeta(slug);
  if (!meta) notFound();

  const kanda = getKanda(slug);
  const sargas = kanda?.sargas ?? [];
  const totalVerses = sargas.reduce((s, c) => s + c.verseCount, 0);
  const arcData = KANDA_ARCS[slug as KandaSlug];

  return (
    <div className={cn("flex flex-col", `kanda-${slug}`)}>
      {/* ── Accent hero band ─────────────────────────────────── */}
      <section className="kanda-accent-wash relative overflow-hidden border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <PageBreadcrumbs items={[{ label: meta.name }]} />

          <Reveal className="mt-8">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <span className="kanda-glyph-color shrink-0">
                <KandaGlyph name={meta.glyph} className="h-16 w-16" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                    {meta.name}
                  </h1>
                  <Badge variant="secondary">Book {meta.bookNumber}</Badge>
                </div>
                <p className="mt-1 font-heading text-lg text-muted-foreground/70">
                  {meta.nameDevanagari}
                </p>
                <p className="mt-1 text-lg italic text-muted-foreground">
                  {meta.nameEnglish}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              {meta.description}
            </p>

            {/* Stat row */}
            <div className="mt-6 flex flex-wrap gap-8 text-sm">
              <div>
                <p className="font-heading text-2xl font-bold kanda-glyph-color">
                  {meta.sargaCount}
                </p>
                <p className="text-muted-foreground">Chapters (Sargas)</p>
              </div>
              {totalVerses > 0 && (
                <div>
                  <p className="font-heading text-2xl font-bold kanda-glyph-color">
                    {totalVerses.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">Verses (Slokas)</p>
                </div>
              )}
              {arcData && (
                <div>
                  <p className="font-heading text-2xl font-bold kanda-glyph-color">
                    {arcData.arcs.length}
                  </p>
                  <p className="text-muted-foreground">Narrative Arcs</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Kanda in one breath — key moments ────────────────── */}
      {arcData && arcData.moments.length > 0 && (
        <section className="border-b border-border/40 bg-card/40">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                {meta.name} in One Breath
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                The pivotal moments that define this book.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {arcData.moments.map((moment, i) => (
                <Reveal key={moment.title} delay={i * 80} className="h-full">
                  <Link
                    href={`/kanda/${slug}/sarga/${moment.sarga}/`}
                    className="group flex h-full flex-col rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-saffron/30 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-saffron/10 font-heading text-sm font-bold kanda-glyph-color">
                      {i + 1}
                    </div>
                    <h3 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {moment.title}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                      {moment.description}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground/60">
                      Sarga {moment.sarga} →
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Chapters (SargaExplorer) ─────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Chapters (Sargas)
            </h2>
            <p className="mt-2 text-muted-foreground">
              {sargas.length} chapters, grouped into narrative arcs.
            </p>
            <Ornament variant="diamond" divider className="mx-auto mt-4 max-w-xs" />
          </div>
        </Reveal>

        <SargaExplorer
          kandaSlug={slug}
          sargas={sargas.map((s) => ({
            number: s.number,
            title: s.title,
            verseCount: s.verseCount,
          }))}
          arcs={arcData?.arcs ?? []}
        />
      </section>
    </div>
  );
}
