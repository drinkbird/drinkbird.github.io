#!/usr/bin/env node
// Convert a source image (PNG / JPG / WebP / AVIF / GIF / TIFF) into a
// 1420×720 JPG optimized for use as a blog-post or course cover image.
//
// The 1420×720 default is 2× the previous 710×360 canonical size. It holds
// the same 1.972:1 aspect ratio (so existing layouts are unaffected) while
// exceeding LinkedIn's 1200px-width recommendation for full-banner link
// previews, and providing retina assets that browsers downscale on display.
//
// Usage:
//   npm run cover -- path/to/source.png
//   npm run cover -- path/to/source.png --quality 88
//   npm run cover -- path/to/source.png --position center
//   npm run cover -- path/to/source.png --size 1200x627
//
// Output is written next to the source with `-0` appended to the basename
// and the extension forced to `.jpg`. Existing `*-0.jpg` files are
// overwritten.
//
//   images/course-jekyll.png  ->  images/course-jekyll-0.jpg

const path  = require("path");
const fs    = require("fs");
const sharp = require("sharp");

const DEFAULT_WIDTH  = 1420;
const DEFAULT_HEIGHT = 720;

function parseArgs(argv) {
  const args = {
    input:    null,
    quality:  88,
    position: "attention",
    width:    DEFAULT_WIDTH,
    height:   DEFAULT_HEIGHT
  };
  for (let i = 0; i < argv.length; i++) {
    const v = argv[i];
    if (v === "--quality")       { args.quality  = parseInt(argv[++i], 10); }
    else if (v === "--position") { args.position = argv[++i]; }
    else if (v === "--size") {
      const m = (argv[++i] || "").match(/^(\d+)x(\d+)$/i);
      if (!m) usage("--size must be WIDTHxHEIGHT, e.g. 1420x720");
      args.width  = parseInt(m[1], 10);
      args.height = parseInt(m[2], 10);
    }
    else if (!args.input && !v.startsWith("--")) { args.input = v; }
  }
  return args;
}

function usage(msg) {
  if (msg) console.error("Error: " + msg + "\n");
  console.error("Usage: npm run cover -- <path-to-image> [--quality 1-100] [--position attention|center|...] [--size WxH]");
  console.error("  Default output: <same-dir>/<basename>-0.jpg at " + DEFAULT_WIDTH + "×" + DEFAULT_HEIGHT);
  process.exit(1);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.input) usage("missing input path");
  if (!fs.existsSync(args.input)) usage("file not found: " + args.input);
  if (!Number.isFinite(args.quality) || args.quality < 1 || args.quality > 100) {
    usage("--quality must be 1..100");
  }
  if (!Number.isFinite(args.width) || !Number.isFinite(args.height) || args.width < 1 || args.height < 1) {
    usage("--size dimensions must be positive integers");
  }

  const dir    = path.dirname(args.input);
  const base   = path.basename(args.input, path.extname(args.input));
  const output = path.join(dir, base + "-0.jpg");

  const meta = await sharp(args.input).metadata();
  await sharp(args.input)
    .resize(args.width, args.height, {
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
  console.log("    " + args.width + "x" + args.height + " jpg, " + fmt(outBytes) +
              " (quality " + args.quality + ", position " + args.position + ")");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
