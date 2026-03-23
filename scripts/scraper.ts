/**
 * Valmiki Ramayana Scraper
 * 
 * Crawls valmikiramayan.net and extracts all 534 sargas (chapters)
 * across 6 Kaandas, storing structured JSON in /data directory.
 * 
 * Usage: npx tsx scripts/scraper.ts
 */

import { parse, HTMLElement } from "node-html-parser";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// ── Constants ──────────────────────────────────────────────────────────

const BASE_URL = "https://valmikiramayan.net";
const DATA_DIR = join(process.cwd(), "data");
const DELAY_MS = 500; // Rate limit: 500ms between requests
const MAX_RETRIES = 3;

interface KandaConfig {
  slug: string;
  name: string;
  nameEnglish: string;
  dirName: string;       // directory name in URL (e.g., "baala")
  filePrefix: string;    // file prefix (e.g., "bala")
  sargaCount: number;
  bookNumber: number;
  description: string;
}

const KANDAS: KandaConfig[] = [
  {
    slug: "bala",
    name: "Bala Kanda",
    nameEnglish: "Book of Youth",
    dirName: "baala",
    filePrefix: "bala",
    sargaCount: 77,
    bookNumber: 1,
    description: "The origins of Rama, his childhood, and the story of his youth. Narrates the birth of Rama, his education, and his marriage to Sita."
  },
  {
    slug: "ayodhya",
    name: "Ayodhya Kanda",
    nameEnglish: "Book of Ayodhya",
    dirName: "ayodhya",
    filePrefix: "ayodhya",
    sargaCount: 119,
    bookNumber: 2,
    description: "The preparations for Rama's coronation and his exile. Covers the palace intrigues, Rama's banishment to the forest for fourteen years, and the death of King Dasharatha."
  },
  {
    slug: "aranya",
    name: "Aranya Kanda",
    nameEnglish: "Book of the Forest",
    dirName: "aranya",
    filePrefix: "aranya",
    sargaCount: 75,
    bookNumber: 3,
    description: "Rama's life in the Dandaka forest. Describes encounters with sages and demons, and culminates in the abduction of Sita by Ravana."
  },
  {
    slug: "kishkindha",
    name: "Kishkindha Kanda",
    nameEnglish: "The Empire of Holy Monkeys",
    dirName: "kish",
    filePrefix: "kishkindha",
    sargaCount: 67,
    bookNumber: 4,
    description: "Rama's alliance with the Vanara kingdom. Describes the friendship with Hanuman and Sugriva, the defeat of Vali, and the search for Sita."
  },
  {
    slug: "sundara",
    name: "Sundara Kanda",
    nameEnglish: "Book of Beauty",
    dirName: "sundara",
    filePrefix: "sundara",
    sargaCount: 68,
    bookNumber: 5,
    description: "Hanuman's journey to Lanka. Details Hanuman's leap across the ocean, his search for Sita in Lanka, and his meeting with her in Ashoka Vatika."
  },
  {
    slug: "yuddha",
    name: "Yuddha Kanda",
    nameEnglish: "Book of War",
    dirName: "yuddha",
    filePrefix: "yuddha",
    sargaCount: 128,
    bookNumber: 6,
    description: "The great war between Rama and Ravana. Covers the building of the bridge to Lanka, the epic battles, the defeat of Ravana, and the coronation of Rama."
  }
];

// ── Types ──────────────────────────────────────────────────────────────

interface Verse {
  number: string;        // e.g., "1-1-1"
  sanskrit: string;      // Devanagari text
  wordMeaning: string;   // Word-by-word meaning
  translation: string;   // English translation
  commentary?: string;   // Optional commentary
}

interface Sarga {
  number: number;
  title: string;
  introduction: string;
  verses: Verse[];
  verseCount: number;
}

interface KandaData {
  slug: string;
  name: string;
  nameEnglish: string;
  bookNumber: number;
  description: string;
  sargaCount: number;
  sargas: Sarga[];
}

// ── Utilities ──────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      // Handle various encodings — the site uses UTF-8 for the utf8/ pages
      const buffer = await response.arrayBuffer();
      return new TextDecoder("utf-8").decode(buffer);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`  ⚠ Attempt ${attempt}/${retries} failed for ${url}: ${msg}`);
      if (attempt < retries) {
        await sleep(DELAY_MS * attempt);
      } else {
        throw new Error(`Failed to fetch ${url} after ${retries} attempts: ${msg}`);
      }
    }
  }
  throw new Error("Unreachable");
}

// ── Content Page URL Builder ────────────────────────────────────────

