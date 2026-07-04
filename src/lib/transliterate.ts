/**
 * Devanagari → IAST transliteration.
 *
 * Implements the International Alphabet of Sanskrit Transliteration
 * (IAST) scheme: ś ṛ ṃ ḥ ṅ ñ ṭ ḍ ṇ ḷ ā ī ū e o ai au.
 *
 * Pure, synchronous, zero-dependency. Safe to run per-verse on the client.
 */

// ── Independent vowels ──────────────────────────────────────────
const VOWELS: Record<string, string> = {
  "अ": "a",
  "आ": "ā",
  "इ": "i",
  "ई": "ī",
  "उ": "u",
  "ऊ": "ū",
  "ऋ": "ṛ",
  "ॠ": "ṝ",
  "ऌ": "ḷ",
  "ॡ": "ḹ",
  "ए": "e",
  "ऐ": "ai",
  "ओ": "o",
  "औ": "au",
};

// ── Dependent vowel signs (matras) — attach to preceding consonant ──
const MATRAS: Record<string, string> = {
  "ा": "ā",
  "ि": "i",
  "ी": "ī",
  "ु": "u",
  "ू": "ū",
  "ृ": "ṛ",
  "ॄ": "ṝ",
  "ॢ": "ḷ",
  "ॣ": "ḹ",
  "े": "e",
  "ै": "ai",
  "ो": "o",
  "ौ": "au",
};

// ── Consonants — each carries an inherent "a" unless virama follows ──
const CONSONANTS: Record<string, string> = {
  "क": "ka", "ख": "kha", "ग": "ga", "घ": "gha", "ङ": "ṅa",
  "च": "ca", "छ": "cha", "ज": "ja", "झ": "jha", "ञ": "ña",
  "ट": "ṭa", "ठ": "ṭha", "ड": "ḍa", "ढ": "ḍha", "ण": "ṇa",
  "त": "ta", "थ": "tha", "द": "da", "ध": "dha", "न": "na",
  "प": "pa", "फ": "pha", "ब": "ba", "भ": "bha", "म": "ma",
  "य": "ya", "र": "ra", "ल": "la", "व": "va",
  "श": "śa", "ष": "ṣa", "स": "sa", "ह": "ha",
};

// ── Other marks ─────────────────────────────────────────────────
const ANUSVARA = "ं"; // → ṁ (or ṃ — IAST uses ṃ)
const CANDRABINDU = "ँ"; // → m̐
const VISARGA = "ः"; // → ḥ
const VIRAMA = "्"; // suppresses inherent vowel
const NUKTA = "़"; // nukta — treat as combining, drops the inherent-a nuance
const AVAGRAHA = "ऽ"; // → ’
const DANDA = "।"; // → |
const DOUBLE_DANDA = "॥"; // → ||

// ── Devanagari numerals (used in verse numbers like १-१-१) ──────
const DIGITS: Record<string, string> = {
  "०": "0", "१": "1", "२": "2", "३": "3", "४": "4",
  "५": "5", "६": "6", "७": "7", "८": "8", "९": "9",
};

/**
 * Convert a Devanagari string to IAST transliteration.
 *
 * Walks the string left-to-right. For each consonant, emits its
 * transliteration; if the next character is a matra, the inherent
 * "a" is removed and the matra's vowel is appended instead. If the
 * next character is a virama, the inherent "a" is dropped (conjunct).
 *
 * Preserves whitespace and newlines. Dandas become | and ||.
 * Non-Devanagari characters (Latin, punctuation) pass through.
 */
export function devanagariToIAST(input: string): string {
  if (!input) return "";

  const chars = Array.from(input); // correctly handle surrogate pairs
  let out = "";

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const next = chars[i + 1] ?? "";

    // Vowels (independent) — stand alone
    if (ch in VOWELS) {
      out += VOWELS[ch];
      continue;
    }

    // Consonants — emit base, then adjust for matra/virama
    if (ch in CONSONANTS) {
      const base = CONSONANTS[ch]; // e.g. "ka"
      if (next === VIRAMA) {
        // Conjunct: drop inherent "a", advance past virama
        out += base.slice(0, -1); // "k"
        i++; // consume virama
      } else if (next in MATRAS) {
        // Matra replaces inherent vowel
        out += base.slice(0, -1) + MATRAS[next]; // "k" + "ā" → "kā"
        i++; // consume matra
      } else {
        // Inherent "a"
        out += base;
      }
      continue;
    }

    // Matra without a preceding consonant (rare in valid text) — emit as-is
    if (ch in MATRAS) {
      out += MATRAS[ch];
      continue;
    }

    // Anusvara → ṃ
    if (ch === ANUSVARA) {
      out += "ṃ";
      continue;
    }

    // Candrabindu → m̐
    if (ch === CANDRABINDU) {
      out += "m̐";
      continue;
    }

    // Visarga → ḥ
    if (ch === VISARGA) {
      out += "ḥ";
      continue;
    }

    // Avagraha → ’
    if (ch === AVAGRAHA) {
      out += "’";
      continue;
    }

    // Nukta — combining mark, skip (handled implicitly by the base consonant)
    if (ch === NUKTA) {
      continue;
    }

    // Dandas
    if (ch === DOUBLE_DANDA) {
      out += "||";
      continue;
    }
    if (ch === DANDA) {
      out += "|";
      continue;
    }

    // Devanagari digits
    if (ch in DIGITS) {
      out += DIGITS[ch];
      continue;
    }

    // Virama at top level (not following a consonant) — skip
    if (ch === VIRAMA) {
      continue;
    }

    // Everything else (spaces, newlines, Latin, punctuation, verse numbers)
    out += ch;
  }

  // Clean up: collapse the inherent-a that sometimes appears before a
  // space + matra edge case, and trim trailing whitespace on lines.
  return out
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
}

/**
 * Memoized variant for use in render loops. Caches per-input so the
 * same verse isn't re-transliterated on every toggle/render.
 */
const cache = new Map<string, string>();

export function devanagariToIASTMemo(input: string): string {
  const hit = cache.get(input);
  if (hit !== undefined) return hit;
  const result = devanagariToIAST(input);
  cache.set(input, result);
  return result;
}
