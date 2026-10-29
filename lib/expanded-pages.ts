import rawPages from "@/data/expanded-pages.json";

export type ExpandedSection = {
  h: string;
  body: string;
  checks: string[];
};
export type ExpandedFaq = { q: string; a: string };
export type ExpandedTable = {
  heading: string;
  intro: string;
  columns: [string, string, string];
  rows: [string, string, string][];
  footnote: string;
};
export type ExpandedProcessFlow = {
  heading: string;
  steps: { title: string; detail: string }[];
};
export type ExpandedAnnouncement = {
  heading: string;
  text: string;
  checkedOn: string;
  sourceLabel: string;
  sourceUrl: string;
};
export type ExpandedReference = { label: string; url: string };
export type ExpandedPage = {
  slug: string;
  keyword: string;
  intent: string;
  title: string;
  lead: string;
  photo: "commercial" | "cafe" | "demolition";
  sections: ExpandedSection[];
  faqs: ExpandedFaq[];
  links: string[];
  detailTable?: ExpandedTable;
  processFlow?: ExpandedProcessFlow;
  announcement?: ExpandedAnnouncement;
  references?: ExpandedReference[];
};

export const expandedPages: ExpandedPage[] = rawPages as ExpandedPage[];
export const expandedMap = new Map(expandedPages.map((p) => [p.slug, p]));
export const SITE_URL = "https://store-demolition-guide.netlify.app";

export function getExpandedPage(slug: string) {
  return expandedMap.get(slug.replace(/^\/+|\/+$/g, ""));
}

export function expandedImage(page: ExpandedPage) {
  return `/assets/expanded-${page.photo}.webp`;
}

export function expandedDescription(page: ExpandedPage) {
  const description = page.lead.replace(/\s+/g, " ").trim();
  return description.length > 150 ? `${description.slice(0, 147).trimEnd()}…` : description;
}

export function expandedKeywords(page: ExpandedPage) {
  return [page.keyword, ...page.links.map((slug) => expandedMap.get(slug)?.keyword).filter((s): s is string => Boolean(s))];
}
