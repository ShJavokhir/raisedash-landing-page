import { execFileSync } from "node:child_process";
import { REPO_ROOT } from "./config";

/*
 * Open a pull request for a generated draft. Used only in `--ship pr` (autonomous)
 * mode. Runs git + gh in the repo root. In GitHub Actions, gh authenticates via
 * the GH_TOKEN env var. Locally it uses your existing gh login.
 */

const BASE_BRANCH = process.env.CONTENT_BASE_BRANCH || "master";
const BOT_NAME = process.env.GIT_BOT_NAME || "raisedash-content-bot";
const BOT_EMAIL = process.env.GIT_BOT_EMAIL || "content-bot@raisedash.com";

function git(args: string[]): string {
  return execFileSync("git", args, { cwd: REPO_ROOT, encoding: "utf8" }).trim();
}

export interface ShipResult {
  branch: string;
  url: string;
}

export async function shipPr(opts: {
  slug: string;
  title: string;
  mdxRelPath: string;
  body: string;
  date: string;
}): Promise<ShipResult> {
  const branch = `content/${opts.date}-${opts.slug}`;

  try {
    git(["checkout", "-b", branch]);
  } catch {
    git(["checkout", branch]); // branch already exists locally
  }

  git(["add", "--", opts.mdxRelPath]);
  try {
    git([
      "-c",
      `user.name=${BOT_NAME}`,
      "-c",
      `user.email=${BOT_EMAIL}`,
      "commit",
      "-m",
      `content: ${opts.title}`,
    ]);
  } catch {
    // Nothing to commit (identical re-run). Fall through and try to push/open PR.
  }

  git(["push", "-u", "origin", branch, "--force-with-lease"]);

  let url = "";
  try {
    url = execFileSync(
      "gh",
      [
        "pr",
        "create",
        "--base",
        BASE_BRANCH,
        "--head",
        branch,
        "--title",
        opts.title,
        "--body",
        opts.body,
      ],
      { cwd: REPO_ROOT, encoding: "utf8" }
    ).trim();
  } catch {
    // PR may already exist for this branch; fetch its URL.
    try {
      url = execFileSync("gh", ["pr", "view", branch, "--json", "url", "-q", ".url"], {
        cwd: REPO_ROOT,
        encoding: "utf8",
      }).trim();
    } catch {
      url = `branch pushed: ${branch} (open a PR manually)`;
    }
  }

  return { branch, url };
}
