import Link from 'next/link';
import type {Editorial} from '@/lib/editorial-content';
import {guideLinks} from '@/lib/editorial-content';
import {CTA_URL} from '@/lib/site';
export default function EditorialPage({page,group}:{page:Editorial;group:'services'|'guides'}){
 const current=`/${group}/${page.slug}/`;
 const root='https://store-demolition-guide.netlify.app';
 const schema={"@context":"https://schema.org","@graph":[
  {"@type":"WebPage","name":page.title,"url":root+current,"description":page.intro},
  {"@type":"BreadcrumbList","itemListElement":[
   {"@type":"ListItem","position":1,"name":"원상복구 업체","item":root+'/'},
   {"@type":"ListItem","position":2,"name":page.lead,"item":root+current}
  ]}
 ]};
 return <div className="editorial-shell">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} />
  <header className="editorial-header"><div className="editorial-header-inner"><Link href="/" className="editorial-logo">▤ 원상복구 업체</Link><a href={CTA_URL} className="editorial-cta" target="_blank" rel="noopener noreferrer">견적 상담 신청 ↗</a></div></header>
  <main className="editorial-main"><nav className="editorial-crumb"><Link href="/">홈</Link> <span>›</span> {page.lead}</nav>
  <article><div className="editorial-hero"><div><p className="editorial-overline">철거·원상복구 실무 가이드</p><h1>{page.title}</h1><p>{page.intro}</p><a className="editorial-button" href={CTA_URL} target="_blank" rel="noopener noreferrer">공사 범위 상담하기 ↗</a></div><img src={page.image} alt={`${page.lead} 관련 상가·공사 이미지`} loading="eager" /></div>
  <div className="editorial-body">{page.sections.map((section,index)=><section key={section.heading} className="editorial-block"><div className="editorial-count">0{index+1}</div><h2>{section.heading}</h2><p>{section.body}</p><ul>{section.items.map(item=><li key={item}>{item}</li>)}</ul></section>)}</div>
  <section className="editorial-faq"><h2>자주 묻는 질문</h2>{page.faqs.map(f=><div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>)}</section>
  <section className="editorial-cross"><h2>함께 확인하면 좋은 안내</h2><div className="editorial-links">{guideLinks.filter(x=>x.href!==current).map(x=><Link key={x.href} href={x.href}>{x.label} <span>→</span></Link>)}</div></section>
  <section className="editorial-bottom"><h2>상가·점포 원상복구, 범위부터 확인하세요.</h2><p>현장 사진, 임대차 원상복구 조건, 희망 공사 일정을 준비하시면 상담에 도움이 됩니다.</p><a className="editorial-button" href={CTA_URL} target="_blank" rel="noopener noreferrer">견적 상담 신청 ↗</a></section>
  </article></main><footer className="editorial-footer"><Link href="/">원상복구 업체 홈</Link><span>상가·점포·사무실 원상복구와 내부철거 안내</span></footer>
 </div>
}
