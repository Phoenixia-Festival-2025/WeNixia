'use client';

import NoticeBanner from '@/components/notice/NoticeBanner';
import NoticeList from '@/components/notice/NoticeList';

export default function NoticePage() {
  return (
    <section className="p-4 space-y-6">
      <NoticeBanner />
      <NoticeList />
    </section>
  );
}