#!/usr/bin/env node
// Cross-platform local-development prerequisite check.

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const windows = process.platform === "win32";
let failed = false;

function executable(name) {
  if (!windows) return name;
  if (name === "npm") return "npm.cmd";
  if (name === "bundle") return "bundle.bat";
  if (name === "ridk") return "ridk.cmd";
  return name;
}

function run(name, args) {
  return spawnSync(executable(name), args, {
    cwd: ROOT,
    encoding: "utf8",
    // Windows needs cmd.exe to execute .cmd/.bat shims. Using those shims
    // avoids PowerShell's unsigned npm.ps1/bundle.ps1 execution-policy error.
    shell: windows,
  });
}

function result(ok, label, detail) {
  console.log(`${ok ? "OK  " : "FAIL"} ${label}${detail ? `: ${detail}` : ""}`);
  if (!ok) failed = true;
}

function version(name, args = ["--version"]) {
  const child = run(name, args);
  const detail = (child.stdout || child.stderr || "").trim().split(/\r?\n/)[0];
  result(child.status === 0, name, detail || "not found");
}

console.log(`Platform: ${process.platform} ${process.arch}`);
version("node");
version("npm");
version("ruby");
version("bundle");

if (windows) {
  version("ridk", ["version"]);
  const lock = fs.readFileSync(path.join(ROOT, "Gemfile.lock"), "utf8");
  result(lock.includes("x64-mingw-ucrt"), "Bundler Windows platform", "x64-mingw-ucrt");
}

const npmCheck = run("npm", ["ls", "--depth=0"]);
result(npmCheck.status === 0, "npm dependencies", npmCheck.status === 0 ? "installed" : "run the platform setup steps");

const bundleCheck = run("bundle", ["check"]);
result(bundleCheck.status === 0, "Ruby gems", bundleCheck.status === 0 ? "installed" : "run bundle install");

if (failed) {
  console.error("\nEnvironment is not ready. See README.md > Local development.");
  process.exit(1);
}

console.log("\nEnvironment is ready.");
