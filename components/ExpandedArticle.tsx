/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  expandedImage,
  expandedKeywords,
  expandedMap,
  SITE_URL,
  type ExpandedPage,
} from "@/lib/expanded-pages";
import { CTA_URL } from "@/lib/site";

function JsonLd({ value }: { value: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }}
    />
  );
}

export default function ExpandedArticle({ page }: { page: ExpandedPage }) {
  const pageUrl = `${SITE_URL}/${page.slug}/`;
  const related = page.links.map((slug) => expandedMap.get(slug)).filter((p): p is ExpandedPage => Boolean(p));
  const isSupport = page.keyword.includes("지원");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url:pageUrl,
        name: page.title,
        description: page.lead,
        inLanguage: "ko-KR",
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${expandedImage(page)}` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        keywords: expandedKeywords(page).join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "원상복구 업체", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: page.keyword, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <div className="ep-page">
      <JsonLd value={schema} />
      <header className="ep-header">
        <div className="ep-header-inner">
          <Link href="/" className="ep-brand" aria-label="원상복구 업체 홈페이지로">
            <img src="/brand/brand-mark.svg" width="39" height="39" alt="" aria-hidden="true" />
            <span>원상복구 업체</span>
          </Link>
          <nav className="ep-header-links" aria-label="사이트 바로가기">
            <Link href="/services/commercial-restoration/">서비스 안내</Link>
            <Link href="/guides/cost-checklist/">비용 안내</Link>
          </nav>
          <a className="ep-button ep-header-cta" href={CTA_URL} target="_blank" rel="noopener noreferrer">
            견적 상담 신청 <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main className="ep-container">
        <nav className="ep-breadcrumb" aria-label="현재 위치">
          <Link href="/">홈</Link><span aria-hidden="true">›</span><span>{page.keyword}</span>
        </nav>
        <section className="ep-hero" aria-labelledby="ep-page-title">
          <div className="ep-hero-body">
            <p className="ep-eyebrow">철거·원상복구 현장 안내</p>
            <h1 id="ep-page-title">{page.title}</h1>
            <p className="ep-lead">{page.lead}</p>
            <div className="ep-hero-actions">
              <a className="ep-button" href={CTA_URL} target="_blank" rel="noopener noreferrer">현장 견적 상담 <span aria-hidden="true">↗</span></a>
              <a className="ep-outline" href="#first-section">확인 사항 살펴보기 <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <img className="ep-hero-photo" src={expandedImage(page)} width="1422" height="928" alt={`${page.keyword} 관련 상가·철거 공간 참고 이미지`} loading="eager" fetchPriority="high" />
        </section>

        <figure className="ep-image-cta">
          <a href={CTA_URL} target="_blank" rel="noopener noreferrer" aria-label="철거 및 원상복구 견적 상담 신청 양식 열기">
            <img
              src="/assets/restoration-cta-936x7593.webp"
              width="936" height="7593" decoding="async" loading="lazy"
              alt="철거·원상복구 견적 상담 안내 이미지 — 누르면 상담 신청 양식으로 이동합니다"
            />
          </a>
        </figure>

        <div className="ep-body-layout">
          <article className="ep-article">
            {page.sections.map((section, i) => (
              <section className="ep-content-card" key={section.h} id={i === 0 ? "first-section" : `section-${i + 1}`}>
                <span className="ep-section-counter">{String(i + 1).padStart(2, "0")}</span>
                <h2>{section.h}</h2>
                {section.body.split(/\n\n+/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <div className="ep-checklist">
                  <h3>확인 체크리스트</h3>
                  <ul>{section.checks.map((check) => <li key={check}>{check}</li>)}</ul>
                </div>
              </section>
            ))}
            {isSupport && <p className="ep-support-note">지원사업은 모집 시기, 신청 자격과 공사 진행 단계에 따라 달라질 수 있습니다. 신청 가능 여부는 최신 공식 공고에서 확인하시기 바랍니다.</p>}
            <section className="ep-faq" id="faqs">
              <h2>{page.keyword} 자주 묻는 질문</h2>
              {page.faqs.map((faq) => (
                <div className="ep-qa" key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></div>
              ))}
            </section>
            <section className="ep-related" aria-labelledby="related-heading">
              <h2 id="related-heading">함께 확인하면 좋은 안내</h2>
              <div className="ep-related-grid">
                {related.map((item) => (
                  <Link href={`/${item.slug}/`} key={item.slug}>
                    <strong>{item.keyword}</strong><span>{item.title}</span><span className="ep-related-arrow">자세히 보기 ↗</span>
                  </Link>
                ))}
              </div>
            </section>
            <section className="ep-bottom-cta">
              <h2>현장 상황에 맞는 철거 범위와 견적을 확인하세요.</h2>
              <p>현장 사진, 철거 대상, 임대차계약의 반환 조건과 희망 공사일을 정리하면 상담에 도움이 됩니다.</p>
              <a href={CTA_URL} className="ep-button ep-button-light" target="_blank" rel="noopener noreferrer">원상복구 견적 상담 신청 ↗</a>
            </section>
          </article>
          <aside className="ep-side" aria-label="페이지 목차와 관련 안내">
            <div className="ep-side-card">
              <h3>{page.keyword} 확인 항목</h3>
              <ol>{page.sections.map((section, i) => <li key={section.h}><a href={i === 0 ? "#first-section" : `#section-${i + 1}`}>{section.h}</a></li>)}</ol>
            </div>
            <div className="ep-side-card">
              <h3>견적 상담 준비 자료</h3>
              <p>현장 전경과 설비 사진, 계약서 특약, 희망 공사일을 정리해 주세요.</p>
              <a className="ep-button" href={CTA_URL} target="_blank" rel="noopener noreferrer">견적 상담 신청 ↗</a>
            </div>
          </aside>
        </div>
      </main>
      <footer className="ep-footer"><Link href="/">원상복구 업체</Link><span>상가·점포·사무실 철거 및 원상복구 안내</span></footer>
    </div>
  );
}
