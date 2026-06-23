import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import { stripSlashes } from "./site";

export const PAGES_CSV_PATH = path.join(process.cwd(), "data", "pages.csv");

export const REQUIRED_PAGE_COLUMNS = [
  "status",
  "slug",
  "main_keyword",
  "content_angle",
  "tone",
  "manner",
] as const;

export type PageStatus = "발행" | "publish" | string;

export type PageRecord = {
  status: PageStatus;
  slug: string;
  main_keyword: string;
  content_angle: string;
  tone: string;
  manner: string;
  extra: Record<string, string>;
};

type RawPageRecord = Record<string, unknown>;

function normalizeCell(value: unknown) {
  return String(value ?? "").trim();
}

export function normalizeSlug(slug: string) {
  const cleanSlug = stripSlashes(slug);

  if (cleanSlug.includes("/")) {
    throw new Error(
      `slug는 단일 URL 세그먼트여야 합니다. 중간에 /가 포함된 slug: ${slug}`,
    );
  }

  return cleanSlug;
}

export function isPublishedStatus(status: string) {
  const normalized = status.trim().toLowerCase();
  return normalized === "발행" || normalized === "publish";
}

export function parsePagesCsv(csv: string): PageRecord[] {
  const parsed = Papa.parse<RawPageRecord>(csv, {
    header: true,
    skipEmptyLines: "greedy",
  });

  if (parsed.errors.length > 0) {
    const messages = parsed.errors
      .map((error) => `${error.row ?? "-"}행: ${error.message}`)
      .join("\n");
    throw new Error(`CSV 파싱 오류가 있습니다.\n${messages}`);
  }

  const fields = parsed.meta.fields ?? [];
  const missingColumns = REQUIRED_PAGE_COLUMNS.filter(
    (column) => !fields.includes(column),
  );

  if (missingColumns.length > 0) {
    throw new Error(`CSV 필수 컬럼 누락: ${missingColumns.join(", ")}`);
  }

  const rows = parsed.data
    .map((row) => {
      const extra = Object.fromEntries(
        Object.entries(row)
          .filter(
            ([key]) => !(REQUIRED_PAGE_COLUMNS as readonly string[]).includes(key),
          )
          .map(([key, value]) => [key, normalizeCell(value)])
          .filter(([, value]) => value),
      );

      return {
        status: normalizeCell(row.status),
        slug: normalizeSlug(normalizeCell(row.slug)),
        main_keyword: normalizeCell(row.main_keyword),
        content_angle: normalizeCell(row.content_angle),
        tone: normalizeCell(row.tone),
        manner: normalizeCell(row.manner),
        extra,
      };
    })
    .filter((row) => row.slug && row.main_keyword);

  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const row of rows) {
    if (seen.has(row.slug)) {
      duplicates.add(row.slug);
    }
    seen.add(row.slug);
  }

  if (duplicates.size > 0) {
    throw new Error(`중복 slug가 있습니다: ${Array.from(duplicates).join(", ")}`);
  }

  return rows;
}

export function getAllPages() {
  if (!fs.existsSync(PAGES_CSV_PATH)) {
    throw new Error(
      `CSV 파일이 없습니다: ${PAGES_CSV_PATH}. npm run download:pages를 먼저 실행하세요.`,
    );
  }

  const csv = fs.readFileSync(PAGES_CSV_PATH, "utf8");
  return parsePagesCsv(csv);
}

export function getPublishedPages() {
  return getAllPages().filter((page) => isPublishedStatus(page.status));
}

export function getPageBySlug(slug: string) {
  const cleanSlug = normalizeSlug(slug);
  return getPublishedPages().find((page) => page.slug === cleanSlug) ?? null;
}
