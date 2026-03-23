import type { Metadata } from "next";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About the Ramayana",
  description:
    "Learn about the Srimad Valmiki Ramayana — the ancient Sanskrit epic poem narrating the journey of Sri Rama. History, structure, and significance.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <PageBreadcrumbs items={[{ label: "About" }]} />

      <div className="mt-8">
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          About the Ramayana
        </h1>
        <p className="mt-2 text-lg text-muted-foreground italic">
          The timeless journey of virtue
        </p>
        <Separator className="my-8 bg-saffron/20" />
      </div>

      <div className="prose-custom space-y-8">
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

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            The Six Books
          </h2>
          <div className="grid gap-3">
            {[
              { num: 1, name: "Bala Kanda", eng: "Book of Youth", desc: "77 chapters covering Rama's birth, education, and marriage" },
              { num: 2, name: "Ayodhya Kanda", eng: "Book of Ayodhya", desc: "119 chapters about the exile and Dasharatha's death" },
              { num: 3, name: "Aranya Kanda", eng: "Book of Forest", desc: "75 chapters in the Dandaka forest, ending with Sita's abduction" },
              { num: 4, name: "Kishkindha Kanda", eng: "Empire of Holy Monkeys", desc: "67 chapters about the Vanara alliance" },
              { num: 5, name: "Sundara Kanda", eng: "Book of Beauty", desc: "68 chapters of Hanuman's journey to Lanka" },
              { num: 6, name: "Yuddha Kanda", eng: "Book of War", desc: "128 chapters of the great war and Rama's coronation" },
            ].map((book) => (
              <div
                key={book.num}
                className="flex items-start gap-3 rounded-lg border border-border/50 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {book.num}
                </span>
                <div>
                  <p className="font-medium text-foreground">
                    {book.name}{" "}
                    <span className="text-sm text-muted-foreground">
                      ({book.eng})
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">{book.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

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

        <Card className="border-saffron/20 bg-saffron/5">
          <CardContent className="p-6 text-center">
            <p className="font-heading text-lg text-saffron-dark dark:text-saffron">
              aapadaam apahartaaram daataaram sarvasaMpadaam
            </p>
            <p className="font-heading text-lg text-saffron-dark dark:text-saffron">
              lokaabhiraamam shriiraamam bhuuyo bhuuyo namaamyaham
            </p>
            <Separator className="mx-auto my-4 max-w-[60px] bg-saffron/30" />
            <p className="text-sm italic text-muted-foreground">
              &ldquo;I bow again and again to Sri Rama Who removes all
              obstacles, grants all wealth and pleases all.&rdquo;
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
