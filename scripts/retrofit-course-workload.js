#!/usr/bin/env node
// Retrofit `course_workload_iso` onto course index.md files that pre-date the
// schema.org Course rich-result work. Use when merging branches with courses
// imported before scripts/import-course.js started emitting the field.
//
// Idempotent: skips courses that already have the field set (pass --force to
// overwrite). Skips courses whose `time_budget` can't be parsed (set the
// value by hand, or fix the source data and re-import).
//
// Usage:
//   npm run retrofit-course-workload                # all courses
//   npm run retrofit-course-workload -- <slug>      # one course
//   npm run retrofit-course-workload -- --dry-run   # preview, no writes
//   npm run retrofit-course-workload -- --force     # overwrite existing

const path = require("path");
const fs = require("fs");
const { timeBudgetToIso } = require("./lib/duration");

const ROOT = path.resolve(__dirname, "..");
const COURSES_ROOT = path.join(ROOT, "_courses");

function parseArgs(argv) {
  const opts = { dryRun: false, force: false, slug: null };
  for (const a of argv) {
    if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--force") opts.force = true;
    else if (a === "--help" || a === "-h") {
      console.log("Usage: npm run retrofit-course-workload [-- <slug>] [-- --dry-run] [-- --force]");
      process.exit(0);
    } else if (a.startsWith("--")) {
      console.error("Unknown option: " + a);
      process.exit(1);
    } else if (opts.slug) {
      console.error("Multiple slugs given. Pass one slug at a time.");
      process.exit(1);
    } else {
      opts.slug = a;
    }
  }
  return opts;
}

function findCourseIndexes(slug) {
  if (slug) {
    const p = path.join(COURSES_ROOT, slug, "index.md");
    return fs.existsSync(p) ? [p] : [];
  }
  if (!fs.existsSync(COURSES_ROOT)) return [];
  return fs
    .readdirSync(COURSES_ROOT)
    .map((d) => path.join(COURSES_ROOT, d, "index.md"))
    .filter((p) => fs.existsSync(p));
}

function splitFrontMatter(content) {
  const m = content.match(/^---\n([\s\S]*?\n)---\n?([\s\S]*)$/);
  if (!m) return null;
  return { front: m[1], body: m[2] };
}

// Read a YAML scalar value for a top-level key. Handles plain strings and
// double-quoted strings; ignores keys nested under another key (we only
// match lines that start at column 0).
function readScalar(front, key) {
  const re = new RegExp("^" + key.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&") + ":\\s*(.+?)\\s*$", "m");
  const m = front.match(re);
  if (!m) return null;
  let v = m[1];
  if (v.startsWith('"') && v.endsWith('"')) {
    try { v = JSON.parse(v); } catch (_) { /* leave as-is */ }
  }
  return v;
}

function hasKey(front, key) {
  const re = new RegExp("^" + key.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&") + ":\\s*\\S", "m");
  return re.test(front);
}

function processFile(filePath, opts) {
  const rel = path.relative(ROOT, filePath);
  const content = fs.readFileSync(filePath, "utf8");
  const parts = splitFrontMatter(content);
  if (!parts) return { status: "skip", reason: "no front matter", path: rel };

  const { front, body } = parts;
  const alreadySet = hasKey(front, "course_workload_iso");
  if (alreadySet && !opts.force) {
    return { status: "skip", reason: "already set", path: rel };
  }

  const timeBudget = readScalar(front, "time_budget");
  if (!timeBudget) {
    return { status: "skip", reason: "no time_budget", path: rel };
  }
  const iso = timeBudgetToIso(timeBudget);
  if (!iso) {
    return { status: "skip", reason: "could not parse time_budget: " + JSON.stringify(timeBudget), path: rel };
  }

  let newFront;
  if (alreadySet) {
    newFront = front.replace(/^course_workload_iso:.*$/m, "course_workload_iso: " + iso);
  } else {
    // Insert directly under the time_budget line so the field stays grouped
    // with its source-of-truth.
    newFront = front.replace(/^(time_budget:.*)$/m, "$1\ncourse_workload_iso: " + iso);
  }

  if (opts.dryRun) {
    return { status: "would-update", iso, path: rel };
  }
  fs.writeFileSync(filePath, "---\n" + newFront + "---\n" + body);
  return { status: "updated", iso, path: rel };
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const files = findCourseIndexes(opts.slug);
  if (files.length === 0) {
    console.error(opts.slug ? "No course index found for slug: " + opts.slug : "No courses found under _courses/.");
    process.exit(1);
  }

  let changed = 0;
  let skipped = 0;
  for (const f of files) {
    const r = processFile(f, opts);
    if (r.status === "updated" || r.status === "would-update") {
      changed++;
      const verb = r.status === "would-update" ? "would set" : "set";
      console.log("  " + verb + " " + r.iso.padEnd(8) + " " + r.path);
    } else {
      skipped++;
      console.log("  skip       " + r.path + "   (" + r.reason + ")");
    }
  }

  console.log("");
  console.log(changed + " " + (opts.dryRun ? "would change" : "changed") + ", " + skipped + " skipped");
  if (opts.dryRun) console.log("(dry run - no files written; rerun without --dry-run to apply)");
}

main();
