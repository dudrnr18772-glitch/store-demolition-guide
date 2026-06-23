import {
  getCtaLeadText,
  getDetailContent,
  getDisplayKeyword,
  getFaqItems,
  getRelatedAnchorText,
  getRelatedPages,
} from "../lib/detail-content";
import { getPublishedPages } from "../lib/pages";
import {
  INTERNAL_GUIDE_SENTENCES,
  INTERNAL_GUIDE_VALUES,
} from "../lib/writing-guides";

const PROHIBITED_EXPLANATORY_PHRASES = [
  "이 글은",
  "이 페이지는",
  "기준으로 작성",
  "작성되었습니다",
  "제작자",
  "작성자",
  "콘텐츠 관점",
  "톤",
  "매너",
];

function firstChars(value: string, length: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, length);
}

function countOccurrences(text: string, keyword: string) {
  if (!keyword) return 0;
  return text.split(keyword).length - 1;
}

function addCount(map: Map<string, number>, value: string) {
  map.set(value, (map.get(value) ?? 0) + 1);
}

function mostRepeated(map: Map<string, number>) {
  return [...map.entries()].sort((a, b) => b[1] - a[1])[0] ?? ["", 0];
}

function main() {
  const pages = getPublishedPages();
  const errors: string[] = [];
  const h2Counts = new Map<string, number>();
  const firstParagraphStartCounts = new Map<string, number>();
  const faqQuestionCounts = new Map<string, number>();
  const ctaCounts = new Map<string, number>();
  const h2LengthCounts = new Map<string, number>();
  const faqLengthCounts = new Map<string, number>();
  const inboundLinkCounts = new Map<string, number>();

  for (const page of pages) {
    const keyword = getDisplayKeyword(page);
    const content = getDetailContent(page);
    const faqs = getFaqItems(page);
    const cta = getCtaLeadText(page);
    const relatedPages = getRelatedPages(page, pages);
    const h2Titles = content.sections.map((section) => section.title);
    const bodyText = [
      ...content.summary,
      ...content.sections.flatMap((section) => [
        section.title,
        ...(section.paragraphs ?? []),
        ...(section.items ?? []),
      ]),
      ...faqs.flatMap((item) => [item.question, item.answer]),
      cta,
    ].join("\n");
    const visibleText = [
      keyword,
      bodyText,
      ...relatedPages.map((target) => getRelatedAnchorText(page, target)),
    ].join("\n");

    for (const value of INTERNAL_GUIDE_VALUES) {
      if (value && visibleText.includes(value)) {
        errors.push(`${page.slug}: internal guide value exposed: ${value}`);
      }
    }

    for (const sentence of INTERNAL_GUIDE_SENTENCES) {
      if (sentence && visibleText.includes(sentence)) {
        errors.push(`${page.slug}: internal guide sentence exposed`);
      }
    }

    for (const phrase of PROHIBITED_EXPLANATORY_PHRASES) {
      if (visibleText.includes(phrase)) {
        errors.push(`${page.slug}: explanatory authoring phrase exposed: ${phrase}`);
      }
    }

    if (/[a-z]{3,}(동|구|역|읍|면)/i.test(visibleText)) {
      errors.push(`${page.slug}: romanized location is attached to Korean suffix`);
    }

    if (content.summary[0]) {
      addCount(firstParagraphStartCounts, firstChars(content.summary[0], 40));
    }

    addCount(ctaCounts, cta);
    addCount(h2LengthCounts, content.sections.length.toString());
    addCount(faqLengthCounts, faqs.length.toString());

    for (const title of h2Titles) {
      addCount(h2Counts, title);
    }

    for (const faq of faqs) {
      addCount(faqQuestionCounts, faq.question);
    }

    const keywordCount = countOccurrences(bodyText, keyword);
    if (keywordCount >= 8) {
      errors.push(`${page.slug}: main_keyword repeated too often in body (${keywordCount})`);
    }

    const h2WithKeywordCount = h2Titles.filter((title) =>
      title.includes(keyword),
    ).length;
    if (h2Titles.length > 0 && h2WithKeywordCount >= Math.ceil(h2Titles.length / 2)) {
      errors.push(`${page.slug}: main_keyword appears in too many H2 titles`);
    }

    if (relatedPages.length > 6) {
      errors.push(`${page.slug}: more than 6 related links`);
    }

    if (new Set(relatedPages.map((target) => target.slug)).size !== relatedPages.length) {
      errors.push(`${page.slug}: duplicate related links`);
    }

    if (relatedPages.some((target) => target.slug === page.slug)) {
      errors.push(`${page.slug}: self related link`);
    }

    for (const target of relatedPages) {
      const targetKeyword = getDisplayKeyword(target);
      const anchor = getRelatedAnchorText(page, target);
      inboundLinkCounts.set(
        target.slug,
        (inboundLinkCounts.get(target.slug) ?? 0) + 1,
      );

      if (anchor === targetKeyword) {
        errors.push(`${page.slug}: related anchor repeats target main_keyword only`);
      }

      if (!anchor.includes(targetKeyword)) {
        errors.push(`${page.slug}: related anchor does not include target main_keyword: ${target.slug}`);
      }
    }
  }

  const [topH2, topH2Count] = mostRepeated(h2Counts);
  const [topFirst, topFirstCount] = mostRepeated(firstParagraphStartCounts);
  const [topFaq, topFaqCount] = mostRepeated(faqQuestionCounts);
  const [topCta, topCtaCount] = mostRepeated(ctaCounts);

  if (topFirstCount >= 5) {
    errors.push(`First paragraph start repeated too often (${topFirstCount}): ${topFirst}`);
  }

  if (topH2Count >= 10) {
    errors.push(`H2 repeated too often (${topH2Count}): ${topH2}`);
  }

  if (topFaqCount >= 10) {
    errors.push(`FAQ question repeated too often (${topFaqCount}): ${topFaq}`);
  }

  if (topCtaCount >= 10) {
    errors.push(`CTA repeated too often (${topCtaCount}): ${topCta}`);
  }

  if (h2LengthCounts.size <= 1) {
    errors.push("All pages use the same H2 section count");
  }

  if (faqLengthCounts.size <= 1) {
    errors.push("All pages use the same FAQ count");
  }

  const isolatedPages = pages.filter(
    (page) => (inboundLinkCounts.get(page.slug) ?? 0) === 0,
  );
  if (isolatedPages.length > 0) {
    errors.push(
      `Pages without inbound internal links: ${isolatedPages
        .slice(0, 20)
        .map((page) => page.slug)
        .join(", ")}`,
    );
  }

  if (errors.length > 0) {
    throw new Error(errors.slice(0, 50).join("\n"));
  }

  console.log("Content quality check passed");
  console.log(`Checked pages: ${pages.length}`);
  console.log(`Most repeated H2: ${topH2Count}`);
  console.log(`Most repeated first paragraph start: ${topFirstCount}`);
  console.log(`Most repeated FAQ question: ${topFaqCount}`);
  console.log(`Most repeated CTA: ${topCtaCount}`);
  console.log(`Pages without inbound internal links: ${isolatedPages.length}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