function buildContentUrl(kanda: KandaConfig, sargaNum: number): string {
  // Pattern: /utf8/{dirName}/sarga{N}/{filePrefix}sans{N}.htm
  return `${BASE_URL}/utf8/${kanda.dirName}/sarga${sargaNum}/${kanda.filePrefix}sans${sargaNum}.htm`;
}

function buildContentsUrl(kanda: KandaConfig): string {
  return `${BASE_URL}/utf8/${kanda.dirName}/${kanda.dirName}_contents.htm`;
}

// ── Parsers ────────────────────────────────────────────────────────────

/**
 * Parse chapter titles from a Kanda's contents page.
 */
async function parseSargaTitles(kanda: KandaConfig): Promise<Map<number, string>> {
  const titles = new Map<number, string>();

  try {
    // The contents page URL pattern varies per kanda
    let url: string;
    if (kanda.slug === "bala") {
      url = `${BASE_URL}/utf8/baala/baala_contents.htm`;
    } else if (kanda.slug === "kishkindha") {
      url = `${BASE_URL}/utf8/kish/kishkindha_contents.htm`;
    } else {
      url = `${BASE_URL}/utf8/${kanda.dirName}/${kanda.dirName}_contents.htm`;
    }

    const html = await fetchWithRetry(url);
    const root = parse(html);

    // Look for links that contain sarga/chapter references
    const links = root.querySelectorAll("a");
    for (const link of links) {
      const href = link.getAttribute("href") || "";
      const text = link.text.trim();

      // Match sarga links — typically they have the sarga number in the href
      const sargaMatch = href.match(/sarga(\d+)/);
      if (sargaMatch && text && text.length > 3 && !text.toLowerCase().includes("sarga/chapter")) {
        const num = parseInt(sargaMatch[1], 10);
        if (!titles.has(num)) {
          titles.set(num, text);
        }
      }
    }

    // Also try to extract from table rows or list items with numbers
    const allText = root.text;
    const numberedLines = allText.match(/(\d+)\.\s+([^\n]+)/g);
    if (numberedLines) {
      for (const line of numberedLines) {
        const match = line.match(/(\d+)\.\s+(.+)/);
        if (match) {
          const num = parseInt(match[1], 10);
          const title = match[2].trim();
          if (num >= 1 && num <= kanda.sargaCount && !titles.has(num) && title.length > 3) {
            titles.set(num, title);
          }
        }
      }
    }
  } catch (err) {
    console.warn(`  ⚠ Could not parse titles for ${kanda.name}: ${err}`);
  }

  return titles;
}

/**
 * Parse verses from a sarga content page HTML.
 * 
 * The structure typically follows this pattern:
 * - Sanskrit text in Devanagari (contains || verse-number ||)
 * - Numbered word-by-word meaning with = signs
 * - English translation (often in quotes or following the meaning)
 * - Optional commentary paragraphs
 */
