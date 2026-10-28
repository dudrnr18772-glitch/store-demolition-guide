/**
 * Read-only post-build audit for the curated SEO pages and retired URLs.
 * Run after npm run build: node scripts/check-focused-output.mjs
 * Does not change the sitemap, generated pages, or production deployment.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const site = 'https://store-demolition-guide.netlify.app';
const out = path.join(root, 'out');
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
const expanded = readJson('data/expanded-pages.json');
const regional = readJson('data/regional-pages.json');
const retired = readJson('data/retired-pages.json');
const activeSlugs = ['', 'regions', ...expanded.map(p => p.slug), ...regional.map(p => p.slug)];
const failures = [];

if (activeSlugs.length !== 22 || new Set(activeSlugs).size !== 22) {
  failures.push('Expected 22 unique curated paths, got ' + activeSlugs.length + ' (' + new Set(activeSlugs).size + ' unique)');
}
if (retired.length !== 9 || new Set(retired).size !== 9) {
  failures.push('Expected 9 unique retired paths, got ' + retired.length);
}

const desiredUrls = new Set(activeSlugs.map(slug => slug ? site + '/' + slug + '/' : site + '/'));
for (const slug of activeSlugs) {
  const html = path.join(out, slug, 'index.html');
  if (!fs.existsSync(html)) failures.push('Curated page missing in out/: ' + (slug || '/'));
}
for (const slug of retired) {
  if (activeSlugs.includes(slug)) failures.push('Retired slug reused by curated content: ' + slug);
  if (fs.existsSync(path.join(out, slug, 'index.html'))) failures.push('Retired page still generated: ' + slug);
}

const sitemapFile = path.join(out, 'sitemap.xml');
if (!fs.existsSync(sitemapFile)) {
  failures.push('out/sitemap.xml missing');
} else {
  const xml = fs.readFileSync(sitemapFile, 'utf8');
  const found = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(m => m[1].trim());
  if (found.length !== 22 || new Set(found).size !== found.length) {
    failures.push('Sitemap expected 22 unique URLs; found ' + found.length + ' (' + new Set(found).size + ' unique)');
  }
  for (const url of desiredUrls) if (!found.includes(url)) failures.push('Sitemap missing curated URL: ' + url);
  for (const url of found) if (!desiredUrls.has(url)) failures.push('Unexpected URL in sitemap: ' + url);
}

const robotsFile = path.join(out, 'robots.txt');
if (!fs.existsSync(robotsFile)) {
  failures.push('out/robots.txt missing');
} else {
  const robots = fs.readFileSync(robotsFile, 'utf8');
  if (!robots.includes('Sitemap: ' + site + '/sitemap.xml')) failures.push('robots.txt sitemap URL does not match production');
  for (const slug of retired) if (robots.includes('Disallow: /' + slug)) failures.push('robots.txt blocks retired slug and can hide 404: ' + slug);
}

if (failures.length) {
  console.error('Focused SEO output audit failed (' + failures.length + ' findings):\n- ' + failures.join('\n- '));
  process.exitCode = 1;
} else {
  console.log('Focused SEO output audit passed: ' + activeSlugs.length + ' curated URLs, ' + retired.length + ' retired URLs excluded.');
}
