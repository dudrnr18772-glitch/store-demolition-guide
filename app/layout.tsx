import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getAssetUrl, SITE_URL, THUMBNAIL_IMAGE } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "폐업 점포철거와 원상복구 비용 부담 안내",
  description:
    "폐업 후 임대차 원상복구가 필요한 소상공인을 위해 점포철거, 원상복구 범위, 철거비용 부담, 희망리턴패키지 점포 철거비 지원 활용 가능성을 안내합니다.",
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "rreeR_wyCoqw2z7nCk7X6Alq5HTTFEgx4gVcrMeJAbw",
    other: {
      "msvalidate.01": "7CC2274F4DAA4C8A93EB5F4D8259E6A3",
      "naver-site-verification": "3cbf789ed6018bd2a153bf922eadae65499ee256",
    },
  },
  openGraph: {
    title: "폐업 점포철거와 원상복구 비용 부담 안내",
    description:
      "폐업 후 임대차 원상복구가 필요한 소상공인을 위해 점포철거, 원상복구 범위, 철거비용 부담, 희망리턴패키지 점포 철거비 지원 활용 가능성을 안내합니다.",
    url: SITE_URL,
    siteName: "폐업 점포철거 안내",
    images: [
      {
        url: getAssetUrl(THUMBNAIL_IMAGE),
        width: 1200,
        height: 630,
        alt: "폐업 점포철거 안내 썸네일",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "폐업 점포철거와 원상복구 비용 부담 안내",
    description:
      "폐업 후 임대차 원상복구가 필요한 소상공인을 위해 점포철거, 원상복구 범위, 철거비용 부담, 희망리턴패키지 점포 철거비 지원 활용 가능성을 안내합니다.",
    images: [getAssetUrl(THUMBNAIL_IMAGE)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
