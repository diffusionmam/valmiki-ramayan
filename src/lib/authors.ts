import type { Author } from "./types";

export const AUTHORS: Record<string, Author> = {
  "desiraju-hanumanta-rao": {
    slug: "desiraju-hanumanta-rao",
    name: "Desiraju Hanumanta Rao",
    shortBio:
      "A personality in Telugu Theatre, TV, Film and literary circles of Andhra Pradesh.",
    fullBio: `Desiraju Hanumanta Rao was a personality in Telugu Theatre, TV, Film and literary circles, of Andhra Pradesh State of India. Encouraging many a writer, actor, director into Theatre, TV & films, he launched novices into stardom. Well-read in classical and traditional literature, his interests remain in Vedanta, literature and other performing arts.

Retiring from service and the active theatre, he participated in digitalizing Indian classics and culture. The saying "Every generation shall have its own translation..." enthused him to take up this work.

With an intention to reach very casual readers, besides scholars, Valmiki Ramayana — the first epic poem of India — was rendered for easy readability and comprehension for all those, including present day Indians, to whom Sanskrit has become an antique language.

He passed away in 2010.`,
    translatedKandas: ["bala", "aranya", "kishkindha"],
    headerImage: "/images/authors/hsloka.jpg",
    backgroundImage: "/images/authors/Bg.jpg",
    hanumanImages: {
      default: "/images/authors/H.jpg",
      hover: "/images/authors/H1.jpg",
    },
    externalLink: "https://valmikiramayan.net",
  },
  "kmk-murthy": {
    slug: "kmk-murthy",
    name: "K. M. K. Murthy",
    shortBio: "An officer in Syndicate Bank and an extensive reader of commentaries on Bhagavat Gita and Sri Aurobindo.",
    fullBio: `K. M. K. Murthy is an officer in Syndicate Bank, a public sector bank in India, and an extensive reader of commentaries on Bhagavat Gita and the philosophical treatises of Sri Aurobindo and Jiddu Krishna Murthy.

It was felt as a blessing and an opportunity to explore the Eternal Truth in translating the great Indian classic Valmiki Ramayana and to reach surfers for their easy readability through this website.

He translated Ayodhya Kanda, the last 28 sargas of Sundara Kanda, and Yuddha Kanda.`,
    translatedKandas: ["ayodhya", "sundara", "yuddha"],
    headerImage: "/images/authors/msloka.jpg",
    backgroundImage: "/images/authors/Om.jpg",
    hanumanImages: {
      default: "/images/authors/H.jpg",
      hover: "/images/authors/H1.jpg",
    },
    externalLink: "https://valmikiramayan.net",
  },
};

export const AUTHOR_SLUGS = Object.keys(AUTHORS);

export function getAuthor(slug: string): Author | null {
  return AUTHORS[slug] ?? null;
}

export function getKandaNameForAuthor(slug: string): Record<string, string> {
  const kandaNames: Record<string, string> = {
    bala: "Bala Kanda",
    ayodhya: "Ayodhya Kanda",
    aranya: "Aranya Kanda",
    kishkindha: "Kishkindha Kanda",
    sundara: "Sundara Kanda",
    yuddha: "Yuddha Kanda",
  };

  const author = AUTHORS[slug];
  if (!author) return {};

  return author.translatedKandas.reduce(
    (acc, kandaSlug) => {
      acc[kandaSlug] = kandaNames[kandaSlug] || kandaSlug;
      return acc;
    },
    {} as Record<string, string>
  );
}
