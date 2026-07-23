import type { MetadataRoute } from "next";
import { KANDA_SLUGS } from "@/lib/kanda-meta";
import { getKanda } from "@/lib/data";
import { AUTHORS } from "@/lib/authors";

const SITE_URL = "https://valmiki-ramayan.vercel.app";

const staticPages = [
  { url: "/", priority: 1.0, changeFrequency: "monthly" as const },
  { url: "/about/", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/authors/", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/gallery/", priority: 0.6, changeFrequency: "monthly" as const },
  { url: "/journey/", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/resources/", priority: 0.6, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    entries.push({
      url: `${SITE_URL}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  for (const slug of KANDA_SLUGS) {
    entries.push({
      url: `${SITE_URL}/kanda/${slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    });

    const kanda = getKanda(slug);
    if (kanda) {
      for (const sarga of kanda.sargas) {
        entries.push({
          url: `${SITE_URL}/kanda/${slug}/sarga/${sarga.number}/`,
          lastModified: new Date(),
          changeFrequency: "yearly",
          priority: 0.5,
        });
      }
    }
  }

  for (const slug of Object.keys(AUTHORS)) {
    entries.push({
      url: `${SITE_URL}/authors/${slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
