'use client';

import { useRouter } from 'next/navigation';
import { notices } from '@/lib/noticeData';

export default function MiniNotice() {
  const router = useRouter();

  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">공지사항</h2>
        <button
          className="text-sm text-blue-500"
          onClick={() => router.push('/notice')}
        >
          더보기
        </button>
      </div>
      <div className="space-y-2">
        {notices.slice(0, 3).map((notice) => (
          <div
            key={notice.id}
            className="p-3 bg-blue-50 rounded-md cursor-pointer"
            onClick={() => router.push(`/notice/${notice.id}`)}
          >
            📢 {notice.title}
          </div>
        ))}
      </div>
    </section>
  );
}