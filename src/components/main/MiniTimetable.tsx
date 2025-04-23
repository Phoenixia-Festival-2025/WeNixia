'use client';

import { useRouter } from 'next/navigation';
import { timetableData } from '@/lib/timetableData';

export default function MiniTimetable() {
  const router = useRouter();
  const todayKey = '25.05.07'; // TODO: 오늘 날짜 기준 자동 설정 원할 경우 로직 추가

  const todaysTimetable = timetableData[todayKey] || [];

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
        {todaysTimetable.slice(0, 3).map((item, idx) => (
          <div key={idx} className="p-3 bg-blue-50 rounded-md">
            {item.time}
            {item.title}
          </div>
        ))}
      </div>
    </section>
  );
}