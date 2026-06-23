/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import {
  getCtaLeadText,
  getCtaText,
  getDescription,
  getDetailContent,
  getDisplayKeyword,
  getFaqItems,
  getHeroTitle,
  getRelatedAnchorText,
  getRelatedBadgeText,
  getRelatedCardText,
  getRelatedPages,
  getTitle,
} from "@/lib/detail-content";
import { getPageBySlug, getPublishedPages } from "@/lib/pages";
import {
  CTA_URL,
  getAssetUrl,
  getPageUrl,
  LANDING_IMAGE,
  THUMBNAIL_IMAGE,
} from "@/lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPages().map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    return {
      title: "페이지를 찾을 수 없습니다 | 폐업 점포철거 안내",
    };
  }

  const title = getTitle(page);
  const description = getDescription(page);
  const url = getPageUrl(page.slug);
  const imageUrl = getAssetUrl(THUMBNAIL_IMAGE);
  const displayKeyword = getDisplayKeyword(page);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${displayKeyword} 안내 썸네일`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function CtaButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={CTA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
    >
      {children}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const allPages = getPublishedPages();
  const content = getDetailContent(page);
  const faqItems = getFaqItems(page);
  const relatedPages = getRelatedPages(page, allPages);
  const pageUrl = getPageUrl(page.slug);
  const title = getTitle(page);
  const description = getDescription(page);
  const displayKeyword = getDisplayKeyword(page);

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: pageUrl,
    image: getAssetUrl(THUMBNAIL_IMAGE),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: getPageUrl(""),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: displayKeyword,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fffc_0%,#ffffff_34%,#f3f8fb_100%)] text-slate-900">
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <header className="sticky top-0 z-50 border-b border-emerald-100/70 bg-white/85 shadow-sm shadow-emerald-950/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            폐업 점포철거 안내
          </Link>
          <CtaButton>{getCtaText(page)}</CtaButton>
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-5 py-12 md:py-16">
        <div className="mb-7 inline-flex rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
          원상복구 범위와 비용 기준 안내
        </div>

        <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-6xl md:leading-[1.04]">
          {getHeroTitle(page)}
        </h1>

        <div className="mt-7 max-w-3xl space-y-4 text-lg leading-9 text-slate-600">
          {content.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {content.layout.showTopCta ? (
          <section className="mt-9 rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:flex md:items-center md:justify-between md:gap-8 md:p-7">
            <p className="text-base leading-7 text-slate-700">
              {getCtaLeadText(page)}
            </p>
            <div className="mt-5 shrink-0 md:mt-0">
              <CtaButton>{getCtaText(page)}</CtaButton>
            </div>
          </section>
        ) : null}

        <section className="my-8 md:my-10">
          <img
            src={LANDING_IMAGE}
            alt={`${displayKeyword} 상세 안내 이미지`}
            className="h-auto w-full rounded-2xl border border-slate-200 shadow-sm"
            loading="eager"
          />
        </section>

        <div className="space-y-8">
          {content.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[2rem] border border-white/80 bg-white/78 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-8"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                {section.title}
              </h2>

              {section.paragraphs ? (
                <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : null}

              {section.items ? (
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-sm leading-7 text-slate-700"
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            {content.layout.faqTitle}
          </h2>
          <div className="mt-6 space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="font-semibold text-slate-950">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {relatedPages.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
              {content.layout.relatedTitle}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {relatedPages.map((relatedPage, index) => (
                <Link
                  key={relatedPage.slug}
                  href={`/${relatedPage.slug}/`}
                  className="group rounded-3xl border border-white/80 bg-white/75 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-200"
                >
                  <p className="text-sm font-semibold text-emerald-700">
                    {getRelatedBadgeText(page, relatedPage, index)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-950">
                    {getRelatedAnchorText(page, relatedPage)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {getRelatedCardText(relatedPage)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    {content.layout.relatedAction}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-12 overflow-hidden rounded-[2.2rem] bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.25),transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_54%,#064e3b_100%)] p-6 text-white shadow-[0_35px_110px_rgba(15,23,42,0.28)] md:p-9">
          <p className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            {getCtaLeadText(page)}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            철거비용, 원상복구 범위, 지원 가능성을 함께 확인하면 폐업
            일정에 맞춘 상담을 더 빠르게 진행할 수 있습니다.
          </p>
          <div className="mt-7">
            <CtaButton>{getCtaText(page)}</CtaButton>
          </div>
        </section>
      </article>
    </main>
  );
}
