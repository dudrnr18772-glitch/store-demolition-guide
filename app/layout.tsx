import type { Metadata } from "next";
import "./globals.css";

const SITE = "https://store-demolition-guide.netlify.app";
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  applicationName: "원상복구 업체",
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico" },
  title: "원상복구 업체",
description: "상가·점포·사무실 원상복구와 폐업철거의 공사 범위, 견적 검토, 폐기물 처리를 안내합니다.",
  verification: {
    google: "rreeR_wyCoqw2z7nCk7X6Alq5HTTFEgx4gVcrMeJAbw",
    other: {
      "msvalidate.01": "7CC2274F4DAA4C8A93EB5F4D8259E6A3",
      "naver-site-verification": "3cbf789ed6018bd2a153bf922eadae65499ee256"
    }
  },
  openGraph: {siteName:"원상복구 업체",locale:"ko_KR",type:"website",images:["/assets/hero-interior.webp"]},
  twitter:{card:"summary_large_image",images:["/assets/hero-interior.webp"]}
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="ko"><body>{children}</body></html>;
}
