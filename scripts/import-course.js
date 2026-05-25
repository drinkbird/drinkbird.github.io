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
// so the blog has no JSON intermediate. Chapter md carries only chapter-
// unique data; everything shared at course or module level lives on the
// course's index.md, and everything derivable from page.path is derived at
// render time via _includes/course-page-context.html.
//
//   index.md (course-level):  layout, course_slug, permalink, title, image,
//                             description, last_updated, depth, goal,
//                             time_budget, created_at, producer (optional),
//                             modules: [ {id, slug, dir, title, summary,
//                             learning_objectives} ]
//   chapter md (lean):        chapter_id, chapter_slug, chapter_title,
//                             chapter_summary
//   chapter quiz:             written straight to
//                             _data/quizzes/<slug>/<module-dir>/<chapter-filename>.json
//                             (Jekyll only loads JSON into site.data from
//                             _data/, and the chapter layout reads it as
//                             site.data.quizzes[slug][module_dir][chapter_filename])
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
// Usage:
//   npm run import-course -- /absolute/path/to/source-course-dir

const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const COURSES_ROOT = path.join(ROOT, "_courses");
const DATA_QUIZZES = path.join(ROOT, "_data", "quizzes");

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

// Lean chapter front matter: only fields that are unique to this chapter.
// Course-level + module-level metadata lives on the course's index.md
// (modules: array); everything else is derivable from page.path at render
// time via _includes/course-page-context.html.
function buildChapterFrontMatter(chapter) {
  const lines = [
    "---",
    "chapter_id: " + chapter.id,
    "chapter_slug: " + chapter.slug,
    "chapter_title: " + yamlString(normalize(chapter.title)),
  ];
  if (chapter.summary) {
    lines.push("chapter_summary: " + yamlString(normalize(chapter.summary)));
  }
  lines.push("---", "", "");
  return lines.join("\n");
}

// Strip the leading `# Chapter Title` H1 and the immediately-following
// `> Module X · Chapter Y - Module title` blockquote, both of which are now
// rendered from the layout off front matter (so the body would otherwise show
// duplicate headers). Bounded to the very start of body content (after blanks
// and an optional `{% raw %}` opener) - idempotent and safe against stray
// `# ...` or `> ...` lines later in the body (code blocks, examples).
function stripBodyHeader(body) {
  const lines = body.split("\n");
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;
  if (i < lines.length && /^\{%\s*raw\s*%\}\s*$/.test(lines[i])) {
    i++;
    while (i < lines.length && lines[i].trim() === "") i++;
  }
  if (i >= lines.length || !/^#\s+/.test(lines[i])) return body;
  const h1Idx = i;
  i++;
  while (i < lines.length && lines[i].trim() === "") i++;
  if (i < lines.length && /^>\s+/.test(lines[i])) {
    i++;
    if (i < lines.length && lines[i].trim() === "") i++;
  }
  return lines.slice(0, h1Idx).concat(lines.slice(i)).join("\n");
}

function wrapBody(body) {
  const stripped = stripBodyHeader(body);
  const trimmed = stripped.replace(/^﻿/, "").replace(/\s+$/g, "");
  const normalized = normalize(trimmed);
  if (/\{%\s*(raw|endraw)\s*%\}/.test(normalized)) {
    return normalized + "\n";
  }
  return "{% raw %}\n" + normalized + "\n{% endraw %}\n";
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// index.md carries the full course-level metadata AND the modules: array
// (structural data that the templates iterate). On a first import it is
// generated; on subsequent imports it is left alone so hand-edits survive.
// To refresh the modules array after Sapling has changed, delete index.md
// and re-run.
function buildModulesYaml(modules) {
  const lines = ["modules:"];
  for (const m of modules) {
    const moduleDir = pad2(m.id) + "-" + m.slug;
    lines.push("  - id: " + m.id);
    lines.push("    slug: " + m.slug);
    lines.push("    dir: " + moduleDir);
    lines.push("    title: " + yamlString(normalize(m.title)));
    if (m.summary) lines.push("    summary: " + yamlString(normalize(m.summary)));
    if (Array.isArray(m.learning_objectives) && m.learning_objectives.length > 0) {
      lines.push("    learning_objectives:");
      for (const lo of m.learning_objectives) {
        lines.push("      - " + yamlString(normalize(lo)));
      }
    }
  }
  return lines.join("\n");
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
  lines.push(buildModulesYaml(course.modules || []));
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

    const destQuizModuleDir = path.join(DATA_QUIZZES, course.slug, moduleDir);
    ensureDir(destQuizModuleDir);

    for (const chapter of module_.chapters || []) {
      const chapterFilename = pad2(chapter.id) + "-" + chapter.slug;
      const srcMd = path.join(srcModuleDir, chapterFilename + ".md");
      const srcQuiz = path.join(srcModuleDir, chapterFilename + ".quiz.json");
      const destMd = path.join(destModuleDir, chapterFilename + ".md");
      const destQuiz = path.join(destQuizModuleDir, chapterFilename + ".json");

      if (!fs.existsSync(srcMd)) {
        missing.push(moduleDir + "/" + chapterFilename + ".md");
        continue;
      }

      if (fs.existsSync(destMd)) {
        chaptersSkipped++;
      } else {
        const body = fs.readFileSync(srcMd, "utf8");
        const front = buildChapterFrontMatter(chapter);
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
