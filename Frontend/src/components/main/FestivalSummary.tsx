'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface TimeTableItem {
  time: string;
  title: string;
}

interface DayInfo {
  day: string;
  date: string;
}

const days: DayInfo[] = [
  { day: 'DAY 1', date: '2025-05-07' },
  { day: 'DAY 2', date: '2025-05-08' },
  { day: 'DAY 3', date: '2025-05-09' },
];

export default function FestivalSummary() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timetable, setTimetable] = useState<TimeTableItem[]>([]);
  const router = useRouter();

  const fetchTimetable = async (date: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/timetable/${date}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('시간표를 불러올 수 없습니다.');
      const data = await res.json();
      setTimetable(data);
    } catch (err) {
      console.error(err);
      setTimetable([]);
    }
  };

  const handleSelect = (index: number) => {
    const isSame = selectedIndex === index;
    if (isSame) {
      setSelectedIndex(null);
      setTimetable([]);
    } else {
      setSelectedIndex(index);
      fetchTimetable(days[index].date);
    }
  };

  return (
    <section className="px-4 mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🎪 축제 한눈에 보기</h2>

      {/* 날짜 카드 */}
      <div className="grid grid-cols-3 gap-4">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`aspect-square border rounded-xl shadow-sm bg-indigo-50 p-4 flex flex-col items-center justify-center transition-all duration-300 ${
              selectedIndex === index ? 'scale-105 border-indigo-500' : 'hover:scale-105 border-indigo-50'
            }`}
          >
            <div className="text-lg font-semibold text-indigo-600">{day.day}</div>
            <div className="text-sm text-gray-500 mt-1">{day.date}</div>
          </button>
        ))}
      </div>

      {/* 선택된 날짜 상세 */}
      <AnimatePresence mode="wait">
        {selectedIndex !== null && (
          <motion.section
            key={selectedIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-6 bg-gray-50 rounded-xl p-4 shadow-inner"
          >
            <div className="text-md font-semibold text-gray-800 mb-4">
              📅 {days[selectedIndex].day} 타임테이블
            </div>

            {timetable.length > 0 ? (
              <ul className="text-sm space-y-1">
                {timetable.map((item, i) => (
                  <li key={i} className="flex justify-between text-gray-700 p-2 rounded">
                    <span>{item.time}</span>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-400 py-8">로딩중..</div>
            )}

            {/* 전체 일정 보기 버튼 */}
            <button
              onClick={() => router.push(`/timetable?date=${days[selectedIndex].date}`)}
              className="block w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
            >
              📋 전체 일정 보기
            </button>
          </motion.section>
        )}
      </AnimatePresence>
    </section>
  );
}