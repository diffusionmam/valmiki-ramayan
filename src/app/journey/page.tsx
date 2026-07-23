import type { Metadata } from "next";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Ornament } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { JourneyMap } from "@/components/JourneyMap";

export const metadata: Metadata = {
  title: "Rama's Journey — Ayodhya to Lanka",
  description:
    "Trace the Ramayan route from Ayodhya to Lanka — the path of Rama's exile, search, war, and return.",
};

export default function JourneyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <PageBreadcrumbs items={[{ label: "The Journey" }]} />

      <Reveal>
        <div className="mt-8">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            The Journey
          </h1>
          <p className="mt-2 text-lg text-foreground/60 italic">
            From Ayodhya to Lanka — the path of exile, search, and return
          </p>
          <Separator className="my-8 bg-saffron/20" />
        </div>
      </Reveal>

      <Reveal>
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Route Overview
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/80">
            Follow Rama&apos;s journey across the Indian subcontinent as it was
            known in the Treta Yuga — from his birthplace in Ayodhya on the Sarayu
            river, through the forests of Dandaka, to the monkey kingdom of
            Kishkindha, across the ocean bridge to Lanka, and back. Click any
            waypoint on the map to read the relevant chapter.
          </p>
        </section>
      </Reveal>

      {/* Interactive map + side panel */}
      <Reveal>
        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Interactive Map
          </h2>
          <JourneyMap />
        </section>
      </Reveal>

      <Ornament variant="lotus" divider className="my-12 max-w-xs" />

      <Reveal>
        <p className="text-center text-sm text-foreground/50">
          The route is approximate, based on the geographical references in
          Valmiki&apos;s Ramayana. Place names follow the traditional
          identification of sites.
        </p>
      </Reveal>
    </div>
  );
}
