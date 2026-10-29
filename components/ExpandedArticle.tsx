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
            {page.announcement && (
              <div className="ep-official-alert" role="note" aria-label="지원사업 최신 접수 상태">
                <strong>{page.announcement.heading}</strong>
                <p>{page.announcement.text}</p>
                <div className="ep-official-meta">
                  <span>확인일: {page.announcement.checkedOn}</span>
                  <a href={page.announcement.sourceUrl} target="_blank" rel="noopener noreferrer">{page.announcement.sourceLabel} ↗</a>
                </div>
              </div>
            )}
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
            {page.processFlow && (
              <section className="ep-content-card ep-process" aria-labelledby="process-flow-heading">
                <h2 id="process-flow-heading">{page.processFlow.heading}</h2>
                <ol className="ep-process-steps">
                  {page.processFlow.steps.map((step, i) => (
                    <li key={step.title}>
                      <span className="ep-step-number">{String(i + 1).padStart(2, "0")}</span>
                      <strong>{step.title}</strong>
                      <p>{step.detail}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}
            {page.detailTable && (
              <section className="ep-content-card ep-comparison" aria-labelledby="comparison-heading">
                <h2 id="comparison-heading">{page.detailTable.heading}</h2>
                <p>{page.detailTable.intro}</p>
                <div className="ep-table-scroll">
                  <table>
                    <thead><tr>{page.detailTable.columns.map((heading) => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
                    <tbody>{page.detailTable.rows.map((row, i) => (
                      <tr key={i}>{row.map((value, j) => j === 0 ? <th scope="row" key={j}>{value}</th> : <td key={j}>{value}</td>)}</tr>
                    ))}</tbody>
                  </table>
                </div>
                <p className="ep-table-footnote">{page.detailTable.footnote}</p>
              </section>
            )}
            {isSupport && <p className="ep-support-note">2026년 희망리턴패키지 점포철거비 신규 신청은 10월 21일 18:00에 마감됐습니다. 이후 공고의 신청 자격과 접수 기간은 담당 기관의 최신 안내에서 확인하세요.</p>}
            {page.references?.length ? (
              <section className="ep-content-card ep-references">
                <h2>관련 공공기관 자료</h2>
                <ul>{page.references.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul>
              </section>
            ) : null}
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
