'use client';
import { useRouter } from 'next/navigation';

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
        <div className="p-3 bg-blue-50 rounded-md">📢 우천 시 대피 안내</div>
        <div className="p-3 bg-blue-50 rounded-md">📢 DAY 2 라인업 변경</div>
        <div className="p-3 bg-blue-50 rounded-md">📢 푸드트럭 운영 시간</div>
      </div>
    </section>
  );
}