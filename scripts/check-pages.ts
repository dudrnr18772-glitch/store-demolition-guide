import fs from "node:fs";
import Papa from "papaparse";
import {
  isPublishedStatus,
  normalizeSlug,
  PAGES_CSV_PATH,
  REQUIRED_PAGE_COLUMNS,
} from "../lib/pages";

type RawRow = Record<string, unknown>;

function cell(value: unknown) {
  return String(value ?? "").trim();
}

function main() {
  if (!fs.existsSync(PAGES_CSV_PATH)) {
    throw new Error(`data/pages.csv 파일이 없습니다: ${PAGES_CSV_PATH}`);
  }

  const csv = fs.readFileSync(PAGES_CSV_PATH, "utf8");
  const parsed = Papa.parse<RawRow>(csv, {
    header: true,
    skipEmptyLines: "greedy",
  });

  if (parsed.errors.length > 0) {
    throw new Error(
      `CSV 파싱 오류:\n${parsed.errors
        .map((error) => `${error.row ?? "-"}행: ${error.message}`)
        .join("\n")}`,
    );
  }

  const fields = parsed.meta.fields ?? [];
  const missingColumns = REQUIRED_PAGE_COLUMNS.filter(
    (column) => !fields.includes(column),
  );

  if (missingColumns.length > 0) {
    throw new Error(`CSV 필수 컬럼 누락: ${missingColumns.join(", ")}`);
  }

  const missingSlugs: number[] = [];
  const missingKeywords: number[] = [];
  const slugMap = new Map<string, number[]>();
  let publishedCount = 0;
  let pendingCount = 0;

  parsed.data.forEach((row, index) => {
    const rowNumber = index + 2;
    const rawSlug = cell(row.slug);
    const keyword = cell(row.main_keyword);
    const status = cell(row.status);

    if (!rawSlug) missingSlugs.push(rowNumber);
    if (!keyword) missingKeywords.push(rowNumber);

    if (rawSlug) {
      const slug = normalizeSlug(rawSlug);
      const rows = slugMap.get(slug) ?? [];
      rows.push(rowNumber);
      slugMap.set(slug, rows);
    }

    if (isPublishedStatus(status)) {
      publishedCount += 1;
    } else {
      pendingCount += 1;
    }
  });

  const duplicateMessages = Array.from(slugMap.entries())
    .filter(([, rows]) => rows.length > 1)
    .map(([slug, rows]) => `${slug} (${rows.join(", ")}행)`);

  const errors: string[] = [];

  if (missingSlugs.length > 0) {
    errors.push(`slug 누락 행: ${missingSlugs.join(", ")}`);
  }

  if (missingKeywords.length > 0) {
    errors.push(`main_keyword 누락 행: ${missingKeywords.join(", ")}`);
  }

  if (duplicateMessages.length > 0) {
    errors.push(`slug 중복: ${duplicateMessages.join("; ")}`);
  }

  if (publishedCount === 0) {
    errors.push("발행 상태의 페이지가 0개입니다.");
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  console.log(`CSV check passed`);
  console.log(`Published pages: ${publishedCount}`);
  console.log(`Pending pages: ${pendingCount}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
