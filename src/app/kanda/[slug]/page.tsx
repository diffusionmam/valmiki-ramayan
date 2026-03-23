import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getKanda, getKandaMeta, KANDA_SLUGS } from "@/lib/data";
import { SargaList } from "@/components/SargaList";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface KandaPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return KANDA_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: KandaPageProps): Promise<Metadata> {
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <PageBreadcrumbs items={[{ label: meta.name }]} />

      {/* Header */}
      <div className="mt-8 mb-10">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{meta.icon}</span>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                {meta.name}
              </h1>
              <Badge variant="secondary">Book {meta.bookNumber}</Badge>
            </div>
            <p className="mt-1 text-lg italic text-muted-foreground">
              {meta.nameEnglish}
            </p>
          </div>
        </div>

        <Separator className="my-6 bg-saffron/20" />

        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          {meta.description}
        </p>

        <div className="mt-4 flex gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-saffron">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            {meta.sargaCount} chapters
          </span>
          {totalVerses > 0 && (
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-saffron">
                <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
              {totalVerses.toLocaleString()} verses
            </span>
          )}
        </div>
      </div>

      {/* Chapter Listing */}
      <div className="mb-6">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Chapters (Sargas)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a chapter to read the original Sanskrit verses with translation.
        </p>
      </div>

      <SargaList
        kandaSlug={slug}
        sargas={sargas.map((s) => ({
          number: s.number,
          title: s.title,
          verseCount: s.verseCount,
        }))}
      />
    </div>
  );
}
