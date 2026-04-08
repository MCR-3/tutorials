"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, getArticlePath } from "@/lib/navigation";
import clsx from "clsx";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{
        transform: open ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 0.18s ease",
      }}
    >
      <path
        d="M4 2.5L7.5 6L4 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavTree({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>(
    Object.fromEntries(navigation.map((t) => [t.title, true]))
  );

  const toggle = (title: string) =>
    setOpenTopics((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <nav className="py-4 px-3">
      {navigation.map((topic) => (
        <div key={topic.title} className="mb-1">
          <button
            onClick={() => toggle(topic.title)}
            className={clsx(
              "w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded text-left",
              "uppercase tracking-wider transition-colors duration-150",
              topic.articles.length === 0
                ? "opacity-35 cursor-default"
                : "hover:bg-[var(--surface-hover)] cursor-pointer"
            )}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "var(--muted)",
            }}
            disabled={topic.articles.length === 0}
          >
            <span>{topic.title}</span>
            {topic.articles.length > 0 && (
              <ChevronIcon open={openTopics[topic.title] ?? true} />
            )}
          </button>

          {openTopics[topic.title] && topic.articles.length > 0 && (
            <ul className="mt-0.5 mb-2">
              {topic.articles.map((article) => {
                const href = getArticlePath(article.slug);
                const active = pathname === href;
                return (
                  <li key={article.slug}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      className={clsx(
                        "flex items-center px-3 py-1.5 mx-1 rounded-md text-sm transition-all duration-150",
                        active
                          ? "text-white"
                          : "hover:bg-[var(--surface-hover)]"
                      )}
                      style={
                        active
                          ? {
                              background: "var(--color-green)",
                              fontWeight: 600,
                              color: "white",
                            }
                          : {
                              fontWeight: 500,
                              color: "var(--color-fg)",
                            }
                      }
                    >
                      {article.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {!openTopics[topic.title] && topic.articles.length > 0 && (
            <div className="h-1" />
          )}
        </div>
      ))}
    </nav>
  );
}

/* ── Desktop sidebar (always visible ≥768px) ─────────────────── */
export function DesktopSidebar() {
  return (
    <aside
      className="hidden md:flex flex-col w-64 shrink-0 overflow-y-auto sticky top-0 h-screen"
      style={{
        borderRight: "1px solid var(--border)",
        background: "var(--color-white)",
      }}
    >
      <NavTree />
    </aside>
  );
}

/* ── Mobile sidebar (overlay, slide-in from left) ────────────── */
export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          "fixed inset-0 z-40 md:hidden transition-opacity duration-200",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        style={{ background: "rgba(21,23,24,0.3)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={clsx(
          "fixed left-0 top-0 h-full w-72 z-50 md:hidden overflow-y-auto",
          "transform transition-transform duration-250 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          background: "var(--color-white)",
          borderRight: "1px solid var(--border)",
        }}
      >
        {/* Close button */}
        <div
          className="flex items-center justify-between px-4 h-[60px]"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--muted)",
            }}
          >
            Tutorials
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[var(--surface-hover)] transition-colors"
            aria-label="Close sidebar"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 3L13 13M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <NavTree onNavigate={onClose} />
      </aside>
    </>
  );
}
