/**
 * remark plugin: transform simplegrad/pytorch fenced code blocks into
 * <Code sg="..." pt="..." lang="..." /> MDX JSX elements.
 *
 * Pairs (consecutive sg + pt fences, any order) → dual-framework block with toggle.
 * Single sg or pt fence → single-framework block, no toggle.
 *
 * Usage:
 *
 * ```simplegrad
 * import simplegrad as sg
 * ```
 * ```pytorch
 * import torch
 * ```
 *
 * Highlight language defaults to "python". Override with e.g. `simplegrad javascript`.
 * Never use JSX template literals for code props — the MDX Acorn parser drops them.
 */

import { visit } from "unist-util-visit";
import type { Root, Code } from "mdast";
import type { MdxJsxFlowElement, MdxJsxAttribute } from "mdast-util-mdx-jsx";

function attr(name: string, value: string): MdxJsxAttribute {
  return { type: "mdxJsxAttribute", name, value };
}

function codeElement(attrs: MdxJsxAttribute[]): MdxJsxFlowElement {
  return {
    type: "mdxJsxFlowElement",
    name: "Code",
    attributes: attrs,
    children: [],
  };
}

function frameworkLang(lang: string): string {
  return lang.replace(/^(?:simplegrad|pytorch)\s*/, "").trim() || "python";
}

export function remarkCodeGroups() {
  return (tree: Root) => {
    visit(tree, (node) => {
      const parent = node as { children?: unknown[] };
      if (!Array.isArray(parent.children)) return;

      const children = parent.children as Code[];
      let i = 0;

      while (i < children.length) {
        const cur = children[i];
        if (cur.type !== "code") {
          i++;
          continue;
        }

        const curLang = cur.lang ?? "";
        const isSg = curLang.startsWith("simplegrad");
        const isPt = curLang.startsWith("pytorch");

        if (!isSg && !isPt) {
          i++;
          continue;
        }

        const nxt = children[i + 1];
        const nxtLang = nxt?.lang ?? "";
        const isPair =
          nxt?.type === "code" &&
          ((isSg && nxtLang.startsWith("pytorch")) ||
            (isPt && nxtLang.startsWith("simplegrad")));

        if (isPair) {
          const sgNode = isSg ? cur : nxt;
          const ptNode = isSg ? nxt : cur;
          const lang = frameworkLang(sgNode.lang ?? "");

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (children as any[]).splice(
            i,
            2,
            codeElement([
              attr("sg", sgNode.value),
              attr("pt", ptNode.value),
              attr("lang", lang),
            ])
          );
          // Don't advance i — re-check from the same position
        } else {
          const lang = frameworkLang(curLang);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (children as any[]).splice(
            i,
            1,
            codeElement([
              attr(isSg ? "sg" : "pt", cur.value),
              attr("lang", lang),
            ])
          );
          i++;
        }
      }
    });
  };
}
