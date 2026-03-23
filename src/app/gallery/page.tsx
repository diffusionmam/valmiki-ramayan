import type { Metadata } from "next";
import Image from "next/image";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Ramayana in art by Bapu — a visual journey through the epic depicting key events from Bala Kanda to the coronation of Sri Rama.",
};

const events = [
  {
    title: "Breaking of Bow by Sri Rama",
    kanda: "Bala Kanda",
    description:
      "Sri Rama breaks the divine bow of Shiva, winning the hand of Sita in marriage.",
  },
  {
    title: "The Incident of the Golden Deer",
    kanda: "Aranya Kanda",
    description:
      "Rama, Sita, and Lakshmana encounter the magical golden deer in the forest.",
  },
  {
    title: "Rama Killing Vali",
    kanda: "Kishkindha Kanda",
    description:
      "Rama defeats Vali from behind, fulfilling his promise to Sugriva.",
  },
  {
    title: "Rama's Battle with Ravana",
    kanda: "Yuddha Kanda",
    description:
      "The epic confrontation between Rama and the demon king Ravana unfolds.",
  },
  {
    title: "Seetha's Fire Ordeal",
    kanda: "Yuddha Kanda",
    description:
      "Sita proves her purity by entering fire after being rescued from Lanka.",
  },
  {
    title: "Coronation of Sri Rama",
    kanda: "Yuddha Kanda",
    description:
      "Rama returns to Ayodhya and is crowned king, marking the fulfillment of his exile.",
  },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <PageBreadcrumbs items={[{ label: "Gallery" }]} />

      <div className="mt-8">
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Ramayana in Art
        </h1>
        <p className="mt-2 text-lg text-muted-foreground italic">
          A visual journey through the epic by Bapu
        </p>
        <Separator className="my-8 bg-saffron/20" />
      </div>

      <div className="prose-custom space-y-8">
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            The Panorama
          </h2>
          <p className="text-sm text-muted-foreground">
            Click and drag or use scroll bars to view the complete artwork
          </p>

          <div className="relative overflow-hidden rounded-lg border border-border/50">
            <div className="relative h-48 w-full overflow-x-auto overflow-y-hidden bg-[#c0c0c0]">
              <div className="relative h-[233px] w-[1711px] max-w-none">
                <Image
                  src="/images/gallery/Ram_full_opt1.jpg"
                  alt="Ramayana panorama by Bapu"
                  fill
                  className="object-cover"
                  sizes="1711px"
                  priority
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Events Depicted
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {events.map((event, index) => (
              <Card
                key={index}
                className="border-border/60 bg-gradient-to-br from-card to-card/80"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-saffron/20 text-xs font-bold text-saffron-dark">
                      {index + 1}
                    </span>
                    <CardTitle className="font-heading text-base">
                      {event.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {event.kanda}
                  </span>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card className="border-saffron/20 bg-saffron/5">
          <CardContent className="p-6">
            <p className="text-center text-sm text-muted-foreground">
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
      </div>
    </div>
  );
}
