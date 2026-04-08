import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import { getTutorial } from "@/lib/mdx";
import { mdxComponents } from "@/components/MDXComponents";
import { Code } from "@/components/Code";
import { remarkCodeGroups } from "@/lib/remarkCodeGroups";
import Link from "next/link";
import { navigation, findArticle, getAllArticleParams, getArticlePath } from "@/lib/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return getAllArticleParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
  };
}

function getPrevNext(slug: string) {
  const allArticles = navigation.flatMap((t) => t.articles);
  const idx = allArticles.findIndex((a) => a.slug === slug);
  return {
    prev: idx > 0 ? allArticles[idx - 1] : null,
    next: idx < allArticles.length - 1 ? allArticles[idx + 1] : null,
  };
}

export default async function TutorialPage({ params }: Props) {
  const { slug } = await params;

  let tutorial;
  try {
    tutorial = getTutorial(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = tutorial;
  const { prev, next } = getPrevNext(slug);

  return (
    <article className="px-6 md:px-12 py-10 md:py-14">
      <div className="max-w-[680px] mx-auto">
      {/* Article header */}
      <header className="mb-10 fade-up">
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "var(--color-fg)",
          }}
        >
          {frontmatter.title}
        </h1>
        {frontmatter.description && (
          <p
            className="mt-3 text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {frontmatter.description}
          </p>
        )}
      </header>

      {/* Divider */}
      <div
        className="mb-10"
        style={{ borderTop: "1px solid var(--border)" }}
      />

      {/* MDX content */}
      <div className="prose">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath, remarkCodeGroups],
              rehypePlugins: [
                rehypeKatex,
                [rehypePrettyCode, { theme: "github-dark" }],
              ],
            },
          }}
          components={{ ...mdxComponents, Code }}
        />
      </div>

      {/* Prev / next */}
      {(prev || next) && (
        <nav
          className="mt-16 pt-8 flex gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {prev && (
            <Link
              href={getArticlePath(prev.slug)}
              className="flex-1 group flex flex-col gap-1 px-4 py-3 rounded-md border transition-colors hover:border-[var(--border-strong)]"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--muted)",
                }}
              >
                ← Previous
              </span>
              <span
                className="text-sm font-semibold group-hover:text-[var(--color-green)] transition-colors"
                style={{ color: "var(--color-fg)" }}
              >
                {prev.title}
              </span>
            </Link>
          )}
          {next && (
            <Link
              href={getArticlePath(next.slug)}
              className="flex-1 group flex flex-col gap-1 px-4 py-3 rounded-md border text-right transition-colors hover:border-[var(--border-strong)]"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--muted)",
                }}
              >
                Next →
              </span>
              <span
                className="text-sm font-semibold group-hover:text-[var(--color-green)] transition-colors"
                style={{ color: "var(--color-fg)" }}
              >
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      )}
      </div>
    </article>
  );
}
