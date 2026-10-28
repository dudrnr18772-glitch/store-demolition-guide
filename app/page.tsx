import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

export const metadata: Metadata = {
  title: "원상복구 업체 | 상가·점포·사무실 철거 및 원상복구 상담",
  description: "상가·점포·사무실 원상복구를 준비한다면 공사 범위, 견적 항목, 폐기물 처리, 진행 절차와 실제 시공 전후 사진을 확인해 보세요.",
  alternates: { canonical: "https://store-demolition-guide.netlify.app/" },
  openGraph: {
    title: "원상복구 업체 | 상가·점포·사무실 철거 및 원상복구 상담",
    description: "상가·점포·사무실 원상복구 및 폐업철거의 공사 범위와 견적 확인 사항을 안내합니다.",
    url: "https://store-demolition-guide.netlify.app/",
    siteName: "원상복구 업체",
    images: ["/assets/hero-interior.webp"],
    type: "website",locale:"ko_KR"
  },
};

export default function Home() {
  const html = fs.readFileSync(path.join(process.cwd(), "data", "homepage-body.html"), "utf8");
  const schema = {"@context":"https://schema.org","@graph":[
    {"@type":"WebSite","@id":"https://store-demolition-guide.netlify.app/#website","url":"https://store-demolition-guide.netlify.app/","name":"원상복구 업체","inLanguage":"ko"},
    {"@type":"WebPage","@id":"https://store-demolition-guide.netlify.app/#webpage","url":"https://store-demolition-guide.netlify.app/","name":"원상복구 업체","isPartOf":{"@id":"https://store-demolition-guide.netlify.app/#website"}},
    {"@type":"Organization","@id":"https://store-demolition-guide.netlify.app/#organization","name":"원상복구 업체","url":"https://store-demolition-guide.netlify.app/","logo":{"@type":"ImageObject","url":"https://store-demolition-guide.netlify.app/favicon-512.png","width":512,"height":512}},
    {"@type":"Service","name":"상가·점포·사무실 원상복구 및 내부철거","serviceType":"원상복구·철거 상담","areaServed":{"@type":"Country","name":"KR"}}
  ]};
  return <>
    <link rel="stylesheet" href="/assets/restoration-home.css" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}} />
    <div className="restoration-home" dangerouslySetInnerHTML={{ __html: html }} />
    <Script src="/assets/restoration-home.js" strategy="afterInteractive" />
  </>;
}
