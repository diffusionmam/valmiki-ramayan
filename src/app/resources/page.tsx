import type { Metadata } from "next";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Ornament } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "References, commentaries, translations, and useful links for studying Srimad Valmiki Ramayana.",
};

const categories = [
  {
    name: "Translations & Texts",
    items: [
      {
        title: "Valmiki Ramayana PDF (Sushila Bhatnagar Translation)",
        url: "https://valmikiramayan.net/ValmikiRamayanFNL.pdf",
        desc: "Ramayan Ke Jyoti Stambh — translated by Smt. Sushila Bhatnagar",
      },
      {
        title: "Ramayana by Rajagopalachari",
        url: "https://www.hindubooks.org/books_by_rajaji/ramayana/index.htm",
        desc: "Ramayana in prose by C. Rajagopalachari (Rajaji)",
      },
      {
        title: "Romesh Dutt's Ramayana",
        url: "https://www.sacred-texts.com/hin/dutt/",
        desc: "Ramayana and Mahabharata in poetry by Romesh Dutt",
      },
      {
        title: "Sundara Kanda — Hanuman's Odyssey",
        url: "https://www.celextel.org/stotrasvishnu/sundarakandahanumanodyssey.html",
        desc: "Sundara Kanda in English poetry by Sri B. S. Murthy",
      },
      {
        title: "Ayodhya Kanda in Prose",
        url: "https://www.harekrsna.com/science/hearing/ramayana/ramayana.htm",
        desc: "Translation of Ayodhya Kanda in prose",
      },
    ],
  },
  {
    name: "Commentaries & Studies",
    items: [
      {
        title: "Ramayana Epic Commentary",
        url: "http://ramayanaepic.com",
        desc: "An excellent commentary on Valmiki Ramayana in English",
      },
      {
        title: "Ramayana Institute",
        url: "https://www.ramayanainstitute.org/",
        desc: "International Ramayana Institute of North America",
      },
      {
        title: "International Ramayana Conference",
        url: "https://iias.leidenuniv.nl/iiasn/iiasn6/south/ramayan.html",
        desc: "Minutes from the XIIth International Ramayana Conference",
      },
      {
        title: "SriVaishnava Ramayana",
        url: "https://www.ramanuja.org/sv/ramayana/",
        desc: "Ramayana in the SriVaishnava community tradition",
      },
    ],
  },
  {
    name: "Regional Ramayanas",
    items: [
      {
        title: "Kamba Ramayana Introduction",
        url: "https://en.wikipedia.org/wiki/Kamba_Ramayanam",
        desc: "An introduction to Kamba Ramayana, the Tamil version by Kambar",
      },
      {
        title: "Thai Ramakien",
        url: "https://www.mahidol.ac.th/Thailand/art/ramakien.html",
        desc: "Influence of Ramayana in Thai art and culture",
      },
      {
        title: "Indonesian Ramayana",
        url: "https://en.wikipedia.org/wiki/Kakawin_Ramayana",
        desc: "The Indonesian Kakawin Ramayana tradition",
      },
      {
        title: "Tulasidas Ramayana (Ramcharitmanas)",
        url: "https://www.onlinedarshan.com/ramayana/",
        desc: "Tulasidas Ramayana in Awadhi Hindi",
      },
    ],
  },
  {
    name: "Academic References",
    items: [
      {
        title: "Berkeley Ramayana Links",
        url: "https://www-learning.berkeley.edu/wciv/ugis55a/readings/ramayana.html",
        desc: "Ramayana links from UC Berkeley",
      },
      {
        title: "HinduNet Ramayana",
        url: "http://www.hindunet.org/ramayana/",
        desc: "E-texts of different Ramayana versions",
      },
    ],
  },
];

const bibliography = [
  "Gorakhpur : Gita Press, Srimad Valmiki Ramayana (1998)",
  "Lahore : D.A.V. College, Ramayana (1928-1947)",
  "Bombay : Gujarati Printing Press, Ramayan of Valmiki (1914-1920)",
  "Bombay : Lakshmi Venkateswara Mudranalaya, Srimad Valmiki Ramayanam (1935)",
  "Mysore : University of Mysore, Oriental Research Institute, Srimad Valmiki Ramayanam (1960)",
  "Baroda : Oriental Institute, The Valmiki Ramayana : Critical Edition (1960-1975)",
  "Hari Prasad Shastri, The Ramayana of Valmiki (1957)",
  "C. Rajagopalachari, Ramayana (1951)",
  "Swami Venkatasananda, The Concise Ramayana (1988)",
  "Karnamrita Dasa, Srimad Ramayana (1990)",
  "Swami Tapasyananda, Sundara Kandam of Srimad Valmiki Ramayana (1991)",
  "Robert Goldman, The Ramayana of Valmiki: An Epic of Ancient India (1984)",
  "Satya Vrat, The Ramayana - A Linguistic Study (1964)",
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <PageBreadcrumbs items={[{ label: "Resources" }]} />

      <Reveal>
        <div className="mt-8">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Resources
          </h1>
          <p className="mt-2 text-lg text-foreground/60">
            Commentaries, translations, and references for studying the Ramayana
          </p>
          <Separator className="my-8 bg-saffron/20" />
        </div>
      </Reveal>

      <div className="prose-custom space-y-10">
        {categories.map((cat, ci) => (
          <Reveal key={cat.name} delay={ci * 60}>
            <section className="space-y-4">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                {cat.name}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {cat.items.map((resource) => (
                  <a
                    key={resource.url}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-lg border border-border/40 p-4 transition-all hover:border-saffron/30 hover:bg-accent/50"
                  >
                    <div className="flex items-start gap-3">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mt-0.5 shrink-0 text-saffron transition-transform group-hover:scale-110"
                        suppressHydrationWarning
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {resource.title}
                        </p>
                        <p className="mt-1 text-sm text-foreground/70">
                          {resource.desc}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </Reveal>
        ))}

        <Reveal>
          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Bibliography
            </h2>
            <Card className="border-border/40">
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {bibliography.map((entry, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-saffron" />
                      <span>{entry}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </Reveal>

        <Ornament variant="diamond" divider className="max-w-xs" />
      </div>
    </div>
  );
}
