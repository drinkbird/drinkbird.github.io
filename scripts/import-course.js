#!/usr/bin/env node
// Import a course produced by an external authoring tool into this Jekyll
// blog. The source is a course directory shaped as:
//
//   <source>/course.json
//   <source>/<NN>-<module-slug>/<NN>-<chapter-slug>.md
//   <source>/<NN>-<module-slug>/<NN>-<chapter-slug>.quiz.json
//
// The destination is `_courses/<slug>/` where <slug> comes from course.json.
// Chapter markdown files have Jekyll front matter prepended (derived from
// course.json) and bodies wrapped in {% raw %}...{% endraw %} so any Liquid
// syntax in prose renders literally.
//
// Re-import policy (idempotent and additive for content the author may have
// hand-corrected after a previous import):
//   - course.json:     overwritten every run (structural data, Sapling owns)
//   - chapter .md:     written only if the file does not yet exist
//   - chapter quiz:    refreshed every run (small, no hand-edits expected)
//   - index.md:        written only on first import; left alone afterwards
//
// To force a full chapter refresh, delete the chapter files first or fix the
// authoring tool upstream and re-import.
//
// After copying files the script runs `ruby scripts/sync-courses-data.rb` so
// `_data/courses/` and `_data/quizzes/` reflect the new content.
//
// After copying files the script runs `ruby scripts/sync-courses-data.rb` so
// `_data/courses/` and `_data/quizzes/` reflect the new content.
//
// Usage:
//   npm run import-course -- /absolute/path/to/source-course-dir

const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const COURSES_ROOT = path.join(ROOT, "_courses");
const SYNC_SCRIPT = path.join(ROOT, "scripts", "sync-courses-data.rb");

