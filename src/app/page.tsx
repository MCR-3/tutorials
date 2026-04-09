import Link from "next/link";
import { navigation, getArticlePath } from "@/lib/navigation";

export default function HomePage() {
  const totalArticles = navigation.reduce((n, t) => n + t.articles.length, 0);

  return (
    <div className="px-6 md:px-12 py-12 max-w-[680px] mx-auto">
      {/* Hero */}
      <div className="mb-12 fade-up">
        <h1
          className="mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "var(--color-fg)",
          }}
        >
          Deep learning,
          <br />
          <span style={{ color: "var(--color-green)" }}>
            built to understand.
          </span>
        </h1>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: "var(--muted)" }}
        >
          Practical tutorials covering how deep learning frameworks actually
          work — no hand-waving, no black boxes. From autograd to transformers,
          with real code in{" "}
          <Link
            href="https://github.com/simplegrad/simplegrad"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--color-green)] transition-colors"
            style={{ color: "var(--color-fg)" }}
          >
            simplegrad
          </Link>
          .
        </p>
        <Link
          href="/getting-started/introduction"
          className="inline-flex items-center gap-[0.35rem] px-[1.4rem] py-[0.62rem] text-[0.9rem] font-semibold text-white rounded-[5px] border-[1.5px] border-[var(--color-green)] bg-[var(--color-green)] hover:bg-[var(--color-green-dark)] hover:border-[var(--color-green-dark)] transition-[background,border-color] duration-[0.16s] active:scale-[0.965]"
        >
          Start reading →
        </Link>
      </div>

      {/* Divider */}
      <div className="mb-10" style={{ borderTop: "1px solid var(--border)" }} />

      {/* Topic list */}
      <div className="space-y-8">
        {navigation.map((topic) => (
          <section key={topic.title}>
            <h2
              className="mb-3 uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "var(--muted)",
              }}
            >
              {topic.title}
            </h2>

            {topic.articles.length === 0 ? (
              <p className="text-sm" style={{ color: "var(--border-strong)" }}>
                Coming soon
              </p>
            ) : (
              <ul className="space-y-1">
                {topic.articles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={getArticlePath(article.slug)}
                      className="group flex items-start gap-3 px-3 py-3 -mx-3 rounded-md transition-colors hover:bg-[var(--surface-hover)]"
                    >
                      <span
                        className="mt-0.5 text-sm"
                        style={{ color: "var(--color-green)" }}
                      >
                        →
                      </span>
                      <div>
                        <p
                          className="text-sm font-semibold leading-snug group-hover:text-[var(--color-green)] transition-colors"
                          style={{ color: "var(--color-fg)" }}
                        >
                          {article.title}
                        </p>
                        {article.description && (
                          <p
                            className="text-xs mt-0.5 leading-relaxed"
                            style={{ color: "var(--muted)" }}
                          >
                            {article.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div
        className="mt-16 pt-8"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          {totalArticles} article{totalArticles !== 1 ? "s" : ""} published ·{" "}
          <Link
            href="https://simplegrad.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--color-fg)] transition-colors"
          >
            simplegrad.org
          </Link>
        </p>
      </div>
    </div>
  );
}
