export type KandaSlug =
  | "bala"
  | "ayodhya"
  | "aranya"
  | "kishkindha"
  | "sundara"
  | "yuddha";

export type KandaGlyphName =
  | "bow"
  | "throne"
  | "tree"
  | "vanara"
  | "wave"
  | "swords";

export interface KandaMeta {
  name: string;
  nameDevanagari: string;
  nameEnglish: string;
  bookNumber: number;
  description: string;
  sargaCount: number;
  glyph: KandaGlyphName;
  /** Accent hue in oklch (light mode) — used via --kanda-accent CSS var. */
  accent: string;
  /** Accent hue for dark mode. */
  accentDark: string;
}

export const KANDA_META: Record<string, KandaMeta> = {
  bala: {
    name: "Bala Kanda",
    nameDevanagari: "बालकाण्ड",
    nameEnglish: "Book of Youth",
    bookNumber: 1,
    description:
      "The origins of Rama, his childhood, and the story of his youth. Narrates the birth of Rama, his education, and his marriage to Sita.",
    sargaCount: 77,
    glyph: "bow",
    accent: "oklch(0.72 0.15 68)",
    accentDark: "oklch(0.78 0.13 70)",
  },
  ayodhya: {
    name: "Ayodhya Kanda",
    nameDevanagari: "अयोध्याकाण्ड",
    nameEnglish: "Book of Ayodhya",
    bookNumber: 2,
    description:
      "The preparations for Rama's coronation and his exile. Covers the palace intrigues, Rama's banishment to the forest for fourteen years, and the death of King Dasharatha.",
    sargaCount: 119,
    glyph: "throne",
    accent: "oklch(0.50 0.13 255)",
    accentDark: "oklch(0.62 0.11 255)",
  },
  aranya: {
    name: "Aranya Kanda",
    nameDevanagari: "अरण्यकाण्ड",
    nameEnglish: "Book of the Forest",
    bookNumber: 3,
    description:
      "Rama's life in the Dandaka forest. Describes encounters with sages and demons, and culminates in the abduction of Sita by Ravana.",
    sargaCount: 75,
    glyph: "tree",
    accent: "oklch(0.52 0.11 150)",
    accentDark: "oklch(0.62 0.10 150)",
  },
  kishkindha: {
    name: "Kishkindha Kanda",
    nameDevanagari: "किष्किन्धाकाण्ड",
    nameEnglish: "The Empire of Holy Monkeys",
    bookNumber: 4,
    description:
      "Rama's alliance with the Vanara kingdom. Describes the friendship with Hanuman and Sugriva, the defeat of Vali, and the search for Sita.",
    sargaCount: 67,
    glyph: "vanara",
    accent: "oklch(0.58 0.12 55)",
    accentDark: "oklch(0.68 0.11 55)",
  },
  sundara: {
    name: "Sundara Kanda",
    nameDevanagari: "सुन्दरकाण्ड",
    nameEnglish: "Book of Beauty",
    bookNumber: 5,
    description:
      "Hanuman's journey to Lanka. Details Hanuman's leap across the ocean, his search for Sita in Lanka, and his meeting with her in Ashoka Vatika.",
    sargaCount: 68,
    glyph: "wave",
    accent: "oklch(0.55 0.12 210)",
    accentDark: "oklch(0.66 0.11 210)",
  },
  yuddha: {
    name: "Yuddha Kanda",
    nameDevanagari: "युद्धकाण्ड",
    nameEnglish: "Book of War",
    bookNumber: 6,
    description:
      "The great war between Rama and Ravana. Covers the building of the bridge to Lanka, the epic battles, the defeat of Ravana, and the coronation of Rama.",
    sargaCount: 128,
    glyph: "swords",
    accent: "oklch(0.52 0.18 25)",
    accentDark: "oklch(0.64 0.16 25)",
  },
};

export const KANDA_SLUGS = Object.keys(KANDA_META) as KandaSlug[];

export function isKandaSlug(slug: string): slug is KandaSlug {
  return slug in KANDA_META;
}
