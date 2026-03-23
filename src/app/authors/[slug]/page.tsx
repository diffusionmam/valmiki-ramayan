import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AUTHORS, getKandaNameForAuthor } from "@/lib/authors";
import { KANDA_META } from "@/lib/kanda-meta";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(AUTHORS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = AUTHORS[slug];
  if (!author) return { title: "Author Not Found" };

  return {
    title: `${author.name} — Translator`,
    description: author.shortBio,
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = AUTHORS[slug];

  if (!author) {
    notFound();
  }

  const translatedKandaNames = getKandaNameForAuthor(slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <PageBreadcrumbs
        items={[
          { label: "Authors", href: "/authors" },
          { label: author.name },
        ]}
      />

      <div className="mt-8">
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {author.name}
        </h1>
        <Separator className="my-8 bg-saffron/20" />
      </div>

      <div className="prose-custom space-y-8">
        <section className="space-y-4">
          <div className="relative aspect-[5.6/1] overflow-hidden rounded-lg">
            <Image
              src={author.headerImage}
              alt={`Header image for ${author.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        </section>

        <Card className="border-saffron/20 bg-saffron/5">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Biography</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-base leading-relaxed text-foreground/90">
              {author.fullBio.split("\n\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Translated Kandas
          </h2>
          <div className="grid gap-3">
            {author.translatedKandas.map((kandaSlug) => {
              const kandaMeta = KANDA_META[kandaSlug];
              const kandaName = translatedKandaNames[kandaSlug];
              return (
                <a
                  key={kandaSlug}
                  href={`/kanda/${kandaSlug}`}
                  className="flex items-start gap-3 rounded-lg border border-border/50 p-4 transition-all hover:border-saffron/30 hover:bg-accent/50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {kandaMeta?.bookNumber || "?"}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{kandaName}</p>
                    <p className="text-sm text-muted-foreground">
                      {kandaMeta?.nameEnglish} — {kandaMeta?.sargaCount} chapters
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <Card className="border-saffron/20 bg-saffron/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-12 shrink-0 overflow-hidden">
                <Image
                  src={author.hanumanImages.default}
                  alt="Hanuman"
                  fill
                  className="object-contain transition-transform duration-300 hover:scale-110"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="font-heading text-sm text-saffron-dark dark:text-saffron">
                  Let Hanuma take you to the Ramayana...
                </p>
                <a
                  href={author.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  valmikiramayan.net
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
