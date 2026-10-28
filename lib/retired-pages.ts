import retired from "@/data/retired-pages.json";

/** Pages intentionally removed from publication. Archived CSV rows must not generate URLs. */
export const retiredPageSlugs = new Set<string>(retired as string[]);
export function isRetiredPage(slug: string): boolean {
  return retiredPageSlugs.has(slug.replace(/^\/+|\/+$/g, ""));
}
