import { parse } from "node-html-parser";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const BASE_URL = "https://valmikiramayan.net";
const DATA_DIR = join(process.cwd(), "data");

const KANDAS = [
  { slug: "ayodhya", dirName: "ayodhya", url: `${BASE_URL}/utf8/ayodhya/ayodhya_contents.htm`, file: "ayodhya.json" },
  { slug: "aranya", dirName: "aranya", url: `${BASE_URL}/utf8/aranya/aranya_contents.htm`, file: "aranya.json" },
  { slug: "kishkindha", dirName: "kish", url: `${BASE_URL}/utf8/kish/kishkindha_contents.htm`, file: "kishkindha.json" },
  { slug: "sundara", dirName: "sundara", url: `${BASE_URL}/utf8/sundara/sundara_contents.htm`, file: "sundara.json" },
  { slug: "yuddha", dirName: "yuddha", url: `${BASE_URL}/utf8/yuddha/yuddha_contents.htm`, file: "yuddha.json" },
];

async function fetchWithRetry(url: string, retries = 3): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error("Failed to fetch");
}

async function updateTitles() {
  for (const kanda of KANDAS) {
    console.log(`\nFetching titles for ${kanda.slug}...`);
    let html: string;
    try {
      html = await fetchWithRetry(kanda.url);
    } catch (e) {
      console.error(`Failed to fetch contents for ${kanda.slug}:`, e);
      continue;
    }

    const root = parse(html);
    const titles = new Map<number, string>();

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

    console.log(`Parsed ${titles.size} titles for ${kanda.slug}.`);

    // Load existing JSON data file
    const filePath = join(DATA_DIR, kanda.file);
    const dataRaw = readFileSync(filePath, "utf-8");
    const data = JSON.parse(dataRaw);

    let updatedCount = 0;
    for (const sarga of data.sargas) {
      const title = titles.get(sarga.number);
      if (title) {
        sarga.title = title;
        updatedCount++;
      }
    }

    writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${updatedCount} sarga titles in ${kanda.file}.`);
  }
}

updateTitles().then(() => console.log("\nFinished updating all Kanda sarga titles!"));
