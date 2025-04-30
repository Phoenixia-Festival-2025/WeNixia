// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import BottomNav from '@/components/common/BottomNav';
import ProviderWrapper from '@/components/ProviderWrapper';
import Script from 'next/script'; // GA 삽입용

export const metadata = {
  title: 'WeNixia',
  description: '순천향대학교 피닉시아 축제 플랫폼',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* ✅ GA 스크립트 삽입 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0RZK5TGPCT', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body className="min-h-screen flex flex-col bg-white text-gray-900 overflow-y-scroll no-scrollbar">
        <ProviderWrapper>
          <header className="fixed top-0 w-full z-50 bg-white border-b px-4 py-2 shadow-sm flex items-center justify-between">
            <div className="text-xl font-bold">WeNixia</div>
            <div className="text-sm font-bold">우리들의 피닉시아 축제</div>
          </header>

          <main className="pt-[45px] pb-[72px]">{children}</main>
          <BottomNav />
        </ProviderWrapper>
      </body>
    </html>
  );
}