#!/usr/bin/env node
// Run the site's multi-step npm workflows with platform-appropriate command
// shims. In particular, Windows uses npm.cmd and bundle.bat so PowerShell does
// not select unsigned npm.ps1/bundle.ps1 files.

const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const windows = process.platform === "win32";

function executable(name) {
  if (!windows) return name;
  if (name === "npm") return "npm.cmd";
  if (name === "bundle") return "bundle.bat";
  return name;
}

function run(name, args) {
  const command = executable(name);
  const child = spawnSync(command, args, {
    cwd: ROOT,
    stdio: "inherit",
    // Windows requires cmd.exe to execute .cmd/.bat command shims.
    shell: windows,
  });

  if (child.error) {
    console.error(`Failed to run ${command}: ${child.error.message}`);
    process.exit(1);
  }

  if (child.status !== 0) process.exit(child.status || 1);
}

function uglify() {
  run("npm", ["run", "uglify"]);
}

function jekyll(args) {
  run("bundle", ["exec", "jekyll", ...args]);
}

function pagefind() {
  run("npm", ["run", "pagefind"]);
}

const workflow = process.argv[2];

switch (workflow) {
  case "build":
    uglify();
    jekyll(["build"]);
    pagefind();
    break;
  case "build:drafts":
    uglify();
    jekyll(["build", "--drafts", "--future"]);
    pagefind();
    break;
  case "serve":
    uglify();
    jekyll(["build"]);
    pagefind();
    jekyll(["serve", "--skip-initial-build"]);
    break;
  case "serve:drafts":
    uglify();
    jekyll(["build", "--drafts", "--future"]);
    pagefind();
    jekyll(["serve", "--skip-initial-build", "--drafts", "--future"]);
    break;
  default:
    console.error("Usage: node scripts/run-workflow.js <build|build:drafts|serve|serve:drafts>");
    process.exit(1);
}
