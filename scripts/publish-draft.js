#!/usr/bin/env node
// Promote a draft to a published post.
//
// Usage:
//   npm run publish -- my-post-slug
//   npm run publish -- _drafts/my-post-slug.md
//
// What it does:
//   - Updates (or inserts) `date` to today.
//   - Inserts `featured: true` if absent.
//   - Inserts `comments: true` if absent.
//   - Moves the file from `_drafts/<slug>.md`
//     to `_posts/blog/YYYY-MM-DD-<slug>.md`.

const path = require("path");
const fs   = require("fs");

const ROOT      = path.join(__dirname, "..");
const DRAFTS    = path.join(ROOT, "_drafts");
const POSTS_DIR = path.join(ROOT, "_posts", "blog");

// ── helpers ──────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().slice(0, 10);
}

function splitFrontmatter(content) {
  const m = content.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n([\s\S]*)$/);
  if (!m) return null;
  return { fm: m[1], body: m[2] };
}

function hasKey(fm, key) {
  return new RegExp("^" + key + "\\s*:", "m").test(fm);
}

function setKey(fm, key, value) {
  const re = new RegExp("^" + key + ":.*$", "m");
  if (re.test(fm)) return fm.replace(re, key + ": " + value);
  return fm + "\n" + key + ": " + value;
}

function resolveDraft(arg) {
  // Accept: a full path, a bare filename, or a slug (no extension).
  const candidates = [
    arg,
    path.join(DRAFTS, arg),
    path.join(DRAFTS, arg + ".md"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c) && c.endsWith(".md")) return path.resolve(c);
  }
  return null;
}

function listDrafts() {
  if (!fs.existsSync(DRAFTS)) return [];
  return fs.readdirSync(DRAFTS).filter(f => f.endsWith(".md"));
}

// ── main ─────────────────────────────────────────────────────────────────────

const arg = (process.argv[2] || "").trim();

if (!arg) {
  const drafts = listDrafts();
  if (drafts.length === 0) {
    console.error("No drafts found in _drafts/.");
  } else {
    console.error("Usage: npm run publish -- <slug-or-filename>");
    console.error("\nAvailable drafts:");
    drafts.forEach(d => console.error("  " + d));
  }
  process.exit(1);
}

const src = resolveDraft(arg);
if (!src) {
  console.error("Draft not found: " + arg);
  process.exit(1);
}

const slug    = path.basename(src, ".md");
const date    = today();
const destName = date + "-" + slug + ".md";
const dest     = path.join(POSTS_DIR, destName);

if (fs.existsSync(dest)) {
  console.error("Destination already exists: " + path.relative(ROOT, dest));
  process.exit(1);
}

const raw    = fs.readFileSync(src, "utf8");
const parsed = splitFrontmatter(raw);
if (!parsed) {
  console.error("Could not parse front matter in " + path.relative(ROOT, src));
  process.exit(1);
}

let { fm, body } = parsed;

fm = setKey(fm, "date", date + " 00:00:00");
if (!hasKey(fm, "featured"))  fm = setKey(fm, "featured", "true");
if (!hasKey(fm, "comments"))  fm = setKey(fm, "comments", "true");

const output = "---\n" + fm + "\n---\n" + body;

fs.mkdirSync(POSTS_DIR, { recursive: true });
fs.writeFileSync(dest, output);
fs.unlinkSync(src);

console.log("Published:");
console.log("  " + path.relative(ROOT, src) + "  ->  " + path.relative(ROOT, dest));
