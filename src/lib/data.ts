import { readFileSync } from "fs";
import { join } from "path";
import type { KandaData, KandaSummary, Sarga } from "./types";
import { KANDA_META, KANDA_SLUGS } from "./kanda-meta";

const DATA_DIR = join(process.cwd(), "data");

// Re-export for backwards compatibility
export { KANDA_META, KANDA_SLUGS };

// ── Data accessors ─────────────────────────────────────────────────

const kandaCache: Record<string, KandaData> = {};

function loadKanda(slug: string): KandaData {
  if (kandaCache[slug]) return kandaCache[slug];
  try {
    const filePath = join(DATA_DIR, `${slug}.json`);
    const raw = readFileSync(filePath, "utf-8");
    const data: KandaData = JSON.parse(raw);
    kandaCache[slug] = data;
    return data;
  } catch {
    const meta = KANDA_META[slug];
    return {
      slug,
      name: meta?.name ?? slug,
      nameEnglish: meta?.nameEnglish ?? "",
      bookNumber: meta?.bookNumber ?? 0,
      description: meta?.description ?? "",
      sargaCount: meta?.sargaCount ?? 0,
      sargas: [],
    };
  }
}

export function getAllKandas(): KandaSummary[] {
  return KANDA_SLUGS.map((slug) => {
    const meta = KANDA_META[slug];
    const data = loadKanda(slug);
    return {
      slug,
      name: meta.name,
      nameEnglish: meta.nameEnglish,
      bookNumber: meta.bookNumber,
      description: meta.description,
      sargaCount: meta.sargaCount,
      versesScraped: data.sargas.reduce((sum, s) => sum + s.verseCount, 0),
    };
  });
}

export function getKanda(slug: string): KandaData | null {
  if (!KANDA_META[slug]) return null;
  return loadKanda(slug);
}

export function getSarga(kandaSlug: string, sargaNumber: number): Sarga | null {
  const kanda = getKanda(kandaSlug);
  if (!kanda) return null;
  return kanda.sargas.find((s) => s.number === sargaNumber) ?? null;
}

export function getKandaMeta(slug: string) {
  return KANDA_META[slug] ?? null;
}
