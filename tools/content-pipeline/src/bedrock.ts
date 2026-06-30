import { AnthropicBedrock } from "@anthropic-ai/bedrock-sdk";
import { config } from "./config";

/*
 * Thin wrapper over the Anthropic Bedrock client. Credentials come from the
 * normal AWS chain (env, ~/.aws, SSO); we only pass the region. Calls retry on
 * throttling and transient 5xx errors.
 */

const client = new AnthropicBedrock({ awsRegion: config.awsRegion });

export interface CallOpts {
  model: string;
  user: string;
  system?: string;
  maxTokens?: number;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function isRetryable(err: unknown): boolean {
  const status = (err as { status?: number })?.status;
  if (status === 429 || (typeof status === "number" && status >= 500)) return true;
  const name = (err as { name?: string })?.name || "";
  return /throttl|timeout|econnreset|temporarilyunavailable/i.test(name);
}

async function withRetry<T>(fn: () => Promise<T>, label: string): Promise<T> {
  const max = 4;
  let lastErr: unknown;
  for (let attempt = 0; attempt <= max; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt === max || !isRetryable(err)) break;
      const delay = Math.min(15000, 800 * 2 ** attempt) + Math.floor(Math.random() * 400);
      process.stdout.write(`    .. ${label} retry ${attempt + 1}/${max} in ${delay}ms\n`);
      await sleep(delay);
    }
  }
  throw lastErr;
}

export async function callText(opts: CallOpts): Promise<string> {
  const res = await withRetry(
    () =>
      client.messages.create({
        model: opts.model,
        max_tokens: opts.maxTokens ?? 8192,
        ...(opts.system ? { system: opts.system } : {}),
        messages: [{ role: "user", content: opts.user }],
      }),
    `bedrock ${opts.model}`
  );

  const text = res.content
    .filter((b): b is Extract<typeof b, { type: "text" }> => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();

  if (!text)
    throw new Error(`Empty response from ${opts.model} (stop_reason: ${res.stop_reason}).`);
  return text;
}

/** Parse a JSON object out of model text, tolerating code fences and chatter. */
export function parseJsonLoose<T>(text: string): T {
  let s = text.trim();
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) s = fence[1].trim();
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) {
    throw new Error("Model did not return JSON.");
  }
  return JSON.parse(s.slice(start, end + 1)) as T;
}

export async function callJSON<T>(opts: CallOpts): Promise<T> {
  const text = await callText(opts);
  return parseJsonLoose<T>(text);
}

/** Minimal connectivity probe used by `check`. Returns ok or a readable error. */
export async function probeModel(model: string): Promise<{ ok: boolean; error?: string }> {
  try {
    await client.messages.create({
      model,
      max_tokens: 8,
      messages: [{ role: "user", content: "Reply with the single word: ok" }],
    });
    return { ok: true };
  } catch (err) {
    const status = (err as { status?: number })?.status;
    const message = (err as { message?: string })?.message || String(err);
    return { ok: false, error: status ? `HTTP ${status}: ${message}` : message };
  }
}
