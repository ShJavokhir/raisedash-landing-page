import { HARD_BANNED, SOFT_DISCOURAGED } from "../styleGuide";

export interface StyleResult {
  ok: boolean;
  hard: string[];
  soft: string[];
}

const EM_EN = /[—–]/;
const CURLY = /[‘’“”]/;

/** Deterministic style check. `hard` violations fail the post; `soft` only warn. */
export function lint(text: string): StyleResult {
  const hard: string[] = [];
  const soft: string[] = [];
  const lines = text.split("\n");

  lines.forEach((line, i) => {
    if (EM_EN.test(line)) hard.push(`line ${i + 1}: em or en dash -> "${snippet(line)}"`);
    if (CURLY.test(line)) hard.push(`line ${i + 1}: curly quote -> "${snippet(line)}"`);
  });

  const lower = text.toLowerCase();
  for (const phrase of HARD_BANNED) {
    if (lower.includes(phrase.toLowerCase())) hard.push(`banned phrase: "${phrase}"`);
  }
  for (const phrase of SOFT_DISCOURAGED) {
    if (lower.includes(phrase.toLowerCase())) soft.push(`discouraged word: "${phrase}"`);
  }

  return { ok: hard.length === 0, hard, soft };
}

function snippet(line: string): string {
  const t = line.trim();
  return t.length > 80 ? `${t.slice(0, 77)}...` : t;
}
