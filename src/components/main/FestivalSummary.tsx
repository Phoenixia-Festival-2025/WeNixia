'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { summaryData } from '@/lib/timetableData';

export default function FestivalSummary() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setSelectedIndex(prev => (prev === index ? null : index));
  };

  const router = useRouter();

  return (
    <section className="px-4 mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🎪 축제 한눈에 보기</h2>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-3 gap-4">
        {summaryData.map((item, index) => (
          <button
            key={index}
            onClick={() => toggle(index)}
            className={`aspect-square border rounded-xl shadow-sm bg-indigo-50 p-4 flex flex-col items-center justify-center transition-all duration-300 ${
              selectedIndex === index ? 'scale-105 border-indigo-500' : 'hover:scale-105 border-indigo-50'
            }`}
          >
            <div className="text-lg font-semibold text-indigo-600">{item.day}</div>
            <div className="text-sm text-gray-500 mt-1">{item.date}</div>
          </button>
        ))}
      </div>

      {/* 펼쳐지는 상세 타임테이블 */}
      <AnimatePresence mode="wait">
        {selectedIndex !== null && (
          <motion.section
            key={selectedIndex}
            layout
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-gray-50 rounded-xl p-4 shadow-inner"
          >
            <div className="text-md font-semibold text-gray-800 mb-2">
              📅 {summaryData[selectedIndex].day} 타임테이블
            </div>
            <ul className="text-sm space-y-1">
              {summaryData[selectedIndex].timetable.map((item, i) => (
                <li
                  key={i}
                  onClick={() => router.push(`/timetable?date=${summaryData[selectedIndex].date}`)}
                  className="flex justify-between text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded transition"
                >
                  <span>{item.time}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}
      </AnimatePresence>
    </section>
  );
}