import path from "path";
import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "tutorials");

export type Frontmatter = {
  title: string;
  description: string;
  category: string;
  order: number;
  date?: string;
};

export function getTutorial(
  slug: string
): { frontmatter: Frontmatter; content: string } {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as Frontmatter, content };
}

export function getAllSlugs(): string[] {
  return readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
