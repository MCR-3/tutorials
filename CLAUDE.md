# tutorials.simplegrad.org — CLAUDE.md

## Project

Deep learning tutorials site for the **simplegrad** "ecosystem" at [tutorials.simplegrad.org](https://tutorials.simplegrad.org).

Tutorials cover deep learning concepts at a practical level — enough to understand how DL frameworks work and how to build models (convnets, transformers, etc.) — without heavy math proofs. Written for people who want to read code and understand what's happening.

## Ecosystem

| Site | URL |
|---|---|
| Landing page | https://simplegrad.org |
| Documentation | https://docs.simplegrad.org |
| Tutorials (this project) | https://tutorials.simplegrad.org |
| GitHub | https://github.com/simplegrad/simplegrad |
| Contact | contact@simplegrad.org |

## Stack

- **Runtime**: Bun (see `BUN.md` for Bun-specific conventions)
- **Framework**: Next.js (App Router) + React
- **Styling**: Tailwind CSS v4 — utility classes only, no inline styles
- **Content**: MDX via Contentlayer — articles written in `.mdx`
- **Math**: KaTeX for LaTeX equations inside MDX
- **Charts**: Recharts for graphs and visualizations inside MDX
- **Deployment**: GitHub Pages at `tutorials.simplegrad.org`

### Commands

```sh
bun install           # install deps
bun run dev           # dev server
bun run build         # production build (Next.js static export)
bun run lint          # lint
```

## Design

Matches [simplegrad.org](https://simplegrad.org) — "startup pitch" style. Flat design. No drop shadows. Clean borders. Bold copy.

### Single Source of Truth: `global.css`

All design tokens live **only** in `src/styles/global.css` as CSS custom properties. Never hardcode color values or font names anywhere else — always reference variables.

```css
/* src/styles/global.css */
:root {
  /* Background / foreground */
  --bg:              #F5F5F5;
  --fg:              #151718;
  --white:           #ffffff;

  /* Borders */
  --border:          rgba(21,23,24,0.11);
  --border-strong:   rgba(21,23,24,0.35);

  /* Secondary text */
  --muted:           rgba(21,23,24,0.48);

  /* Interactive surfaces */
  --surface-hover:   rgba(21,23,24,0.04);
  --bg-glass:        rgba(245,245,245,0.88);

  /* Button tokens */
  --btn-border:      rgba(21,23,24,0.2);
  --btn-border-hover: rgba(21,23,24,0.45);
  --btn-bg-hover:    rgba(21,23,24,0.03);

  /* Primary accent — simplegrad green */
  --green:           #34B87E;
  --green-dark:      #2da870;

  /* Secondary accent */
  --blue:            #4474B8;

  /* Tutorial accent palette */
  --pink:            #F5A4C6;
  --yellow:          #FEBA14;
  --orange:          #F35C2D;

  /* Dot pattern */
  --dot-pattern:     rgba(21,23,24,0.15);
}
```

### Typography

**Strict font management — 4 roles, no mixing.**

| Role | Font | Weights / Notes |
|---|---|---|
| Headings | JetBrains Mono | 700, 800 |
| Body / UI | Plus Jakarta Sans | variable `wght@200..800` |
| Code blocks | JetBrains Mono | 400, 500 — smaller size, normal weight |
| Math equations | KaTeX default font | set automatically by KaTeX |

- Reference fonts via CSS variables (`--font-heading`, `--font-body`, `--font-code`) — never hardcode font names.
- Use inline `style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}` for headings in JSX — more reliable than Tailwind `font-*` class names for explicit weights.
- Do NOT place a label/eyebrow above page headings (e.g. a small green uppercase "category name" line). The title stands on its own.

### Layout

```
header          (60px, not sticky)
article layout  (sidebar nav + main content)
footer          (52px desktop / auto mobile)
```

- Content max-width: `680px`, centered
- Mobile breakpoint: `600px`
- Site is fully responsive and mobile-friendly

### Header

Not sticky. Logo left (link to simplegrad.org), site name right + GitHub icon. Same on mobile.

### Buttons

| Class | Background | Border | Text |
|---|---|---|---|
| `.btn-primary` | `--green` | `--green` | `--white` |
| `.btn-outline` | `--white` | `--btn-border` | `--fg` |

### Animations

- Page load: staggered `fadeUp` on hero/landing elements
- Scroll: `IntersectionObserver` scroll-reveal on sections

## Content

### File Structure

```
content/
  tutorials/
    getting-started/
      index.mdx
    convnets/
      index.mdx
    transformers/
      index.mdx
```

### MDX Frontmatter

```mdx
---
title: "Building a Convolutional Network"
description: "..."
date: "2026-04-08"
category: "convnets"
order: 1
---
```

### Math (KaTeX)

Write LaTeX inline with `$...$` and display blocks with `$$...$$`:

```mdx
The loss function is $\mathcal{L} = -\sum_i y_i \log \hat{y}_i$.

$$
\frac{\partial \mathcal{L}}{\partial w} = X^T (y - \hat{y})
$$
```

### Framework-specific code (simplegrad ↔ PyTorch)

Use two adjacent fenced code blocks with `simplegrad` and `pytorch` as the language identifier. The `remarkCodeGroups` plugin transforms them into a `<Code>` component at build time. Both variants are syntax-highlighted by shiki server-side; the toggle in the sidebar switches between them client-side.

**Never use JSX template literals in MDX props** — the MDX parser (Acorn) fails to parse them.

````mdx
```simplegrad
import simplegrad as sg
x = sg.Tensor([[1.0, 2.0]])
```

```pytorch
import torch
x = torch.tensor([[1.0, 2.0]])
```
````

The two fences must be consecutive. Order doesn't matter (sg-first or pt-first both work). To specify a different highlight language add it after the framework name: `` ```simplegrad javascript ``.

### Charts (Recharts)

Import and use directly inside `.mdx`:

```mdx
import { LineChart, Line, XAxis, YAxis } from 'recharts'

<LineChart data={data} width={600} height={300}>
  <Line type="monotone" dataKey="loss" stroke="var(--green)" />
  <XAxis dataKey="epoch" />
  <YAxis />
</LineChart>
```

Use `var(--green)`, `var(--blue)`, `var(--orange)` etc. for chart colors — never raw hex.

## Conventions

- Colors only via CSS custom properties — no raw hex values in JSX or Tailwind arbitrary values
- Font families only via CSS variables — no hardcoded font names in components
- Tailwind utilities for spacing, layout, and responsive behavior; CSS variables for all design tokens
- Semantic, accessible HTML
- Mobile-first responsive design
- No inline styles
