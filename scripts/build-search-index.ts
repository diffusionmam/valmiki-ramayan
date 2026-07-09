/**
 * Build-time search index generator.
 *
 * Reads all kanda JSON files, extracts every verse, and writes a
 * flat JSON array to public/search-index.json. This file is loaded
 * on-demand by the SearchModal (not on initial page load).
 *
 * Run via: npx tsx scripts/build-search-index.ts
 * Or automatically as a prebuild step (see package.json).
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

interface Verse {
  number: string;
  sanskrit: string;
  wordMeaning: string;
  translation: string;
}

interface Sarga {
  number: number;
  title: string;
  verses: Verse[];
}

interface KandaData {
  slug: string;
  name: string;
  sargas: Sarga[];
}

interface SearchEntry {
  id: string;
  kanda: string;
  kandaName: string;
  sarga: number;
  sargaTitle: string;
  verseNumber: string;
  verseIndex: number;
  sanskrit: string;
  translation: string;
}

const DATA_DIR = join(process.cwd(), "data");
const OUTPUT = join(process.cwd(), "public", "search-index.json");

function buildIndex() {
  const entries: SearchEntry[] = [];
  const files = readdirSync(DATA_DIR).filter((f) => f.endsWith(".json") && f !== "index.json");

  for (const file of files) {
    const raw = readFileSync(join(DATA_DIR, file), "utf-8");
    const kanda: KandaData = JSON.parse(raw);

    for (const sarga of kanda.sargas) {
      for (let i = 0; i < sarga.verses.length; i++) {
        const verse = sarga.verses[i];
        // Skip empty verses
        if (!verse.sanskrit && !verse.translation) continue;

        entries.push({
          // Verse numbers can legitimately repeat within a sarga (e.g. split
          // verses share the same number), so fold in the array index to keep
          // the id unique across the whole index.
          id: `${kanda.slug}-${sarga.number}-${i}-${verse.number}`,
          kanda: kanda.slug,
          kandaName: kanda.name,
          sarga: sarga.number,
          sargaTitle: sarga.title,
          verseNumber: verse.number,
          verseIndex: i,
          // Truncate long fields to keep index size reasonable
          sanskrit: (verse.sanskrit || "").slice(0, 200),
          translation: (verse.translation || "").slice(0, 300),
        });
      }
    }
  }

  writeFileSync(OUTPUT, JSON.stringify(entries));
  console.log(`Search index built: ${entries.length} verses → ${OUTPUT}`);
}

buildIndex();
