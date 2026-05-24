#!/usr/bin/env node
// Import a course produced by an external authoring tool into this Jekyll
// blog. The source is a course directory shaped as:
//
//   <source>/course.json
//   <source>/<NN>-<module-slug>/<NN>-<chapter-slug>.md
//   <source>/<NN>-<module-slug>/<NN>-<chapter-slug>.quiz.json
//
// course.json is read for metadata only - it is NOT copied into the blog.
// Course / module / chapter metadata is materialised onto Jekyll front matter
// so the blog has a single source per file and no JSON intermediate:
//
//   index.md (course-level): layout, course_slug, permalink, title, image,
//                            description, last_updated, depth, goal,
//                            time_budget, created_at
//   chapter md (every):      course_slug, module_slug, chapter_slug,
//                            module_dir, chapter_filename, module_id,
//                            chapter_id, module_title, chapter_title,
//                            chapter_summary
//   chapter md (chapter 1):  + module_summary, module_learning_objectives
//
// Bodies are wrapped in {% raw %}...{% endraw %} so Liquid syntax in prose
// renders literally; the wrap is skipped if the body already contains raw
// tags of its own (chapters teaching Liquid) - Liquid does not nest raw.
//
// Re-import policy (idempotent and additive for content the author may have
// hand-corrected after a previous import):
//   - chapter .md:     written only if the file does not yet exist
//   - chapter quiz:    refreshed every run (small, no hand-edits expected)
//   - index.md:        written only on first import; left alone afterwards
//
// To force a refresh of a specific chapter, delete the destination file first
// (or fix the authoring tool upstream and re-import).
//
// After copying files the script runs `ruby scripts/sync-courses-data.rb` so
// `_data/quizzes/` reflects the new content. (Course metadata no longer needs
// data-mirroring - it's read directly from front matter.)
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

// Match the blog's typographic convention: em-dash (—) becomes a plain
// hyphen (-). Applied to chapter prose, quiz JSON, and any prose strings
// going into front matter.
function normalize(s) {
  return String(s).replace(/—/g, "-");
}

function yamlArrayLines(key, items) {
  const out = [key + ":"];
  for (const item of items) out.push("  - " + yamlString(normalize(item)));
  return out.join("\n");
}

function buildChapterFrontMatter(course, module_, chapter, moduleDir, chapterFilename) {
  const lines = [
    "---",
    "course_slug: " + course.slug,
    "module_slug: " + module_.slug,
    "chapter_slug: " + chapter.slug,
    "module_dir: " + moduleDir,
    "chapter_filename: " + chapterFilename,
    "module_id: " + module_.id,
    "chapter_id: " + chapter.id,
    "module_title: " + yamlString(normalize(module_.title)),
    "chapter_title: " + yamlString(normalize(chapter.title)),
  ];
  if (chapter.summary) {
    lines.push("chapter_summary: " + yamlString(normalize(chapter.summary)));
  }
  // Module-level metadata lives on chapter 1 of each module (the
  // representative pattern), so course-index and sidebar templates can read
  // it without duplicating across every chapter in the module.
  if (chapter.id === 1) {
    if (module_.summary) {
      lines.push("module_summary: " + yamlString(normalize(module_.summary)));
    }
    if (Array.isArray(module_.learning_objectives) && module_.learning_objectives.length > 0) {
      lines.push(yamlArrayLines("module_learning_objectives", module_.learning_objectives));
    }
  }
  lines.push("---", "", "");
  return lines.join("\n");
}

function wrapBody(body) {
  const trimmed = body.replace(/^﻿/, "").replace(/\s+$/g, "");
  const normalized = normalize(trimmed);
  if (/\{%\s*(raw|endraw)\s*%\}/.test(normalized)) {
    return normalized + "\n";
  }
  return "{% raw %}\n" + normalized + "\n{% endraw %}\n";
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writePlaceholderIndex(destSlugDir, course) {
  const indexPath = path.join(destSlugDir, "index.md");
  if (fs.existsSync(indexPath)) return false;
  const title = course.topic || course.slug;
  const today = new Date().toISOString().slice(0, 10);
  const goal = (course.answers && course.answers.goal) || "Course overview.";
  const lines = [
    "---",
    "layout: course-index",
    "course_slug: " + course.slug,
    "permalink: /courses/" + course.slug + "/",
    "title: " + yamlString(normalize(title)),
    "image: " + course.slug + ".jpg",
    "description: " + yamlString(normalize(goal)),
    "last_updated: " + today,
  ];
  if (course.depth) lines.push("depth: " + course.depth);
  lines.push("goal: " + yamlString(normalize(goal)));
  if (course.answers && course.answers.time_budget) {
    lines.push("time_budget: " + yamlString(course.answers.time_budget));
  }
  if (course.created_at) lines.push("created_at: " + course.created_at);
  lines.push("---", "", goal, "");
  fs.writeFileSync(indexPath, lines.join("\n"));
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
        const front = buildChapterFrontMatter(course, module_, chapter, moduleDir, chapterFilename);
        fs.writeFileSync(destMd, front + wrapBody(body));
        chaptersWritten++;
      }

      if (fs.existsSync(srcQuiz)) {
        const quizText = fs.readFileSync(srcQuiz, "utf8");
        JSON.parse(quizText); // validate
        fs.writeFileSync(destQuiz, normalize(quizText));
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
