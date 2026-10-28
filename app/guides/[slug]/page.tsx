import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExpandedArticle from "@/components/ExpandedArticle";
import { expandedDescription, expandedImage, expandedKeywords, getExpandedPage, SITE_URL } from "@/lib/expanded-pages";
import "../../expanded.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return ["cost-checklist", "contract-checklist", "work-process", "waste-disposal", "closure-support"].map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getExpandedPage(`guides/${slug}`);
  if (!page) return { title: "찾을 수 없는 페이지" };
  const url = `${SITE_URL}/${page.slug}/`;
  return { title: `${page.title} | 원상복구 업체`, description: expandedDescription(page), keywords: expandedKeywords(page), alternates: { canonical: url },
    openGraph: { title: page.title, description: expandedDescription(page), url, siteName: "원상복구 업체", type: "article", locale: "ko_KR", images: [{ url: expandedImage(page), alt: `${page.keyword} 안내 이미지` }] },
    twitter: { card: "summary_large_image", title: page.title, description: expandedDescription(page), images: [expandedImage(page)] } };
}
export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const page = getExpandedPage(`guides/${slug}`);
  if (!page) notFound();
  return <ExpandedArticle page={page} />;
}
