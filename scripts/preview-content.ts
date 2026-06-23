import {
  getDescription,
  getDetailContent,
  getDisplayKeyword,
  getFaqItems,
  getHeroTitle,
  getRelatedAnchorText,
  getRelatedBadgeText,
  getRelatedPages,
  getTitle,
} from "../lib/detail-content";
import { getPublishedPages } from "../lib/pages";

function sampleBySlug<T extends { slug: string }>(items: T[], count: number) {
  const sorted = [...items].sort((a, b) => a.slug.localeCompare(b.slug));

  if (sorted.length <= count) return sorted;

  const step = (sorted.length - 1) / (count - 1);
  return Array.from({ length: count }, (_, index) => sorted[Math.round(index * step)]);
}

function clip(value: string, length: number) {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length > length
    ? `${normalized.slice(0, length)}...`
    : normalized;
}

function main() {
  const pages = getPublishedPages();
  const samples = sampleBySlug(pages, 10);

  for (const page of samples) {
    const content = getDetailContent(page);
    const faqs = getFaqItems(page);
    const relatedPages = getRelatedPages(page, pages);

    console.log("=".repeat(80));
    console.log(`slug: ${page.slug}`);
    console.log(`title: ${getTitle(page)}`);
    console.log(`description: ${getDescription(page)}`);
    console.log(`H1: ${getHeroTitle(page)}`);
    console.log(`display keyword: ${getDisplayKeyword(page)}`);
    console.log(`first paragraph: ${clip(content.summary[0] ?? "", 120)}`);
    console.log(`H2 (${content.sections.length}):`);
    for (const section of content.sections) {
      console.log(`- ${section.title}`);
    }
    console.log(`FAQ (${faqs.length}):`);
    for (const faq of faqs) {
      console.log(`- ${faq.question}`);
    }
    console.log("related anchors:");
    for (const [index, relatedPage] of relatedPages.slice(0, 6).entries()) {
      console.log(
        `- [${getRelatedBadgeText(page, relatedPage, index)}] ${getRelatedAnchorText(page, relatedPage)}`,
      );
    }
  }
}

main();
