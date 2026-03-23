export interface Verse {
  number: string;
  sanskrit: string;
  wordMeaning: string;
  translation: string;
  commentary?: string;
}

export interface Sarga {
  number: number;
  title: string;
  introduction: string;
  verses: Verse[];
  verseCount: number;
}

export interface KandaData {
  slug: string;
  name: string;
  nameEnglish: string;
  bookNumber: number;
  description: string;
  sargaCount: number;
  sargas: Sarga[];
}

export interface KandaSummary {
  slug: string;
  name: string;
  nameEnglish: string;
  bookNumber: number;
  description: string;
  sargaCount: number;
  versesScraped: number;
}

export interface Author {
  slug: string;
  name: string;
  shortBio: string;
  fullBio: string;
  translatedKandas: string[];
  headerImage: string;
  backgroundImage: string;
  hanumanImages: {
    default: string;
    hover: string;
  };
  externalLink?: string;
  passedAway?: number;
}
