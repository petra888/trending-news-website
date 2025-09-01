import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "트렌딩 뉴스 - 실시간 인기 검색어와 관련 뉴스",
  description: "네이버, 구글, 다음, 네이트의 실시간 인기 검색어와 관련 뉴스를 한눈에 확인하세요. 최신 트렌드를 놓치지 마세요!",
  keywords: "실시간 검색어, 트렌딩, 인기 검색어, 네이버, 구글, 다음, 네이트, 뉴스, 실시간 뉴스",
  authors: [{ name: "트렌딩 뉴스" }],
  openGraph: {
    title: "트렌딩 뉴스 - 실시간 인기 검색어와 관련 뉴스",
    description: "네이버, 구글, 다음, 네이트의 실시간 인기 검색어와 관련 뉴스를 한눈에 확인하세요.",
    type: "website",
    locale: "ko_KR",
    url: "https://your-domain.com",
    siteName: "트렌딩 뉴스",
  },
  twitter: {
    card: "summary_large_image",
    title: "트렌딩 뉴스",
    description: "실시간 인기 검색어와 관련 뉴스를 한눈에",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        
        {/* 추가 SEO 메타 태그 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://your-domain.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
