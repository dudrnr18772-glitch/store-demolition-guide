import fs from "node:fs/promises";
import path from "node:path";
import Papa from "papaparse";
import { GOOGLE_SHEET_CSV_URL } from "../lib/site";
import { REQUIRED_PAGE_COLUMNS } from "../lib/pages";

async function main() {
  if (!GOOGLE_SHEET_CSV_URL) {
    throw new Error("GOOGLE_SHEET_CSV_URL 환경변수가 비어 있습니다.");
  }

  const response = await fetch(GOOGLE_SHEET_CSV_URL);

  if (!response.ok) {
    throw new Error(
      `CSV 다운로드 실패: ${response.status} ${response.statusText}`,
    );
  }

  const csv = await response.text();
  const trimmed = csv.trim();

  if (!trimmed) {
    throw new Error("CSV 응답이 비어 있습니다.");
  }

  if (/^<!doctype html/i.test(trimmed) || /^<html/i.test(trimmed)) {
    throw new Error(
      "CSV 대신 HTML 페이지가 응답되었습니다. 구글 스프레드시트 공개 CSV URL을 확인하세요.",
    );
  }

  const parsed = Papa.parse(csv, {
    header: true,
    preview: 1,
    skipEmptyLines: "greedy",
  });
  const fields = parsed.meta.fields ?? [];
  const missingColumns = REQUIRED_PAGE_COLUMNS.filter(
    (column) => !fields.includes(column),
  );

  if (missingColumns.length > 0) {
    throw new Error(`CSV 필수 컬럼 누락: ${missingColumns.join(", ")}`);
  }

  const dataDir = path.join(process.cwd(), "data");
  const outputPath = path.join(dataDir, "pages.csv");

  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(outputPath, csv, "utf8");

  console.log(`CSV downloaded: ${outputPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
