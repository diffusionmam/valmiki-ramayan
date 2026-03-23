import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getKanda, getKandaMeta, getSarga, KANDA_SLUGS } from "@/lib/data";
import { VerseBlock } from "@/components/VerseBlock";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SargaPageProps {
  params: Promise<{ slug: string; number: string }>;
}

export async function generateStaticParams() {
  const allParams: { slug: string; number: string }[] = [];
  for (const slug of KANDA_SLUGS) {
    const kanda = getKanda(slug);
    if (kanda) {
      for (const sarga of kanda.sargas) {
        allParams.push({ slug, number: String(sarga.number) });
      }
    }
  }
  return allParams;
}

export async function generateMetadata({ params }: SargaPageProps): Promise<Metadata> {
  const { slug, number } = await params;
  const meta = getKandaMeta(slug);
  const sarga = getSarga(slug, parseInt(number, 10));
  if (!meta || !sarga) return {};
  return {
    title: `${meta.name} — Sarga ${number}: ${sarga.title}`,
    description: sarga.introduction?.slice(0, 160) || `Read Sarga ${number} of ${meta.name} with Sanskrit verses and English translation.`,
  };
}

export default async function SargaPage({ params }: SargaPageProps) {
  const { slug, number: numberStr } = await params;
  const sargaNumber = parseInt(numberStr, 10);
  const meta = getKandaMeta(slug);
  if (!meta) notFound();

  const sarga = getSarga(slug, sargaNumber);
  if (!sarga) notFound();

  const kanda = getKanda(slug);
  const maxSarga = kanda?.sargas.length ?? meta.sargaCount;
  const hasPrev = sargaNumber > 1;
  const hasNext = sargaNumber < maxSarga;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <PageBreadcrumbs
        items={[
          { label: meta.name, href: `/kanda/${slug}` },
          { label: `Sarga ${sargaNumber}` },
        ]}
      />

      {/* Header */}
      <div className="mt-8 mb-8">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-saffron/30 text-saffron-dark">
            {meta.name}
          </Badge>
          <Badge variant="secondary">
            Chapter {sargaNumber} of {maxSarga}
          </Badge>
        </div>
        <h1 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {sarga.title}
        </h1>

        {sarga.introduction && (
          <>
            <Separator className="my-5 bg-saffron/20" />
            <div className="rounded-xl border border-border/50 bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">
                Introduction
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {sarga.introduction}
              </p>
            </div>
          </>
        )}

        <div className="mt-4 text-sm text-muted-foreground">
          {sarga.verseCount} verses in this chapter
        </div>
      </div>

      <Separator className="mb-8 bg-saffron/20" />

      {/* Verses */}
      {sarga.verses.length > 0 ? (
        <div className="space-y-6">
          {sarga.verses.map((verse, i) => (
            <VerseBlock key={`${verse.number}-${i}`} verse={verse} index={i} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border/50 bg-card p-12 text-center">
          <p className="text-lg text-muted-foreground">
            Verse data for this chapter is not yet available.
          </p>
          <p className="mt-2 text-sm text-muted-foreground/60">
            Please check back later or visit the{" "}
            <a
              href={`https://valmikiramayan.net`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              original source
            </a>
            .
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
        {hasPrev ? (
          <Button variant="outline" asChild>
            <Link href={`/kanda/${slug}/sarga/${sargaNumber - 1}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Previous Sarga
            </Link>
          </Button>
        ) : (
          <div />
        )}

        <Button variant="ghost" size="sm" asChild>
          <Link href={`/kanda/${slug}`}>
            All Chapters
          </Link>
        </Button>

        {hasNext ? (
          <Button variant="outline" asChild>
            <Link href={`/kanda/${slug}/sarga/${sargaNumber + 1}`}>
              Next Sarga
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
