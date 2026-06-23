import fs from "node:fs";
import path from "node:path";
import { getPublishedPages } from "../lib/pages";

function assertFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }
}

function main() {
  const outDir = path.join(process.cwd(), "out");

  if (!fs.existsSync(outDir)) {
    throw new Error("out 폴더가 없습니다. npm run build를 먼저 실행하세요.");
  }

  assertFile(path.join(outDir, "index.html"));
  assertFile(path.join(outDir, "sitemap.xml"));
  assertFile(path.join(outDir, "robots.txt"));

  const pages = getPublishedPages();
  const missingPages = pages
    .map((page) => path.join(outDir, page.slug, "index.html"))
    .filter((filePath) => !fs.existsSync(filePath));

  if (missingPages.length > 0) {
    throw new Error(`누락된 상세페이지 HTML:\n${missingPages.join("\n")}`);
  }

  console.log(`Output check passed`);
  console.log(`Static detail pages: ${pages.length}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
