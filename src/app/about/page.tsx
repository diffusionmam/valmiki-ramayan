import type { Metadata } from "next";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { KANDA_META, KANDA_SLUGS } from "@/lib/data";
import type { KandaSlug } from "@/lib/kanda-meta";
import { KandaGlyph } from "@/components/KandaGlyph";
import { Ornament } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About the Ramayana",
  description:
    "Learn about the Srimad Valmiki Ramayana — the ancient Sanskrit epic poem narrating the journey of Sri Rama. History, structure, and significance.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <PageBreadcrumbs items={[{ label: "About" }]} />

      <Reveal>
        <div className="mt-8">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            About the Ramayana
          </h1>
          <p className="mt-2 text-lg text-foreground/60 italic">
            The timeless journey of virtue
          </p>
          <Separator className="my-8 bg-saffron/20" />
        </div>
      </Reveal>

      <div className="prose-custom space-y-8">
        <Reveal>
          <section className="space-y-4">
            <p className="text-base leading-relaxed text-foreground/90">
              Srimad Valmiki Ramayana is an epic poem of India which narrates the
              journey of Virtue to annihilate vice. Sri Rama is the Hero and{" "}
              <em>aayana</em> is His journey. We in India believe that Sri Rama
              lived in Treta Yug, millennia BC, and we are presently concerned
              with what Srimad Valmiki Ramayana tells us, rather than when it was
              told.
            </p>

            <p className="text-base leading-relaxed text-foreground/90">
              This epic poem Ramayana is a <em>smriti</em> which is translated as
              &ldquo;from memory.&rdquo; Given the antiquity of Srimad Valmiki
              Ramayana, there have been some interjected verses. Sometimes these
              verses can be contradicting. However, scholars, grammarians, and
              historians have put lot of effort to standardize the original text,
              by verifying various manuscripts available from various parts of
              India, thus trying to stabilize and save the text from further
              contradictions.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <Card className="border-saffron/20 bg-saffron/5">
            <CardContent className="p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                Structure of the Ramayana
              </h2>
              <p className="text-sm leading-relaxed text-foreground/80">
                Srimad Valmiki Ramayana is composed of verses called{" "}
                <em>Sloka</em>, in Sanskrit language, in a complex meter called{" "}
                <em>Anustup</em>. These verses are grouped into individual chapters
                called <em>Sargas</em>, wherein a specific event or intent is told.
                These chapters are grouped into books called <em>Kaandas</em>
                &mdash; where Kaanda means the inter-node stem of sugar cane, or a
                particular phase of the story.
              </p>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal>
          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              The Six Books
            </h2>
            <div className="grid gap-3">
              {KANDA_SLUGS.map((slug) => {
                const book = KANDA_META[slug as KandaSlug];
                return (
                  <div
                    key={slug}
                    className={cn("flex items-start gap-3 rounded-lg border border-border/50 p-4", `kanda-${slug}`)}
                  >
                    <span className="kanda-glyph-color flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                      <KandaGlyph name={book.glyph} className="h-7 w-7" />
                    </span>
                    <div>
                      <p className="font-medium text-foreground">
                        {book.name}{" "}
                        <span className="text-sm text-muted-foreground">
                          ({book.nameEnglish})
                        </span>
                      </p>
                      <p className="text-sm text-foreground/70">
                        {book.sargaCount} chapters — {book.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              The Translators
            </h2>
            <p className="text-base leading-relaxed text-foreground/90">
              This Valmiki Ramayana in Sanskrit is translated and presented by{" "}
              <strong>Sri Desiraju Hanumanta Rao</strong> (Bala, Aranya and
              Kishkindha Kanda) and <strong>Sri K. M. K. Murthy</strong> (Ayodhya,
              Sundara and Yuddha Kanda) with contributions from Durga Naaga Devi,
              Vaasudeva Kishore, Smt. Desiraju Kumari, and Smt. K. Rajeswari —
              with all enthusiasm and devotion to the classical literature of
              India.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <Card className="border-saffron/20 bg-saffron/5">
            <CardContent className="p-6 text-center">
              <p className="font-heading text-lg text-saffron-dark dark:text-saffron">
                aapadaam apahartaaram daataaram sarvasaMpadaam
              </p>
              <p className="font-heading text-lg text-saffron-dark dark:text-saffron">
                lokaabhiraamam shriiraamam bhuuyo bhuuyo namaamyaham
              </p>
              <Ornament variant="diamond" divider className="mx-auto my-4 max-w-[120px]" />
              <p className="text-sm italic text-foreground/70">
                &ldquo;I bow again and again to Sri Rama Who removes all
                obstacles, grants all wealth and pleases all.&rdquo;
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
