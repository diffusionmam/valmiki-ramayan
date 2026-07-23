import type { Metadata } from "next";
import Link from "next/link";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { KandaGlyph } from "@/components/KandaGlyph";
import { Ornament } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { cn } from "@/lib/utils";
import type { KandaSlug, KandaGlyphName } from "@/lib/kanda-meta";

export const metadata: Metadata = {
  title: "Ramayana in Art — Gallery",
  description:
    "Ramayana in art by Bapu — a visual journey through the epic depicting key events from Bala Kanda to the coronation of Sri Rama.",
};

interface GalleryEvent {
  title: string;
  kanda: string;
  kandaSlug: KandaSlug;
  glyph: KandaGlyphName;
  description: string;
  sarga: number;
}

const events: GalleryEvent[] = [
  {
    title: "Breaking of the Bow",
    kanda: "Bala Kanda",
    kandaSlug: "bala",
    glyph: "bow",
    description:
      "Sri Rama breaks the divine bow of Shiva, winning the hand of Sita in marriage.",
    sarga: 75,
  },
  {
    title: "The Golden Deer",
    kanda: "Aranya Kanda",
    kandaSlug: "aranya",
    glyph: "tree",
    description:
      "Rama, Sita, and Lakshmana encounter the magical golden deer in the forest.",
    sarga: 43,
  },
  {
    title: "Rama Killing Vali",
    kanda: "Kishkindha Kanda",
    kandaSlug: "kishkindha",
    glyph: "vanara",
    description:
      "Rama defeats Vali from behind, fulfilling his promise to Sugriva.",
    sarga: 17,
  },
  {
    title: "Rama's Battle with Ravana",
    kanda: "Yuddha Kanda",
    kandaSlug: "yuddha",
    glyph: "swords",
    description:
      "The epic confrontation between Rama and the demon king Ravana unfolds.",
    sarga: 95,
  },
  {
    title: "Sita's Fire Ordeal",
    kanda: "Yuddha Kanda",
    kandaSlug: "yuddha",
    glyph: "swords",
    description:
      "Sita proves her purity by entering fire after being rescued from Lanka.",
    sarga: 105,
  },
  {
    title: "Coronation of Sri Rama",
    kanda: "Yuddha Kanda",
    kandaSlug: "yuddha",
    glyph: "swords",
    description:
      "Rama returns to Ayodhya and is crowned king, marking the fulfillment of his exile.",
    sarga: 128,
  },
];

const exhibits = [
  {
    name: "The Bow",
    description:
      "The breaking of Shiva's bow at Sita's swayamvara — the moment Rama proves his divine strength.",
    kandaSlug: "bala" as KandaSlug,
    sarga: 75,
  },
  {
    name: "The Exile",
    description:
      "Rama, Sita, and Lakshmana depart Ayodhya for fourteen years in the forest.",
    kandaSlug: "ayodhya" as KandaSlug,
    sarga: 35,
  },
  {
    name: "The Leap",
    description:
      "Hanuman's legendary leap across the ocean to Lanka in search of Sita.",
    kandaSlug: "sundara" as KandaSlug,
    sarga: 1,
  },
  {
    name: "The War",
    description:
      "The great battle between Rama's Vanara army and Ravana's demon forces.",
    kandaSlug: "yuddha" as KandaSlug,
    sarga: 86,
  },
  {
    name: "The Return",
    description:
      "Rama, Sita, and the Vanaras return to Ayodhya in the Pushpaka vimana for the coronation.",
    kandaSlug: "yuddha" as KandaSlug,
    sarga: 121,
  },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <PageBreadcrumbs items={[{ label: "Gallery" }]} />

      <Reveal>
        <div className="mt-8">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Ramayana in Art
          </h1>
          <p className="mt-2 text-lg text-foreground/60 italic">
            A visual journey through the epic by Bapu
          </p>
          <Separator className="my-8 bg-saffron/20" />
        </div>
      </Reveal>

      <div className="space-y-12">
        {/* Panorama with lightbox */}
        <Reveal>
          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              The Panorama
            </h2>
            <p className="text-sm text-foreground/60">
              Click to open the fullscreen viewer — scroll to zoom, drag to pan.
            </p>
            <GalleryLightbox
              src="/images/gallery/Ram_full_opt1.jpg"
              alt="Ramayana panorama by Bapu — the complete epic in a single painting"
            />
          </section>
        </Reveal>

        {/* Events with kanda accents */}
        <Reveal>
          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Events Depicted
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {events.map((event, index) => (
                <div
                  key={index}
                  className={cn(
                    "group rounded-xl border border-border/50 bg-card p-5 transition-all hover:shadow-md",
                    `kanda-${event.kandaSlug}`
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className="kanda-glyph-color flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-saffron/10">
                      <KandaGlyph name={event.glyph} className="h-7 w-7" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        {event.title}
                      </h3>
                      <span className="mt-1 inline-flex items-center rounded-full bg-saffron/10 px-2 py-0.5 text-xs font-medium kanda-glyph-color">
                        {event.kanda}
                      </span>
                      <p className="mt-2 text-sm text-foreground/70">
                        {event.description}
                      </p>
                      <Link
                        href={`/kanda/${event.kandaSlug}/sarga/${event.sarga}/`}
                        className="mt-3 inline-block text-xs text-foreground/60 underline underline-offset-2 transition-colors hover:text-primary"
                      >
                        Read Sarga {event.sarga} →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Themed exhibits */}
        <Reveal>
          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Themed Exhibits
            </h2>
            <p className="text-sm text-foreground/60">
              Five pivotal moments, each a doorway into the epic.
            </p>
            <Ornament variant="lotus" divider className="max-w-xs" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {exhibits.map((exhibit, i) => (
                <Reveal key={exhibit.name} delay={i * 80}>
                  <Link
                    href={`/kanda/${exhibit.kandaSlug}/sarga/${exhibit.sarga}/`}
                    className={cn(
                      "group flex h-full flex-col rounded-xl border border-border/50 bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5",
                      `kanda-${exhibit.kandaSlug}`
                    )}
                  >
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-saffron/10 kanda-glyph-color">
                      <span className="font-heading text-sm font-bold">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {exhibit.name}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-foreground/65">
                      {exhibit.description}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Credit */}
        <Reveal>
          <Card className="border-saffron/20 bg-saffron/5">
            <CardContent className="p-6">
              <p className="text-center text-sm text-foreground/70">
                Artwork by{" "}
                <a
                  href="http://www.icpl.com/bapu/about.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Bapu
                </a>{" "}
                — Ramayana in Pictures
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
