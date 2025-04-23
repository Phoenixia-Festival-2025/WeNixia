'use client';
import { useRouter } from 'next/navigation';

export default function MiniTimetable() {
  const router = useRouter();

  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">오늘의 타임테이블</h2>
        <button
          className="text-sm text-blue-500"
          onClick={() => router.push('/timetable')}
        >
          더보기
        </button>
      </div>
      <div className="space-y-2">
        <div className="p-3 bg-blue-50 rounded-md">🔥 13:00 - 개막식</div>
        <div className="p-3 bg-blue-50 rounded-md">🎵 15:00 - 공연 A</div>
        <div className="p-3 bg-blue-50 rounded-md">🎉 19:00 - DJ 파티</div>
      </div>
    </section>
  );
}