function parseVerses(html: string, bookNum: number, sargaNum: number): { introduction: string; verses: Verse[] } {
  const root = parse(html);
  const body = root.querySelector("body") || root;

  // Remove script tags, style tags
  body.querySelectorAll("script, style").forEach(el => el.remove());

  // Get all text content - we'll work with the raw text
  const fullText = body.innerHTML;

  // Extract introduction - typically the first large block of text before any verse
  let introduction = "";
  const introMatch = fullText.match(/<p[^>]*class="leading[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
  if (introMatch) {
    const introRoot = parse(introMatch[1]);
    introduction = introRoot.text.trim();
  }

  // If we couldn't find intro with class, try first paragraph
  if (!introduction) {
    const firstP = body.querySelector("p");
    if (firstP) {
      const text = firstP.text.trim();
      // Only use it as introduction if it's long enough and doesn't look like a verse
      if (text.length > 50 && !text.match(/[॥\|]\s*\d/)) {
        introduction = text;
      }
    }
  }

  const verses: Verse[] = [];

  // Strategy: Split content by verse markers (Devanagari verse numbers like || १-१-१ or 1-1-1)
  // The Devanagari text typically contains the double danda ॥ or || with verse number

  // Find all paragraph/div elements and classify them
  const elements = body.querySelectorAll("p, div, td, font, span");

  let currentSanskrit = "";
  let currentWordMeaning = "";
  let currentTranslation = "";
  let currentCommentary = "";
  let currentVerseNum = "";
  let pendingTexts: string[] = [];

  function flushVerse() {
    if (currentVerseNum && (currentSanskrit || currentTranslation)) {
      verses.push({
        number: currentVerseNum,
        sanskrit: currentSanskrit.trim(),
        wordMeaning: currentWordMeaning.trim(),
        translation: currentTranslation.trim(),
        commentary: currentCommentary.trim() || undefined
      });
    }
    currentSanskrit = "";
    currentWordMeaning = "";
    currentTranslation = "";
    currentCommentary = "";
    currentVerseNum = "";
    pendingTexts = [];
  }

  for (const el of elements) {
    const text = el.text.trim();
    if (!text || text.length < 2) continue;

    // Detect Devanagari verse lines — they contain Devanagari script and verse numbers
    // Pattern: Devanagari text followed by ॥ or || and verse number like १-१-१
    const devanagariPattern = /[\u0900-\u097F]/;
    const verseNumPattern = /[॥\|]{1,2}\s*(\d+-\d+-\d+)/;
    const devanagariVerseNum = /[॥\|]{1,2}\s*([१-९][०-९]*-[१-९][०-९]*-[१-९][०-९]*)/;

    if (devanagariPattern.test(text)) {
      // This likely contains a Sanskrit verse
      const numMatch = text.match(verseNumPattern) || text.match(devanagariVerseNum);
      if (numMatch) {
        // Flush previous verse
        flushVerse();

        currentVerseNum = numMatch[1];
        // Convert Devanagari numerals if needed
        currentVerseNum = currentVerseNum
          .replace(/[०]/g, "0").replace(/[१]/g, "1").replace(/[२]/g, "2")
          .replace(/[३]/g, "3").replace(/[४]/g, "4").replace(/[५]/g, "5")
          .replace(/[६]/g, "6").replace(/[७]/g, "7").replace(/[८]/g, "8")
          .replace(/[९]/g, "9");

        currentSanskrit = text;
      } else if (currentVerseNum && !currentSanskrit) {
        // Additional Sanskrit text for current verse
        currentSanskrit += " " + text;
      }
    }
    // Detect word-by-word meaning — typically starts with a number and contains "="
    else if (/^\d+\.\s/.test(text) && text.includes("=")) {
      if (currentVerseNum) {
        currentWordMeaning += (currentWordMeaning ? " " : "") + text;
      }
    }
    // Detect English translation — often in quotes or follows word meaning
    else if (currentVerseNum && text.startsWith('"') || text.startsWith('"') || text.startsWith("\"")) {
      currentTranslation += (currentTranslation ? " " : "") + text;
    }
    // Detect verse number reference like [1-1-1]
    else if (/^\[\d+-\d+-\d+\]/.test(text)) {
      // End of translation for this verse, part of the reference
      continue;
    }
    // Otherwise, if we have a current verse, this might be commentary
    else if (currentVerseNum && currentTranslation && text.length > 20) {
      currentCommentary += (currentCommentary ? "\n" : "") + text;
    }
  }

  // Flush the last verse
  flushVerse();

  // If element-based parsing didn't work well, try text-based parsing
  if (verses.length === 0) {
    const bodyText = body.text;
    parseVersesFromText(bodyText, bookNum, sargaNum, verses);

    // Try to get introduction from the beginning of text
    if (!introduction) {
      const firstVerseIdx = bodyText.search(/[\u0900-\u097F]{5,}/);
      if (firstVerseIdx > 50) {
        introduction = bodyText.substring(0, firstVerseIdx).trim()
          .replace(/Verse Locator.*$/m, "")
          .replace(/Book [IVX]+\s*:.*/m, "")
          .replace(/Chapter \[Sarga\] \d+.*/m, "")
          .replace(/Verses converted to.*/m, "")
          .trim();
      }
    }
  }

  return { introduction, verses };
}

/**
 * Fallback text-based verse parser.
 */
function parseVersesFromText(text: string, bookNum: number, sargaNum: number, verses: Verse[]) {
  // Split by verse number patterns like "|| 1-1-1" or "॥ १-१-१"
  const versePattern = /([^\n]*[\u0900-\u097F][^\n]*[॥\|]{1,2}\s*(\d+-\d+-\d+)[^\n]*)/g;

  let match;
  const versePositions: { sanskrit: string; number: string; index: number }[] = [];

  while ((match = versePattern.exec(text)) !== null) {
    versePositions.push({
      sanskrit: match[1].trim(),
      number: match[2],
      index: match.index
    });
  }

  for (let i = 0; i < versePositions.length; i++) {
    const vp = versePositions[i];
    const nextIndex = i + 1 < versePositions.length ? versePositions[i + 1].index : text.length;
    const betweenText = text.substring(vp.index + vp.sanskrit.length, nextIndex).trim();

    // Extract word meaning (starts with number, contains =)
    const wordMeaningMatch = betweenText.match(/^\d+\.\s[^"]+/);
    const wordMeaning = wordMeaningMatch ? wordMeaningMatch[0].trim() : "";

    // Extract translation (in quotes)
    const translationMatch = betweenText.match(/"([^"]+)"/);
    const translation = translationMatch ? translationMatch[1].trim() : "";

    // Everything after translation is commentary
    const commentaryStart = translationMatch
      ? betweenText.indexOf(translationMatch[0]) + translationMatch[0].length
      : (wordMeaningMatch ? wordMeaningMatch[0].length : 0);
    const commentary = betweenText.substring(commentaryStart).trim()
      .replace(/Verse Locator/g, "")
      .replace(/https?:\/\/[^\s]+/g, "")
      .trim();

    verses.push({
      number: vp.number,
      sanskrit: vp.sanskrit,
      wordMeaning: wordMeaning,
      translation: translation,
      commentary: commentary.length > 10 ? commentary : undefined
    });
  }
}

// ── Main Scraper ───────────────────────────────────────────────────────

async function scrapeKanda(kanda: KandaConfig): Promise<KandaData> {
  console.log(`\n📖 Scraping ${kanda.name} (${kanda.nameEnglish}) — ${kanda.sargaCount} sargas`);

  // Get chapter titles
  console.log("  📋 Fetching chapter titles...");
  const titles = await parseSargaTitles(kanda);
  await sleep(DELAY_MS);

  const sargas: Sarga[] = [];
  let totalVerses = 0;
  let errors = 0;

  for (let sargaNum = 1; sargaNum <= kanda.sargaCount; sargaNum++) {
    const url = buildContentUrl(kanda, sargaNum);
    const progress = `[${sargaNum}/${kanda.sargaCount}]`;

    try {
      process.stdout.write(`  ${progress} Sarga ${sargaNum}...`);
      const html = await fetchWithRetry(url);
      const { introduction, verses } = parseVerses(html, kanda.bookNumber, sargaNum);

      const title = titles.get(sargaNum) || `Sarga ${sargaNum}`;

      sargas.push({
        number: sargaNum,
        title: title,
        introduction: introduction,
        verses: verses,
        verseCount: verses.length
      });

      totalVerses += verses.length;
      console.log(` ✅ ${verses.length} verses`);

    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(` ❌ Error: ${msg}`);
      errors++;

      // Still add an entry so we don't lose the chapter
      sargas.push({
        number: sargaNum,
        title: titles.get(sargaNum) || `Sarga ${sargaNum}`,
        introduction: "",
        verses: [],
        verseCount: 0
      });
    }

    await sleep(DELAY_MS);
  }

  console.log(`  📊 Total: ${totalVerses} verses scraped, ${errors} errors`);

  return {
    slug: kanda.slug,
    name: kanda.name,
    nameEnglish: kanda.nameEnglish,
    bookNumber: kanda.bookNumber,
    description: kanda.description,
    sargaCount: kanda.sargaCount,
    sargas
  };
}

async function main() {
  console.log("🙏 Valmiki Ramayana Scraper");
  console.log("═══════════════════════════════════════");
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output:   ${DATA_DIR}`);
  console.log(`Rate:     ${DELAY_MS}ms delay between requests`);
  console.log("");

  // Create data directory
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
    console.log(`📁 Created ${DATA_DIR}`);
  }

  // Allow partial scraping via CLI arg
  const targetKanda = process.argv[2]; // e.g., "bala" to scrape only Bala Kanda
  const kandasToScrape = targetKanda
    ? KANDAS.filter(k => k.slug === targetKanda)
    : KANDAS;

  if (targetKanda && kandasToScrape.length === 0) {
    console.error(`❌ Unknown kanda: ${targetKanda}`);
    console.error(`   Available: ${KANDAS.map(k => k.slug).join(', ')}`);
    process.exit(1);
  }

  const allData: Record<string, KandaData> = {};

  for (const kanda of kandasToScrape) {
    const data = await scrapeKanda(kanda);
    allData[kanda.slug] = data;

    // Write individual kanda file
    const filePath = join(DATA_DIR, `${kanda.slug}.json`);
    writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`  💾 Saved → ${filePath}`);
  }

  // Write a summary/index file
  const summary = KANDAS.map(k => ({
    slug: k.slug,
    name: k.name,
    nameEnglish: k.nameEnglish,
    bookNumber: k.bookNumber,
    description: k.description,
    sargaCount: k.sargaCount,
    versesScraped: allData[k.slug]?.sargas.reduce((sum, s) => sum + s.verseCount, 0) || 0
  }));

  writeFileSync(join(DATA_DIR, "index.json"), JSON.stringify(summary, null, 2), "utf-8");
  console.log(`\n💾 Saved index → ${join(DATA_DIR, "index.json")}`);

  const totalVerses = summary.reduce((sum, k) => sum + k.versesScraped, 0);
  console.log(`\n✨ Done! Scraped ${totalVerses} total verses across ${kandasToScrape.length} Kanda(s).`);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
