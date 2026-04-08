import { codeToHtml } from "shiki";
import { CodeSwitcher } from "./CodeSwitcher";

type Props = {
  sg?: string;
  pt?: string;
  lang?: string;
};

// Async Server Component — runs at build time for static export.
// Pre-renders both variants with shiki so CodeSwitcher can swap them client-side.
export async function Code({ sg = "", pt = "", lang = "python" }: Props) {
  const theme = "github-dark";
  const safeSg = sg.trim();
  const safePt = pt.trim();

  if (!safeSg && !safePt) return null;

  const [sgHtml, ptHtml] = await Promise.all([
    safeSg ? codeToHtml(safeSg, { lang, theme }) : Promise.resolve(""),
    safePt ? codeToHtml(safePt, { lang, theme }) : Promise.resolve(""),
  ]);

  const hasBoth = Boolean(safeSg) && Boolean(safePt);
  return <CodeSwitcher sgHtml={sgHtml} ptHtml={ptHtml} hasBoth={hasBoth} />;
}
