"use client";

import { useFramework, type Framework } from "@/context/FrameworkContext";
import clsx from "clsx";

type Props = {
  sgHtml: string;
  ptHtml: string;
  hasBoth: boolean;
};

const OPTIONS: { value: Framework; label: string }[] = [
  { value: "simplegrad", label: "simplegrad" },
  { value: "pytorch", label: "PyTorch" },
];

// sgHtml/ptHtml are generated at build time by shiki — trusted, sanitised markup only.
export function CodeSwitcher({ sgHtml, ptHtml, hasBoth }: Props) {
  const { framework, setFramework } = useFramework();

  const html = hasBoth
    ? framework === "pytorch"
      ? ptHtml
      : sgHtml
    : sgHtml || ptHtml;

  return (
    <div
      className="not-prose my-6 rounded-lg overflow-hidden"
      style={{ background: "var(--color-fg)" }}
    >
      {/* Toggle header — only when both variants exist */}
      {hasBoth && (
        <div
          className="flex items-center justify-end gap-1 px-3 py-2"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFramework(opt.value)}
              className={clsx(
                "px-2.5 py-0.5 rounded text-xs transition-[background,color] duration-150",
                "font-mono font-semibold"
              )}
              style={
                framework === opt.value
                  ? { background: "var(--color-green)", color: "#fff" }
                  : { color: "rgba(255,255,255,0.45)" }
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Code — key triggers fade animation on framework change */}
      <div
        className="code-inner"
        key={hasBoth ? framework : undefined}
        // Safe: shiki build-time output only
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
