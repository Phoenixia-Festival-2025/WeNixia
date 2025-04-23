'use client';

import { useEffect, useState } from 'react';
import { days, timetableData, DayKey } from '@/lib/timetableData';
import { useSearchParams } from 'next/navigation';

export default function TimeTablePage() {
  const [selectedDate, setSelectedDate] = useState<DayKey>('25.05.07');
  const currentTimetable = [...timetableData[selectedDate]];
  const searchParams = useSearchParams();
  const defaultDate = searchParams.get('date') as DayKey | null;

  useEffect(() => {
    const today = new Date();
    const todayString = today.toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\./g, '').trim().replace(/(\d{2})(\d{2})(\d{2})/, '20$1.$2.$3');
  
    if (defaultDate && timetableData[defaultDate]) {
      setSelectedDate(defaultDate);
    } else if (timetableData[todayString as DayKey]) {
      setSelectedDate(todayString as DayKey);
    }
  }, [defaultDate]);

  return (
    <section className="p-4 space-y-6">
      {/* 배너 이미지 */}
      <div className="w-full h-40 bg-blue-300 rounded-md flex items-center justify-center text-white text-lg font-bold">
        타임테이블 안내 배너
      </div>

      {/* 날짜 버튼 */}
      <div className="flex justify-between gap-2">
        {days.map((day) => (
          <button
            key={day.date}
            onClick={() => setSelectedDate(day.date)}
            className={`flex-1 py-2 rounded-full font-bold ${
              selectedDate === day.date
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {day.label}
            <br />
            {day.date}
          </button>
        ))}
      </div>

      {/* 일정 목록 */}
      <section className="space-y-2">
        {currentTimetable.map((item, idx) => (
          <div
            key={idx}
            className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md shadow-sm"
          >
            <div className="text-sm text-gray-500">{item.time}</div>
            <div className="text-base font-medium">{item.title}</div>
          </div>
        ))}
        {currentTimetable.length === 0 && (
          <div className="text-gray-400 text-center py-10">해당 날짜에 일정이 없습니다.</div>
        )}
      </section>
    </section>
  );
}