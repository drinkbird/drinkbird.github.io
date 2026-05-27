#!/usr/bin/env node
// Scaffold a new blog draft under `_drafts/` with the standard front matter.
//
// Usage:
//   npm run new-post -- "My Post Title"
//   npm run new-post -- "My Post Title" --excerpt "One-line TL;DR."
//
// The slug is derived from the title (lowercase, dashes). Drafts have no date
// prefix while in `_drafts/`. Preview locally with `npm run serve:drafts`.
// To publish, move the file into `_posts/blog/` and prefix it with the date:
//
//   _drafts/my-post-title.md  ->  _posts/blog/2026-05-27-my-post-title.md

const path = require("path");
const fs   = require("fs");

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseArgs(argv) {
  const out = { title: null, excerpt: "" };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--excerpt") { out.excerpt = argv[++i] || ""; continue; }
    rest.push(a);
  }
  out.title = rest.join(" ").trim();
  return out;
}

const args = parseArgs(process.argv.slice(2));
if (!args.title) {
  console.error('Usage: npm run new-post -- "My Post Title" [--excerpt "..."]');
  process.exit(1);
}

const slug = slugify(args.title);
if (!slug) {
  console.error("Could not derive a slug from the title.");
  process.exit(1);
}

const draftsDir = path.join(__dirname, "..", "_drafts");
fs.mkdirSync(draftsDir, { recursive: true });

const target = path.join(draftsDir, `${slug}.md`);
if (fs.existsSync(target)) {
  console.error(`Refusing to overwrite existing draft: ${path.relative(process.cwd(), target)}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const frontMatter = [
  "---",
  "layout: post",
  `title: "${args.title.replace(/"/g, '\\"')}"`,
  `excerpt: "${args.excerpt.replace(/"/g, '\\"')}"`,
  `date: ${today} 00:00:00`,
  `permalink: /${slug}/`,
  "comments: true",
  "categories: blog",
  "---",
  "",
  "Write your post here.",
  "",
].join("\n");

fs.writeFileSync(target, frontMatter);
console.log(`Created ${path.relative(process.cwd(), target)}`);
console.log("Preview with: npm run serve:drafts");
