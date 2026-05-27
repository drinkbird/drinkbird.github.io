#!/usr/bin/env node
// Convert a source image (PNG / JPG / WebP / AVIF / GIF / TIFF) into a
// pair of feature-image JPGs sized for a 710×360 CSS slot:
//
//   <basename>-1x.jpg   710×360   (standard-density displays)
//   <basename>-2x.jpg   1420×720  (retina / hi-DPI displays)
//
// The 1.972:1 aspect ratio matches the existing post / list layouts.
// `_includes/image-feature-*.html` look for the `-1x.` infix and emit a
// `srcset="... 1x, ... 2x"` pair when present.
//
// Usage:
//   npm run cover -- path/to/source.png
//   npm run cover -- path/to/source.png --quality 88
//   npm run cover -- path/to/source.png --position center
//   npm run cover -- path/to/source.png --size 1420x720
//
// --size sets the 2x output dimensions; the 1x is half each axis. Pass
// --no-2x to emit only the 1x file. Outputs are written next to the
// source and existing files are overwritten.
//
//   images/course-jekyll.png  ->  images/course-jekyll-1x.jpg
//                                 images/course-jekyll-2x.jpg

const path  = require("path");
const fs    = require("fs");
const sharp = require("sharp");

const DEFAULT_2X_WIDTH  = 1420;
const DEFAULT_2X_HEIGHT = 720;

function parseArgs(argv) {
  const args = {
    input:    null,
    quality:  88,
    position: "attention",
    width2x:  DEFAULT_2X_WIDTH,
    height2x: DEFAULT_2X_HEIGHT,
    emit2x:   true
  };
  for (let i = 0; i < argv.length; i++) {
    const v = argv[i];
    if (v === "--quality")       { args.quality  = parseInt(argv[++i], 10); }
    else if (v === "--position") { args.position = argv[++i]; }
    else if (v === "--no-2x")    { args.emit2x   = false; }
    else if (v === "--size") {
      const m = (argv[++i] || "").match(/^(\d+)x(\d+)$/i);
      if (!m) usage("--size must be WIDTHxHEIGHT, e.g. 1420x720");
      args.width2x  = parseInt(m[1], 10);
      args.height2x = parseInt(m[2], 10);
    }
    else if (!args.input && !v.startsWith("--")) { args.input = v; }
  }
  return args;
}

function usage(msg) {
  if (msg) console.error("Error: " + msg + "\n");
  console.error("Usage: npm run cover -- <path-to-image> [--quality 1-100] [--position attention|center|...] [--size WxH] [--no-2x]");
  console.error("  Default 2x output: " + DEFAULT_2X_WIDTH + "x" + DEFAULT_2X_HEIGHT + " (1x is half each axis)");
  process.exit(1);
}

async function renderVariant(input, output, width, height, position, quality) {
  await sharp(input)
    .resize(width, height, {
      fit: "cover",            // matching aspect ratio: clean resize; mismatch: crop to fill
      position: position,      // 'attention' = smart crop on salient region
      withoutEnlargement: false
    })
    .jpeg({ quality: quality, mozjpeg: true, progressive: true })
    .toFile(output);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.input) usage("missing input path");
  if (!fs.existsSync(args.input)) usage("file not found: " + args.input);
  if (!Number.isFinite(args.quality) || args.quality < 1 || args.quality > 100) {
    usage("--quality must be 1..100");
  }
  if (!Number.isFinite(args.width2x) || !Number.isFinite(args.height2x) || args.width2x < 2 || args.height2x < 2) {
    usage("--size dimensions must be positive integers >= 2");
  }

  const width1x  = Math.floor(args.width2x  / 2);
  const height1x = Math.floor(args.height2x / 2);

  const dir       = path.dirname(args.input);
  const base      = path.basename(args.input, path.extname(args.input));
  const output1x  = path.join(dir, base + "-1x.jpg");
  const output2x  = path.join(dir, base + "-2x.jpg");

  const meta = await sharp(args.input).metadata();
  const sourceBytes = fs.statSync(args.input).size;
  const fmt = (b) => (b / 1024).toFixed(1) + " KB";

  console.log("OK  " + args.input);
  console.log("    " + meta.width + "x" + meta.height + " " + (meta.format || "?") + ", " + fmt(sourceBytes));

  await renderVariant(args.input, output1x, width1x, height1x, args.position, args.quality);
  console.log(" -> " + output1x);
  console.log("    " + width1x + "x" + height1x + " jpg, " + fmt(fs.statSync(output1x).size) +
              " (quality " + args.quality + ", position " + args.position + ")");

  if (args.emit2x) {
    await renderVariant(args.input, output2x, args.width2x, args.height2x, args.position, args.quality);
    console.log(" -> " + output2x);
    console.log("    " + args.width2x + "x" + args.height2x + " jpg, " + fmt(fs.statSync(output2x).size) +
                " (quality " + args.quality + ", position " + args.position + ")");
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
