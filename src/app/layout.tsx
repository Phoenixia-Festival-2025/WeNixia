import './globals.css';
import { ReactNode } from 'react';
import BottomNav from '@/components/common/BottomNav';
import ProviderWrapper from '@/components/ProviderWrapper';

export const metadata = {
  title: 'WeNixia',
  description: '순천향대학교 피닉시아 축제 플랫폼',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-white text-gray-900 overflow-y-scroll no-scrollbar">
        <ProviderWrapper>
          {/* 상단 네비게이션 바 */}
          <header className="fixed top-0 w-full z-50 bg-white border-b px-4 py-2 text-xl font-bold shadow-sm">
            WeNixia
          </header>

          <main className="pt-[45px] pb-[72px]">{children}</main>

          <BottomNav />
          </ProviderWrapper>
      </body>
    </html>
  );
}