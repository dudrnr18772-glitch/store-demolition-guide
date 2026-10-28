/* eslint-disable @next/next/no-img-element */
import type {Metadata} from 'next';
import Link from 'next/link';
import {regionalPages,REGION_SITE} from '@/lib/regional-pages';
import '../regional.css';

const title='지역별 철거·원상복구 안내 | 원상복구 업체';
const description='역삼동 사무실 원상복구, 성수동 카페철거, 홍대 상가철거, 여의도 사무실 원상복구 등 9개 상권의 실제 점포 유형과 철거 준비사항을 확인하세요.';
export const metadata:Metadata={title,description,alternates:{canonical:`${REGION_SITE}/regions/`},openGraph:{title,description,url:`${REGION_SITE}/regions/`,siteName:'원상복구 업체'}};
export default function RegionIndex(){return <div className="rp-page">
<header className="rp-header"><div className="rp-wrap rp-header-inner"><Link href="/" className="rp-brand"><img src="/brand/brand-mark.svg" width={40} height={40} alt=""/><span>원상복구 업체</span></Link><nav className="rp-head-nav" aria-label="주요 안내"><Link href="/">홈</Link><Link href="/services/commercial-restoration/">서비스 안내</Link><Link href="/guides/cost-checklist/">비용 안내</Link></nav><Link href="/" className="rp-btn rp-btn-small">홈페이지 보기 ↗</Link></div></header>
<main className="rp-wrap"><nav className="rp-crumb"><Link href="/">홈</Link> › 지역별 안내</nav><section className="rp-index-intro"><p className="rp-over">지역별 철거·원상복구 안내</p><h1>현장 유형에 맞는 지역별 철거 가이드</h1><p>사무실·카페·음식점·상가 등 업종별 철거 항목과 지역별 확인 사항을 나누어 정리했습니다. 실제 공사 가능 시간, 반출 동선 및 복구 범위는 해당 건물의 규정과 임대차계약서를 기준으로 확인하세요.</p></section>
<section className="rp-index-grid" aria-label="지역별 철거 안내 목록">{regionalPages.map(p=><Link className="rp-index-card" href={`/${p.slug}/`} key={p.slug}><img src={`/assets/${p.hero}`} width={1422} height={928} loading="lazy" alt=""/><div><span>{p.city}</span><h2>{p.keyword}</h2><p>{p.description}</p><strong>지역별 안내 살펴보기 ↗</strong></div></Link>)}</section></main>
<footer className="rp-footer"><div className="rp-wrap"><Link href="/">원상복구 업체</Link><span>지역별 상가·사무실·식당·카페 철거 및 원상복구 안내</span></div></footer>
</div>}
