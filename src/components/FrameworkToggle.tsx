"use client";

import { useFramework, type Framework } from "@/context/FrameworkContext";
import clsx from "clsx";

const OPTIONS: { value: Framework; label: string }[] = [
  { value: "simplegrad", label: "simplegrad" },
  { value: "pytorch", label: "PyTorch" },
];

export function FrameworkToggle() {
  const { framework, setFramework } = useFramework();

  return (
    <div
      className="px-4 py-3"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <p
        className="mb-2 uppercase tracking-wider"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          fontWeight: 700,
          color: "var(--muted)",
        }}
      >
        Code examples
      </p>
      <div
        className="flex rounded-md overflow-hidden"
        style={{ border: "1px solid var(--border)" }}
      >
        {OPTIONS.map((opt, i) => (
          <button
            key={opt.value}
            onClick={() => setFramework(opt.value)}
            className={clsx(
              "flex-1 py-1.5 text-xs font-semibold transition-[background,color] duration-150",
              i === 0 && "border-r",
              framework === opt.value
                ? "text-white"
                : "hover:bg-[var(--surface-hover)]"
            )}
            style={
              framework === opt.value
                ? {
                    background: "var(--color-green)",
                    color: "white",
                    borderColor: "var(--color-green)",
                  }
                : {
                    background: "var(--color-white)",
                    color: "var(--color-fg)",
                    borderColor: "var(--border)",
                  }
            }
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
