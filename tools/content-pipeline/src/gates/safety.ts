/*
 * Content-safety gate. Defends against prompt-injection artifacts reaching the
 * published MDX. The body must be plain markdown. MDX executes JSX, curly-brace
 * expressions, and ESM at build time, so we reject anything that could run, plus
 * dangerous URIs and off-domain inline images (a tracking-pixel / exfil vector).
 * Fenced code blocks are literal in MDX, so we skip them.
 */

export interface SafetyResult {
  ok: boolean;
  issues: string[];
}

const ALLOWED_IMAGE_HOSTS = ["cdn.raisedash.com"];

export function checkSafety(body: string): SafetyResult {
  const issues: string[] = [];
  const lines = body.split("\n");
  let inFence = false;

  lines.forEach((line, idx) => {
    const ln = idx + 1;

    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      return;
    }
    if (inFence) return; // fenced code is not executed by MDX

    if (/[{}]/.test(line)) {
      issues.push(`line ${ln}: curly brace (an MDX expression executes at build time)`);
    }
    if (/^\s*(import|export)\s+/.test(line)) {
      issues.push(`line ${ln}: import/export statement (MDX ESM)`);
    }

    // Raw HTML or JSX tags. Allow markdown autolinks like <https://...> and <mailto:...>.
    for (const m of line.matchAll(/<([A-Za-z][\w-]*)/g)) {
      const rest = line.slice(m.index ?? 0);
      if (/^<(https?:\/\/|mailto:)/i.test(rest)) continue;
      issues.push(`line ${ln}: raw HTML or JSX tag "<${m[1]}"`);
    }

    if (/javascript:/i.test(line)) issues.push(`line ${ln}: javascript: URI`);
    if (/data:text\/html/i.test(line)) issues.push(`line ${ln}: data:text/html URI`);
    if (/\son[a-z]+\s*=/i.test(line)) issues.push(`line ${ln}: inline event handler`);

    for (const m of line.matchAll(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g)) {
      try {
        const host = new URL(m[1]).host;
        const allowed = ALLOWED_IMAGE_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
        if (!allowed) {
          issues.push(
            `line ${ln}: external inline image from ${host} (only ${ALLOWED_IMAGE_HOSTS.join(", ")} allowed)`
          );
        }
      } catch {
        issues.push(`line ${ln}: malformed image URL`);
      }
    }
  });

  return { ok: issues.length === 0, issues };
}
