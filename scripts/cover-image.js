#!/usr/bin/env node
// Convert a source image (PNG / JPG / WebP / AVIF / GIF / TIFF) into a
// 710×360 JPG optimized for use as a blog-post or course cover image.
//
// Usage:
//   npm run cover -- path/to/source.png
//   npm run cover -- path/to/source.png --quality 88
//   npm run cover -- path/to/source.png --position center
//
// Output is written next to the source with `-0` appended to the basename
// and the extension forced to `.jpg`. Existing `*-0.jpg` files are
// overwritten.
//
//   images/course-jekyll.png  ->  images/course-jekyll-0.jpg

const path = require("path");
const fs   = require("fs");
const sharp = require("sharp");

const TARGET_WIDTH  = 710;
const TARGET_HEIGHT = 360;

function parseArgs(argv) {
  const args = { input: null, quality: 88, position: "attention" };
  for (let i = 0; i < argv.length; i++) {
    const v = argv[i];
    if (v === "--quality")  { args.quality  = parseInt(argv[++i], 10); }
    else if (v === "--position") { args.position = argv[++i]; }
    else if (!args.input && !v.startsWith("--")) { args.input = v; }
  }
  return args;
}

function usage(msg) {
  if (msg) console.error("Error: " + msg + "\n");
  console.error("Usage: npm run cover -- <path-to-image> [--quality 1-100] [--position attention|center|...]");
  console.error("  Output: <same-dir>/<basename>-0.jpg at " + TARGET_WIDTH + "×" + TARGET_HEIGHT);
  process.exit(1);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.input) usage("missing input path");
  if (!fs.existsSync(args.input)) usage("file not found: " + args.input);
  if (!Number.isFinite(args.quality) || args.quality < 1 || args.quality > 100) {
    usage("--quality must be 1..100");
  }

  const dir    = path.dirname(args.input);
  const base   = path.basename(args.input, path.extname(args.input));
  const output = path.join(dir, base + "-0.jpg");

  const meta = await sharp(args.input).metadata();
  await sharp(args.input)
    .resize(TARGET_WIDTH, TARGET_HEIGHT, {
      fit: "cover",            // matching aspect ratio: clean resize; mismatch: crop to fill
      position: args.position, // 'attention' = smart crop on salient region
      withoutEnlargement: false
    })
    .jpeg({ quality: args.quality, mozjpeg: true, progressive: true })
    .toFile(output);

  const sourceBytes = fs.statSync(args.input).size;
  const outBytes    = fs.statSync(output).size;
  const fmt = (b) => (b / 1024).toFixed(1) + " KB";
  console.log("OK  " + args.input);
  console.log("    " + meta.width + "x" + meta.height + " " + (meta.format || "?") + ", " + fmt(sourceBytes));
  console.log(" -> " + output);
  console.log("    " + TARGET_WIDTH + "x" + TARGET_HEIGHT + " jpg, " + fmt(outBytes) +
              " (quality " + args.quality + ", position " + args.position + ")");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
