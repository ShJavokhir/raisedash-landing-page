import { getDemoProduct } from "../src/data/demo";
import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import type { NextApiRequest, NextApiResponse } from "next";
import handler from "../src/pages/api/product-demo";
import { demoRequestSchema, formatProductDemoMessage } from "../src/lib/demo-request";

const valid = {
  fullName: "Taylor O’Neil",
  email: "taylor@example.com",
  company: "Example Fleet",
  phone: "+1 (202) 555-0142",
  interests: "Receipts Collector",
  companyWebsite: "",
  product: "receipts-telegram-bot",
  eventId: "demo-test-event",
};
const envKeys = [
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_CHAT_ID",
  "TELEGRAM_LEADS_CHAT_ID",
  "TURNSTILE_SECRET_KEY",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
];
const originalEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
const originalFetch = globalThis.fetch;
let requests: { url: string; init?: RequestInit }[];
let telegramResult: { ok: boolean; status?: number; throw?: boolean };
let verificationSuccess: boolean;

beforeEach(() => {
  requests = [];
  telegramResult = { ok: true };
  verificationSuccess = true;
  process.env.TELEGRAM_BOT_TOKEN = "test-token";
  process.env.TELEGRAM_CHAT_ID = "default-inbox";
  process.env.TELEGRAM_LEADS_CHAT_ID = "leads-inbox";
  delete process.env.TURNSTILE_SECRET_KEY;
  delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    requests.push({ url, init });
    if (url.includes("api.telegram.org")) {
      if (telegramResult.throw) throw new DOMException("Timed out", "TimeoutError");
      return Response.json({ ok: telegramResult.ok }, { status: telegramResult.status ?? 200 });
    }
    if (url.includes("siteverify")) return Response.json({ success: verificationSuccess });
    return Response.json({ status: 1 });
  };
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const key of envKeys) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

async function request(body: unknown = valid, method = "POST", contentType = "application/json") {
  const req = {
    method,
    body,
    cookies: {},
    headers: { "content-type": contentType, referer: "https://www.raisedash.com/get-a-demo" },
  } as NextApiRequest;
  let status = 200;
  let result: Record<string, unknown> = {};
  const headers: Record<string, string> = {};
  const res = {
    setHeader: (key: string, value: string) => {
      headers[key] = value;
    },
    status: (value: number) => {
      status = value;
      return res;
    },
    json: (value: Record<string, unknown>) => {
      result = value;
      return res;
    },
  } as unknown as NextApiResponse;
  await handler(req, res);
  return { status, body: result, headers };
}

test("delivers the complete request as plain text to the configured lead inbox before recording a conversion", async () => {
  const result = await request({
    ...valid,
    email: " TAYLOR@EXAMPLE.COM ",
    interests: "Receipts *and* feedback_[test] <notes>",
  });
  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
  assert.equal(result.headers["Cache-Control"], "no-store");
  assert.match(requests[0].url, /api.telegram.org/);
  const payload = JSON.parse(String(requests[0].init?.body));
  assert.equal(payload.chat_id, "leads-inbox");
  assert.equal(payload.parse_mode, undefined);
  for (const text of [
    valid.fullName,
    "taylor@example.com",
    valid.phone,
    valid.company,
    "Receipts *and* feedback_[test] <notes>",
    "Receipts Collector",
    "/get-a-demo",
  ]) {
    assert.ok(payload.text.includes(text), text);
  }
  assert.ok(requests[0].init?.signal);
  const analytics = requests.find(({ url }) => url.includes("/i/v0/e/"));
  assert.ok(analytics);
  const event = JSON.parse(String(analytics.init?.body));
  assert.equal(event.event, "lead_demo_requested");
  assert.equal(event.properties.product, valid.product);
  assert.equal(event.properties.interests, undefined);
  assert.equal(event.properties.phone, undefined);
});

test("optional company and phone can be blank; default notification inbox works", async () => {
  delete process.env.TELEGRAM_LEADS_CHAT_ID;
  const result = await request({ ...valid, phone: "", company: "" });
  assert.equal(result.status, 200);
  assert.equal(JSON.parse(String(requests[0].init?.body)).chat_id, "default-inbox");
});

test("rejects invalid, malformed, and oversized field values without notifying or counting leads", async () => {
  for (const patch of [
    { fullName: " " },
    { email: "not-an-email" },
    { phone: "call me please" },
    { phone: "123" },
    { phone: "1234567890123456" },
    { interests: " " },
    { interests: "x".repeat(1201) },
    { company: "x".repeat(151) },
    { fullName: { name: "Taylor" } },
    { email: ["taylor@example.com"] },
  ]) {
    assert.equal((await request({ ...valid, ...patch })).status, 400);
  }
  for (const body of [null, [], "bad", {}]) assert.equal((await request(body)).status, 400);
  assert.equal(requests.length, 0);
});

test("only accepts JSON POSTs", async () => {
  const get = await request(undefined, "GET");
  assert.equal(get.status, 405);
  assert.equal(get.headers.Allow, "POST");
  assert.equal((await request(valid, "POST", "text/plain")).status, 415);
  assert.equal(requests.length, 0);
});

test("honeypot acknowledges silently without external calls", async () => {
  const result = await request({ ...valid, companyWebsite: "https://spam.example.com" });
  assert.equal(result.status, 200);
  assert.equal(requests.length, 0);
});

test("missing and failed CAPTCHA never deliver a lead; a valid token does", async () => {
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "test-site";
  assert.equal((await request()).status, 400);
  assert.equal(requests.length, 0);
  verificationSuccess = false;
  assert.equal((await request({ ...valid, turnstileToken: "bad-token" })).status, 400);
  assert.equal(requests.length, 1);
  verificationSuccess = true;
  assert.equal((await request({ ...valid, turnstileToken: "good-token" })).status, 200);
  assert.ok(requests.some(({ url }) => url.includes("api.telegram.org")));
});

test("partial CAPTCHA configuration fails closed", async () => {
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "test-site";
  assert.equal((await request()).status, 503);
  assert.equal(requests.length, 0);
});

test("provider rejection, HTTP failure, and timeout never show success or record conversions", async () => {
  for (const failure of [{ ok: false }, { ok: false, status: 429 }, { ok: false, throw: true }]) {
    requests = [];
    telegramResult = failure;
    const result = await request();
    assert.equal(result.status, 502);
    assert.equal(result.body.success, undefined);
    assert.equal(requests.length, 1);
  }
});

test("missing delivery configuration never acknowledges receipt", async () => {
  delete process.env.TELEGRAM_BOT_TOKEN;
  assert.equal((await request()).status, 502);
  assert.equal(requests.length, 0);
});

test("analytics outage does not turn a delivered lead into an error", async () => {
  globalThis.fetch = async (input) => {
    if (String(input).includes("api.telegram.org")) return Response.json({ ok: true });
    throw new Error("Analytics offline");
  };
  assert.equal((await request()).status, 200);
});

test("product prefill is allowlisted and maximum valid notes fit the provider limit", () => {
  assert.equal(getDemoProduct("elp-practice")?.name, "TruckTalk ELP Practice");
  assert.equal(getDemoProduct("<script>alert(1)</script>"), undefined);
  assert.equal(getDemoProduct(["elp-practice"]), undefined);
  const data = demoRequestSchema.parse({
    ...valid,
    fullName: "n".repeat(100),
    company: "c".repeat(150),
    interests: "🙂".repeat(600),
  });
  assert.ok(formatProductDemoMessage(data, valid.product).length < 4096);
  assert.ok(formatProductDemoMessage(data, "invalid").includes("General inquiry"));
});
