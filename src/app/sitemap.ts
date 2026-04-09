import type { MetadataRoute } from "next";
import { navigation, getArticlePath } from "@/lib/navigation";

export const dynamic = "force-static";

const BASE = "https://tutorials.simplegrad.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = navigation.flatMap((topic) =>
    topic.articles.map((article) => ({
      url: BASE + getArticlePath(article.slug),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...articles,
  ];
}
