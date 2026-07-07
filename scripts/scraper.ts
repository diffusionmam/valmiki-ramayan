/**
 * Valmiki Ramayana Scraper
 * 
 * Crawls valmikiramayan.net and extracts all 534 sargas (chapters)
 * across 6 Kaandas, storing structured JSON in /data directory.
 * 
 * Usage: npx tsx scripts/scraper.ts
 */

import { parse } from "node-html-parser";
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

    if (kanda.slug === "bala") {
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
    } else {
      // Robust table-row parsing logic for other Kandas
      const trs = root.querySelectorAll("tr");
      for (const tr of trs) {
        const links = tr.querySelectorAll("a");
        let sargaNum: number | null = null;
        let sargaLinkEl = null;

        for (const link of links) {
          const href = link.getAttribute("href") || "";
          const match = href.match(/sarga(\d+)/i);
          if (match) {
            sargaNum = parseInt(match[1], 10);
            sargaLinkEl = link;
            break;
          }
        }

        if (sargaNum !== null) {
          let titleText = "";
          const chptEl = tr.querySelector("div.chpt");
          if (chptEl) {
            titleText = chptEl.text.trim();
          } else {
            const cellText = tr.querySelector("td")?.text.trim() || "";
            if (cellText && !cellText.toLowerCase().includes("sarga/chapter") && !cellText.toLowerCase().includes("sarga / chapter")) {
              titleText = cellText;
            } else {
              for (const link of links) {
                if (link !== sargaLinkEl) {
                  const txt = link.text.trim();
                  if (txt && txt.length > 2) {
                    titleText = txt;
                    break;
                  }
                }
              }
            }
          }

          if (titleText) {
            let cleaned = titleText
              .replace(/&amp;/g, "&")
              .replace(/&#39;/g, "'")
              .replace(/\s+/g, " ")
              .trim();

            const prefixMatch = cleaned.match(/^\d+\s*:\s*(.+)$/);
            if (prefixMatch) {
              cleaned = prefixMatch[1].trim();
            }
            titles.set(sargaNum, cleaned);
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
function parseVerses(html: string, _bookNum: number, _sargaNum: number): { introduction: string; verses: Verse[] } {
  // Fix typos where `<` is missing before `p class="..."`
  let processedHtml = html.replace(/([^<]|^)p\s+class=["']?(pratipada|tat|SanSloka|comment)["']?>/gi, "$1<p class=\"$2\">");

  // Fix unclosed opening em tags before `=`
  processedHtml = processedHtml.replace(/<em>([^<]+?)\s*=/gi, "<em>$1</em> =");

  // Pre-process HTML to fix malformed unclosed em tags
  processedHtml = processedHtml.replace(/(\w+)<em>(\s*=)/gi, "$1</em>$2");
  processedHtml = processedHtml.replace(/<em>\s*=/gi, "</em> =");

  const root = parse(processedHtml);

  // Remove script tags, style tags
  root.querySelectorAll("script, style").forEach(el => el.remove());

  // We query p, div, td, font, span, h3, h4 from the entire root to handle elements pushed outside body due to malformed tags
  const elements = root.querySelectorAll("p, div, td, font, span, h3, h4");

  const verses: Verse[] = [];
  let currentVerse: Partial<Verse> = {};
  let introduction = "";
  let inIntroduction = true;

  const devanagariPattern = /[\u0900-\u097F]/;
  const verseNumPattern = /[॥\|]{1,2}\s*(\d+-\d+-\d+)/;
  const devanagariVerseNum = /[॥\|]{1,2}\s*([१-९][०-९]*-[१-९][०-९]*-[१-९][०-९]*)/;

  const stopKeywords = [
    "इति वाल्मीकि",
    "इति गायत्री"
  ];

  for (const el of elements) {
    const className = el.getAttribute("class") || "";
    const text = el.text.trim();
    if (!text || text.length < 2) continue;

    // Check if this indicates the colophon / end of sarga (only if we have already entered the verses section)
    if (!inIntroduction && stopKeywords.some(kw => text.includes(kw))) {
      if (currentVerse.number && (currentVerse.sanskrit || currentVerse.translation)) {
        verses.push({
          number: currentVerse.number,
          sanskrit: currentVerse.sanskrit || "",
          wordMeaning: currentVerse.wordMeaning || "",
          translation: currentVerse.translation || "",
          commentary: currentVerse.commentary || undefined
        });
        currentVerse = {};
      }
      break;
    }

    // Check if this element defines a new verse number
    const isSanskrit = className.includes("SanSloka") || devanagariPattern.test(text);
    const numMatch = text.match(verseNumPattern) || text.match(devanagariVerseNum);

    if (isSanskrit && numMatch) {
      const rawNum = numMatch[1];
      const cleanNum = rawNum
        .replace(/[०]/g, "0").replace(/[१]/g, "1").replace(/[२]/g, "2")
        .replace(/[३]/g, "3").replace(/[४]/g, "4").replace(/[५]/g, "5")
        .replace(/[६]/g, "6").replace(/[७]/g, "7").replace(/[८]/g, "8")
        .replace(/[९]/g, "9");

      if (currentVerse.number === cleanNum) {
        continue;
      }

      inIntroduction = false;

      // Flush previous verse
      if (currentVerse.number && (currentVerse.sanskrit || currentVerse.translation)) {
        verses.push({
          number: currentVerse.number,
          sanskrit: currentVerse.sanskrit || "",
          wordMeaning: currentVerse.wordMeaning || "",
          translation: currentVerse.translation || "",
          commentary: currentVerse.commentary || undefined
        });
      }

      currentVerse = {
        number: cleanNum,
        sanskrit: text,
        wordMeaning: "",
        translation: "",
        commentary: ""
      };
    } else {
      if (inIntroduction) {
        // Accumulate introduction paragraphs
        const isIntroParagraph = className.includes("tat") || className.includes("txt") || className.includes("leading") || el.tagName === "P";
        const isHeading = el.tagName === "H3" || el.tagName === "H4" || text.includes("Introduction") || text.includes("Book") || text.includes("Chapter");
        
        if (isIntroParagraph && !isHeading && text.length > 30) {
          introduction += (introduction ? "\n" : "") + text;
        }
      } else if (currentVerse.number) {
        // Append to current verse fields
        if (className.includes("SanSloka")) {
          currentVerse.sanskrit += "\n" + text;
        } else if (className.includes("pratipada")) {
          currentVerse.wordMeaning += (currentVerse.wordMeaning ? "\n" : "") + text;
        } else if (className.includes("tat")) {
          currentVerse.translation += (currentVerse.translation ? "\n" : "") + text;
        } else if (className.includes("comment")) {
          currentVerse.commentary += (currentVerse.commentary ? "\n" : "") + text;
        } else {
          // Fallback heuristics
          if (/^\d+\.\s/.test(text) && text.includes("=")) {
            currentVerse.wordMeaning += (currentVerse.wordMeaning ? "\n" : "") + text;
          } else if (text.startsWith('"') || text.startsWith('"') || text.startsWith("\"")) {
            currentVerse.translation += (currentVerse.translation ? "\n" : "") + text;
          } else if (/^\[\d+-\d+-\d+\]/.test(text)) {
            continue;
          } else {
            if (currentVerse.translation && text.length > 20) {
              currentVerse.commentary += (currentVerse.commentary ? "\n" : "") + text;
            } else if (!currentVerse.translation && text.length > 10) {
              if (!devanagariPattern.test(text)) {
                currentVerse.translation += (currentVerse.translation ? "\n" : "") + text;
              }
            }
          }
        }
      }
    }
  }

  // Flush last verse (if any remained)
  if (currentVerse.number && (currentVerse.sanskrit || currentVerse.translation)) {
    verses.push({
      number: currentVerse.number,
      sanskrit: currentVerse.sanskrit || "",
      wordMeaning: currentVerse.wordMeaning || "",
      translation: currentVerse.translation || "",
      commentary: currentVerse.commentary || undefined
    });
  }

  return { introduction, verses };
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
