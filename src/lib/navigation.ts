export type Article = {
  title: string;
  slug: string;
  description?: string;
};

export type Topic = {
  title: string;
  slug: string;
  articles: Article[];
};

export const navigation: Topic[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    articles: [
      {
        title: "Introduction",
        slug: "introduction",
        description:
          "What these tutorials are about, what you'll learn, and what you need to get started.",
      },
    ],
  },
  {
    title: "Basics",
    slug: "basics",
    articles: [
      // Coming soon
    ],
  },
  {
    title: "Autograd",
    slug: "autograd",
    articles: [
      {
        title: "The Chain Rule",
        slug: "chain-rule",
        description:
          "The one formula that makes all of deep learning possible.",
      },
    ],
  },
  {
    title: "Building Blocks",
    slug: "building-blocks",
    articles: [
      // Coming soon
    ],
  },
  {
    title: "Convolutional Networks",
    slug: "convolutional-networks",
    articles: [
      // Coming soon
    ],
  },
  {
    title: "Transformers",
    slug: "transformers",
    articles: [
      // Coming soon
    ],
  },
];

export function getAllArticleParams(): { category: string; slug: string }[] {
  return navigation.flatMap((topic) =>
    topic.articles.map((a) => ({ category: topic.slug, slug: a.slug }))
  );
}

export function getArticlePath(slug: string): string {
  for (const topic of navigation) {
    for (const article of topic.articles) {
      if (article.slug === slug) {
        return `/${topic.slug}/${article.slug}`;
      }
    }
  }
  return `/`;
}

export function findArticle(slug: string): Article | undefined {
  return navigation
    .flatMap((t) => t.articles)
    .find((a) => a.slug === slug);
}