function usage(msg) {
  if (msg) console.error("Error: " + msg + "\n");
  console.error("Usage: npm run import-course -- <path-to-source-course-dir>");
  process.exit(1);
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function yamlString(s) {
  return JSON.stringify(String(s));
}

function buildFrontMatter(courseSlug, module_, chapter, moduleDir, chapterFilename) {
  const lines = [
    "---",
    "course_slug: " + courseSlug,
    "module_slug: " + module_.slug,
    "chapter_slug: " + chapter.slug,
    "module_dir: " + moduleDir,
    "chapter_filename: " + chapterFilename,
    "module_id: " + module_.id,
    "chapter_id: " + chapter.id,
    "module_title: " + yamlString(normalizeTypography(module_.title)),
    "chapter_title: " + yamlString(normalizeTypography(chapter.title)),
    "---",
    "",
    ""
  ];
  return lines.join("\n");
}

// Match the blog's typographic convention: em-dash (—) becomes a plain
// hyphen (-). Applied to chapter prose and quiz JSON; course.json is copied
// verbatim so card meta / overview text remains faithful to the source.
function normalizeTypography(s) {
  return s.replace(/—/g, "-");
}

// Wrap the body in {% raw %}...{% endraw %} so Liquid syntax in prose renders
// literally. Skip the wrap if the body already contains raw tags of its own
// (chapters teaching Liquid) - Liquid does not support nested raw blocks and
// would close the outer block at the first inner {% endraw %}.
function wrapBody(body) {
  const trimmed = body.replace(/^﻿/, "").replace(/\s+$/g, "");
  const normalized = normalizeTypography(trimmed);
  if (/\{%\s*(raw|endraw)\s*%\}/.test(normalized)) {
    return normalized + "\n";
  }
  return "{% raw %}\n" + normalized + "\n{% endraw %}\n";
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// Blog-side presentation metadata (image, description, last_updated) lives
// on the course's index.md front matter, not in course.json - that way it
// survives re-imports (the script never overwrites index.md once created)
// and stays decoupled from the structural data the authoring tool owns.
function writePlaceholderIndex(destSlugDir, course) {
  const indexPath = path.join(destSlugDir, "index.md");
  if (fs.existsSync(indexPath)) return false;
  const title = course.topic || course.slug;
  const today = new Date().toISOString().slice(0, 10);
  const blurb = (course.answers && course.answers.goal) || "Course overview.";
  const body = [
    "---",
    "layout: course-index",
    "course_slug: " + course.slug,
    "permalink: /courses/" + course.slug + "/",
    "title: " + yamlString(title),
    "image: " + course.slug + ".jpg",
    "description: " + yamlString(blurb),
    "last_updated: " + today,
    "---",
    "",
    blurb,
    ""
  ].join("\n");
  fs.writeFileSync(indexPath, body);
  return true;
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.length !== 1) usage("expected exactly one argument");
  const sourceDir = argv[0];
  if (!path.isAbsolute(sourceDir)) usage("source path must be absolute: " + sourceDir);
  if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
    usage("not a directory: " + sourceDir);
  }

  const courseJsonPath = path.join(sourceDir, "course.json");
  if (!fs.existsSync(courseJsonPath)) usage("missing course.json in " + sourceDir);
  const course = JSON.parse(fs.readFileSync(courseJsonPath, "utf8"));
  if (!course.slug) usage("course.json has no `slug`");
  if (!Array.isArray(course.modules)) usage("course.json has no `modules` array");

  const destSlugDir = path.join(COURSES_ROOT, course.slug);
  ensureDir(destSlugDir);

  fs.copyFileSync(courseJsonPath, path.join(destSlugDir, "course.json"));

  let chaptersWritten = 0;
  let chaptersSkipped = 0;
  let quizzesWritten = 0;
  const missing = [];

  for (const module_ of course.modules) {
    const moduleDir = pad2(module_.id) + "-" + module_.slug;
    const srcModuleDir = path.join(sourceDir, moduleDir);
    const destModuleDir = path.join(destSlugDir, moduleDir);

    ensureDir(destModuleDir);

    if (!fs.existsSync(srcModuleDir)) {
      missing.push("module dir " + moduleDir);
      continue;
    }

    for (const chapter of module_.chapters || []) {
      const chapterFilename = pad2(chapter.id) + "-" + chapter.slug;
      const srcMd = path.join(srcModuleDir, chapterFilename + ".md");
      const srcQuiz = path.join(srcModuleDir, chapterFilename + ".quiz.json");
      const destMd = path.join(destModuleDir, chapterFilename + ".md");
      const destQuiz = path.join(destModuleDir, chapterFilename + ".quiz.json");

      if (!fs.existsSync(srcMd)) {
        missing.push(moduleDir + "/" + chapterFilename + ".md");
        continue;
      }

      if (fs.existsSync(destMd)) {
        chaptersSkipped++;
      } else {
        const body = fs.readFileSync(srcMd, "utf8");
        const front = buildFrontMatter(course.slug, module_, chapter, moduleDir, chapterFilename);
        fs.writeFileSync(destMd, front + wrapBody(body));
        chaptersWritten++;
      }

      if (fs.existsSync(srcQuiz)) {
        const quizText = fs.readFileSync(srcQuiz, "utf8");
        JSON.parse(quizText); // validate
        fs.writeFileSync(destQuiz, normalizeTypography(quizText));
        quizzesWritten++;
      }
    }
  }

  const createdIndex = writePlaceholderIndex(destSlugDir, course);

  execFileSync("ruby", [SYNC_SCRIPT], { stdio: "inherit", cwd: ROOT });

  console.log("");
  console.log("Imported course: " + course.slug);
  console.log("  dest:     " + path.relative(ROOT, destSlugDir));
  console.log("  chapters: " + chaptersWritten + " written, " + chaptersSkipped + " already existed (left untouched)");
  console.log("  quizzes:  " + quizzesWritten + " refreshed");
  console.log("  index.md: " + (createdIndex ? "created (placeholder)" : "left untouched"));
  if (missing.length) {
    console.log("  missing:  " + missing.length + " (listed in course.json but not in source)");
    for (const m of missing) console.log("    - " + m);
  }
}

main();
