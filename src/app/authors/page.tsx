import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { AUTHORS } from "@/lib/authors";
import { KANDA_META } from "@/lib/kanda-meta";
import { KandaGlyph } from "@/components/KandaGlyph";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Translators",
  description:
    "The translators of Srimad Valmiki Ramayana — Sri Desiraju Hanumanta Rao and Sri K. M. K. Murthy.",
};

export default function AuthorsIndexPage() {
  const authors = Object.values(AUTHORS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <PageBreadcrumbs items={[{ label: "Translators" }]} />

      <Reveal>
        <div className="mt-8">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Translators
          </h1>
          <p className="mt-2 text-lg text-muted-foreground italic">
            The scholars who brought this epic to life
          </p>
          <Separator className="my-8 bg-saffron/20" />
        </div>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-2">
        {authors.map((author, i) => (
          <Reveal key={author.slug} delay={i * 100}>
            <Link
              href={`/authors/${author.slug}/`}
              className="block h-full"
            >
              <Card className="h-full border-border/60 transition-all hover:border-saffron/30 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-16 w-12 overflow-hidden rounded">
                      <Image
                        src={author.hanumanImages.default}
                        alt="Hanuman"
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h2 className="font-heading text-lg font-semibold text-foreground">
                        {author.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">Translator</p>
                    </div>
                  </div>

                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {author.shortBio}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {author.translatedKandas.map((kandaSlug) => {
                      const meta = KANDA_META[kandaSlug];
                      return (
                        <span
                          key={kandaSlug}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full bg-saffron/10 px-2.5 py-0.5 text-xs font-medium text-saffron-dark dark:text-saffron",
                            `kanda-${kandaSlug}`
                          )}
                        >
                          <KandaGlyph name={meta?.glyph ?? "bow"} className="h-3 w-3" />
                          {meta?.name || kandaSlug}
                        </span>
                      );
                    })}
                  </div>

                  {author.passedAway && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      Passed away in {author.passedAway}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
