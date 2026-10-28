/* eslint-disable @next/next/no-img-element */
import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {
  getDetailContent,getDescription,getDisplayKeyword,getFaqItems,
  getRelatedPages,getTitle
} from '@/lib/detail-content';
import {getPageBySlug,getPublishedPages} from '@/lib/pages';
import {CTA_URL,getPageUrl} from '@/lib/site';
import {guideLinks} from '@/lib/editorial-content';
import {priorityMap} from '@/lib/priority-pages';
import '../editorial.css';

type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return getPublishedPages().map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const record=getPageBySlug(slug);
 if(!record)return {title:'페이지를 찾을 수 없습니다'};
 const priority=priorityMap.get(slug);
 const title=priority?.title??getTitle(record);
 const description=priority?.description??getDescription(record);
 return {title,description,alternates:{canonical:getPageUrl(slug)},openGraph:{title,description,url:getPageUrl(slug),siteName:'원상복구 업체',images:['/assets/hero-interior.webp'],type:'article'},twitter:{card:'summary_large_image',title,description}};
}
function SafeSchema({data}:{data:unknown}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>;}
export default async function DetailPage({params}:Props){
 const {slug}=await params;const record=getPageBySlug(slug);if(!record)notFound();
 const priority=priorityMap.get(slug);
 const title=priority?.title??getTitle(record);
 const description=priority?.description??getDescription(record);
 const keyword=getDisplayKeyword(record);
 const content=priority?null:getDetailContent(record);
 const faq=priority?null:getFaqItems(record);
 const allPages=getPublishedPages();
 const related=getRelatedPages(record,allPages).filter(p=>p.slug!==slug).slice(0,4);
 const relevant=priority?.relevant??(
  slug.endsWith('closure-support')?['/guides/closure-support/','/services/closure-demolition/','/guides/contract-checklist/']:
  slug.includes('cost')?['/guides/cost-checklist/','/guides/contract-checklist/','/services/commercial-restoration/']:
  slug.includes('cafe')||slug.includes('restaurant')?['/services/cafe-demolition/','/guides/waste-disposal/','/guides/cost-checklist/']:
  slug.includes('store')||slug.includes('shop')?['/services/store-restoration/','/guides/cost-checklist/','/guides/work-process/']:
  ['/services/commercial-restoration/','/guides/contract-checklist/','/guides/cost-checklist/']
 );
 const links=guideLinks.filter(x=>relevant.includes(x.href));
 const bread={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
  {"@type":"ListItem","position":1,"name":"원상복구 업체","item":getPageUrl('')},
  {"@type":"ListItem","position":2,"name":keyword,"item":getPageUrl(slug)}]};
 const schema={"@context":"https://schema.org","@type":"WebPage","name":title,"description":description,"url":getPageUrl(slug)};
 return <div className="editorial-shell">
 <SafeSchema data={schema}/><SafeSchema data={bread}/>
 <header className="editorial-header"><div className="editorial-header-inner"><Link href="/" className="editorial-logo"><img src="/brand/brand-mark.svg" width={36} height={36} alt="" aria-hidden="true" /><span>원상복구 업체</span></Link><a className="editorial-cta" href={CTA_URL} target="_blank" rel="noopener noreferrer">견적 상담 신청 ↗</a></div></header>
 <main className="editorial-main"><nav className="editorial-crumb"><Link href="/">홈</Link> <span>›</span> {keyword}</nav>
 <article><div className="editorial-hero"><div><p className="editorial-overline">공사 범위·견적·인도 확인</p><h1>{priority?.title??keyword}</h1><p>{priority?.summary??content?.summary.join(' ')}</p><a className="editorial-button" href={CTA_URL} target="_blank" rel="noopener noreferrer">원상복구 상담 신청 ↗</a></div><img src={priority?.slug.includes('cafe')||priority?.slug.includes('restaurant')?'/assets/service-cafe.webp':priority?.slug.includes('closure')?'/assets/service-demolition.webp':'/assets/hero-interior.webp'} alt={`${keyword} 관련 공간 및 철거 참고 이미지`} loading="eager" /></div>
 {priority?<>
 <section className="editorial-block" style={{marginTop:24}}><p className="editorial-overline">현장별 확인 항목</p><h2>{keyword}, 공사 전에 확인할 사항</h2><p>{priority.summary}</p><ul>{priority.checks.map(item=><li key={item}>{item}</li>)}</ul></section>
 <section className="editorial-block" style={{marginTop:18}}><h2>견적·일정 검토 시 주의할 점</h2><p>{priority.note}</p><p>철거 범위는 임대차계약서와 현장에 남아 있는 설비의 상태에 따라 달라질 수 있습니다. 사진을 준비해 상담하고 공사 전 인도 기준을 기록해 두세요.</p></section>
 </>:<div className="editorial-body">{content?.sections.map((sec,i)=><section className="editorial-block" key={sec.title}><div className="editorial-count">{String(i+1).padStart(2,'0')}</div><h2>{sec.title}</h2>{sec.paragraphs?.map(par=><p key={par}>{par}</p>)}{sec.items?.length?<ul>{sec.items.map(item=><li key={item}>{item}</li>)}</ul>:null}</section>)}</div>}
 {(!priority&&faq?.length)?<section className="editorial-faq"><h2>{content?.layout.faqTitle??'자주 묻는 질문'}</h2>{faq.map(x=><div key={x.question}><h3>{x.question}</h3><p>{x.answer}</p></div>)}</section>:null}
 {slug.endsWith('closure-support')?<section className="editorial-faq"><h2>폐업철거 지원 안내 확인</h2><p>과거 공고의 접수 기한과 현재 모집 여부는 다릅니다. 지원금 지급이나 상시 접수를 보장하지 않으며 최신 운영기관 공고에서 신청 가능 여부를 확인해야 합니다.</p></section>:null}
 <section className="editorial-cross"><h2>{keyword} 관련 안내</h2><div className="editorial-links">{links.map(item=><Link href={item.href} key={item.href}>{item.label} <span>→</span></Link>)}</div></section>
 {related.length?<section className="editorial-cross"><h2>관련 지역·업종 안내</h2><div className="editorial-links">{related.map(item=><Link href={`/${item.slug}/`} key={item.slug}>{getDisplayKeyword(item)} <span>→</span></Link>)}</div></section>:null}
 <section className="editorial-bottom"><h2>원상복구 범위와 견적을 함께 확인하세요.</h2><p>현장 사진, 공사 희망일, 계약서의 원상복구 조건을 준비하면 상담에 도움이 됩니다.</p><a className="editorial-button" href={CTA_URL} target="_blank" rel="noopener noreferrer">견적 상담 신청 ↗</a></section>
 </article></main><footer className="editorial-footer"><Link href="/">원상복구 업체 홈</Link><span>철거·원상복구 정보와 공사 범위 상담</span></footer></div>;
}
