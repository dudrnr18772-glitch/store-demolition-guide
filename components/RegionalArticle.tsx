/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import {CTA_URL} from '@/lib/site';
import {REGION_SITE, type RegionalPage} from '@/lib/regional-pages';

const regionHero=(page:RegionalPage)=>`/assets/${page.hero}`;
function JsonLd({data}:{data:unknown}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>;}

export default function RegionalArticle({page}:{page:RegionalPage}){
 const pageUrl=`${REGION_SITE}/${page.slug}/`;
 const schema={"@context":"https://schema.org","@graph":[
  {"@type":"WebPage","@id":`${pageUrl}#webpage`,url:pageUrl,name:page.title,description:page.description,inLanguage:'ko-KR',isPartOf:{"@id":`${REGION_SITE}/#website`},primaryImageOfPage:{"@type":"ImageObject",url:`${REGION_SITE}${regionHero(page)}`}},
  {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem",position:1,name:'원상복구 업체',item:`${REGION_SITE}/`},{"@type":"ListItem",position:2,name:page.keyword,item:pageUrl}]},
  {"@type":"FAQPage","mainEntity":page.faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}
 ]};
 return <div className="rp-page">
  <JsonLd data={schema}/>
  <a className="rp-skip" href="#regional-content">본문으로 이동</a>
  <header className="rp-header"><div className="rp-wrap rp-header-inner">
   <Link href="/" className="rp-brand"><img src="/brand/brand-mark.svg" alt="" width={40} height={40}/><span>원상복구 업체</span></Link>
   <nav aria-label="주요 안내" className="rp-head-nav"><Link href="/">홈</Link><Link href="/regions/">지역별 안내</Link><Link href="/services/commercial-restoration/">서비스 안내</Link></nav>
   <a className="rp-btn rp-btn-small" href={CTA_URL} target="_blank" rel="noopener noreferrer">견적 상담 신청 ↗</a>
  </div></header>
  <main id="regional-content" className="rp-wrap">
   <nav className="rp-crumb" aria-label="현재 위치"><Link href="/">홈</Link> <span>›</span> <Link href="/regions/">지역별 철거·원상복구</Link> <span>›</span> {page.city} <span>›</span> {page.keyword}</nav>
   <section className="rp-hero" aria-labelledby="regional-page-title">
    <div className="rp-hero-body"><p className="rp-over">{page.badge} · {page.city}</p><h1 id="regional-page-title">{page.title}</h1><p className="rp-lead">{page.intro}</p>
     <div className="rp-chips">{page.focus.map((x)=><span key={x}>{x}</span>)}</div><a className="rp-btn" href={CTA_URL} target="_blank" rel="noopener noreferrer">현장 원상복구 견적 상담 ↗</a>
    </div>
    <div className="rp-hero-visual"><img src={regionHero(page)} alt={page.visualAlt} width={1422} height={928} decoding="async" fetchPriority="high"/><span>{page.micro} · 공간 이해용 이미지</span></div>
   </section>
   <div className="rp-points">{page.focus.map((x,i)=><div key={x}><b>{String(i+1).padStart(2,'0')}</b><span>{x}</span></div>)}</div>
   <div className="rp-layout"><article className="rp-main">
    <div className="rp-summary"><strong>{page.keyword} 핵심부터 확인하세요</strong><p>{page.summary}</p></div>
    <figure className="rp-image-cta"><a href={CTA_URL} target="_blank" rel="noopener noreferrer" aria-label="철거 견적 상담 신청 양식 열기"><img src="/assets/restoration-cta-936x7593.webp" width={936} height={7593} loading="lazy" decoding="async" alt="철거 및 원상복구 견적 상담 안내 이미지. 이미지를 누르면 상담 신청 페이지로 이동합니다."/></a><figcaption>이미지를 누르면 견적 상담 신청 페이지로 이동합니다.</figcaption></figure>
    <section id="rp-local" className="rp-card"><div className="rp-count">01 · 지역과 현장 유형</div><h2>{page.local.heading}</h2>{page.local.paras.map((t,i)=><p key={i}>{t}</p>)}<h3>먼저 확인할 사항</h3><ul className="rp-checks">{page.local.checks.map(x=><li key={x}>{x}</li>)}</ul></section>
    {page.sections.map(([h,paras,checks],i)=><section className="rp-card" id={`rp-section-${i+1}`} key={h}><div className="rp-count">{String(i+2).padStart(2,'0')} · 현장 확인</div><h2>{h}</h2>{paras.map((t,j)=><p key={j}>{t}</p>)}<h3>현장 체크리스트</h3><ul className="rp-checks">{checks.map(x=><li key={x}>{x}</li>)}</ul></section>)}
    <section id="rp-estimate" className="rp-card"><div className="rp-count">견적 비교</div><h2>{page.keyword} 유형별 견적 비교표</h2><p>철거 범위와 반출 여건, 인도 기준이 다르면 면적이 같아도 견적이 달라질 수 있습니다. 아래 항목을 기준으로 동일한 조건의 견적을 요청해 보세요.</p><div className="rp-table-wrap"><table><thead><tr><th>구분</th><th>견적 요청 항목</th><th>추가 확인 사항</th></tr></thead><tbody>{page.matrix.map(([a,b,c])=><tr key={a}><td><strong>{a}</strong></td><td>{b}</td><td>{c}</td></tr>)}</tbody></table></div></section>
    <section id="rp-faq" className="rp-card"><div className="rp-count">자주 묻는 질문</div><h2>{page.keyword} FAQ</h2><dl className="rp-faqs">{page.faqs.map(([q,a])=><div key={q}><dt>{q}</dt><dd>{a}</dd></div>)}</dl></section>
    <section className="rp-card"><h2>함께 확인하면 좋은 안내</h2><div className="rp-related">{page.links.map(([name,target])=><Link key={target} href={`/${target.replace(/^\/+/, '')}`}><strong>{name}</strong><span>관련 정보 확인 ↗</span></Link>)}</div></section>
    <section className="rp-card rp-sources"><strong>지역 특성 확인에 참고한 공개 자료</strong><ul>{page.sources.map(([name,url])=><li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{name} ↗</a></li>)}</ul></section>
   </article>
   <aside className="rp-aside"><div className="rp-sticky"><div className="rp-side-card"><strong>이 페이지의 주요 내용</strong><nav aria-label="페이지 목차"><a href="#rp-local">지역과 건물 유형</a>{page.sections.map(([h],i)=><a key={h} href={`#rp-section-${i+1}`}>{h}</a>)}<a href="#rp-estimate">견적 비교표</a><a href="#rp-faq">자주 묻는 질문</a></nav></div><div className="rp-side-card"><strong>견적 상담 준비</strong><p>주소·층수, 현장 사진, 계약 종료일, 철거 대상 목록과 임대차 원상복구 조항을 정리하면 상담에 도움이 됩니다.</p><a className="rp-btn" href={CTA_URL} target="_blank" rel="noopener noreferrer">견적 상담 신청 ↗</a></div></div></aside>
   </div>
  </main>
  <footer className="rp-footer"><div className="rp-wrap"><Link href="/">원상복구 업체</Link><span>상가 · 점포 · 사무실 · 식당 철거 및 원상복구 안내</span></div></footer>
 </div>
}
