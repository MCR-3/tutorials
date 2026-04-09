"use client";

import Link from "next/link";
import Image from "next/image";

function HamburgerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M2 4.5H16M2 9H16M2 13.5H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0 }}
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

/* Matches simplepage .gh-link exactly */
const navLinkClass =
  "inline-flex items-center gap-[0.45rem] px-[0.85rem] py-[0.38rem] text-[0.85rem] font-semibold rounded-[5px] border transition-[border-color,background] duration-[0.18s] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]";
const navLinkStyle = {
  borderColor: "var(--border)",
  color: "var(--color-fg)",
};

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header
      className="flex items-center h-[60px] px-4 md:px-6 shrink-0"
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--color-white)",
      }}
    >
      {/* Mobile: hamburger */}
      <button
        className="mr-5 p-1.5 rounded transition-colors hover:bg-[var(--surface-hover)] md:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <HamburgerIcon />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {/* Desktop: full horizontal logo */}
        <Link
          href="https://simplegrad.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center shrink-0 transition-opacity hover:opacity-70"
        >
          <Image
            src="/simplegrad_hor.svg"
            alt="simplegrad"
            width={120}
            height={26}
            style={{ height: 26, width: "auto" }}
            priority
          />
        </Link>
        {/* Mobile: mini logo */}
        <Link
          href="https://simplegrad.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex md:hidden items-center shrink-0 transition-opacity hover:opacity-70"
        >
          <Image
            src="/mini_simplegrad.svg"
            alt="simplegrad"
            width={20}
            height={20}
            style={{ height: 20, width: "auto", marginTop: 3 }}
            priority
          />
        </Link>
        <span
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
          }}
        >
          /
        </span>
        <Link
          href="/"
          className="transition-colors hover:text-[var(--color-green)]"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            fontWeight: 700,
            color: "var(--color-fg)",
          }}
        >
          tutorials
        </Link>
      </div>

      {/* Right nav — matches simplepage button style */}
      <nav className="flex items-stretch gap-2">
        <Link
          href="https://docs.simplegrad.org"
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden sm:inline-flex ${navLinkClass} `}
          style={navLinkStyle}
        >
          Docs
        </Link>
        <Link
          href="https://github.com/simplegrad/simplegrad"
          target="_blank"
          rel="noopener noreferrer"
          className={`${navLinkClass} `}
          style={navLinkStyle}
          aria-label="GitHub"
        >
          <GitHubIcon />
          <span className="hidden sm:inline">GitHub</span>
        </Link>
      </nav>
    </header>
  );
}
