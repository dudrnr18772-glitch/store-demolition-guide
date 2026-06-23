import fs from "node:fs/promises";
import path from "node:path";
import { getPublishedPages } from "../lib/pages";
import { getPageUrl, SITE_URL } from "../lib/site";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  const siteUrl = SITE_URL.replace(/\/+$/g, "");
  const pages = getPublishedPages();
  const urls = [`${siteUrl}/`, ...pages.map((page) => getPageUrl(page.slug))];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
    .join("\n")}\n</urlset>\n`;

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
  await fs.writeFile(path.join(publicDir, "robots.txt"), robots, "utf8");

  console.log(`Generated public/sitemap.xml with ${urls.length} URLs`);
  console.log("Generated public/robots.txt");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
