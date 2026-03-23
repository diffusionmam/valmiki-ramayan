export const KANDA_META: Record<
  string,
  { name: string; nameEnglish: string; bookNumber: number; description: string; sargaCount: number; icon: string }
> = {
  bala: {
    name: "Bala Kanda",
    nameEnglish: "Book of Youth",
    bookNumber: 1,
    description:
      "The origins of Rama, his childhood, and the story of his youth. Narrates the birth of Rama, his education, and his marriage to Sita.",
    sargaCount: 77,
    icon: "💒",
  },
  ayodhya: {
    name: "Ayodhya Kanda",
    nameEnglish: "Book of Ayodhya",
    bookNumber: 2,
    description:
      "The preparations for Rama's coronation and his exile. Covers the palace intrigues, Rama's banishment to the forest for fourteen years, and the death of King Dasharatha.",
    sargaCount: 119,
    icon: "🏛️",
  },
  aranya: {
    name: "Aranya Kanda",
    nameEnglish: "Book of the Forest",
    bookNumber: 3,
    description:
      "Rama's life in the Dandaka forest. Describes encounters with sages and demons, and culminates in the abduction of Sita by Ravana.",
    sargaCount: 75,
    icon: "🌳",
  },
  kishkindha: {
    name: "Kishkindha Kanda",
    nameEnglish: "The Empire of Holy Monkeys",
    bookNumber: 4,
    description:
      "Rama's alliance with the Vanara kingdom. Describes the friendship with Hanuman and Sugriva, the defeat of Vali, and the search for Sita.",
    sargaCount: 67,
    icon: "🐒",
  },
  sundara: {
    name: "Sundara Kanda",
    nameEnglish: "Book of Beauty",
    bookNumber: 5,
    description:
      "Hanuman's journey to Lanka. Details Hanuman's leap across the ocean, his search for Sita in Lanka, and his meeting with her in Ashoka Vatika.",
    sargaCount: 68,
    icon: "🌊",
  },
  yuddha: {
    name: "Yuddha Kanda",
    nameEnglish: "Book of War",
    bookNumber: 6,
    description:
      "The great war between Rama and Ravana. Covers the building of the bridge to Lanka, the epic battles, the defeat of Ravana, and the coronation of Rama.",
    sargaCount: 128,
    icon: "⚔️",
  },
};

export const KANDA_SLUGS = Object.keys(KANDA_META);
