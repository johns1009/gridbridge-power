"use strict";
// Basic static checks for the GridBridge Power site. Run: node validate.js
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = __dirname;
const errors = [];
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");

for (const id of ["main", "top", "behind-the-meter", "substation", "how-it-works", "who-we-serve", "landowners", "why-gridbridge", "role", "contact", "contact-form", "nav-menu", "year"]) {
  if (!html.includes('id="' + id + '"')) errors.push("Missing id: " + id);
}
for (const t of ["<header", "<main", "<footer", "<nav", 'lang="en"', "Skip to content"]) {
  if (!html.includes(t)) errors.push("Missing landmark/a11y token: " + t);
}
for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const h = m[1];
  if (/^(https?:|mailto:|#)/i.test(h)) continue;
  if (!fs.existsSync(path.join(root, h.split(/[?#]/)[0]))) errors.push("Broken local asset: " + h);
}
for (const m of html.matchAll(/<img\b[^>]*>/g)) {
  if (!/\balt="/.test(m[0])) errors.push("Image missing alt: " + m[0]);
}
const count = (s, c) => s.split(c).length - 1;
if (count(css, "{") !== count(css, "}")) errors.push("CSS brace mismatch");
try { execFileSync(process.execPath, ["--check", path.join(root, "script.js")], { stdio: "pipe" }); }
catch (e) { errors.push("script.js syntax error: " + e.stderr); }
if (/equipment sales|transformer supply|commercial proposal/i.test(html)) errors.push("Equipment-sales content found");

const email = (js.match(/var CONTACT_EMAIL = "([^"]+)"/) || [])[1];
if (!email) errors.push("CONTACT_EMAIL constant not found in script.js");

if (errors.length) {
  console.error("VALIDATION FAILED");
  errors.forEach((e) => console.error(" - " + e));
  process.exit(1);
}
console.log("VALIDATION PASSED");
if (/example\.com$/.test(email)) console.log(" ! PLACEHOLDER: CONTACT_EMAIL is still " + email + " (set it in script.js)");
