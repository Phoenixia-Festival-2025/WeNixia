'use client';

import { motion } from 'framer-motion';

interface Day {
  label: string; // "DAY 1", "DAY 2" 이런 식
  date: string;  // "2025-05-07" 이런 형식
}

interface Props {
  selectedDate: string;
  onSelect: (date: string) => void;
}

// 날짜 목록 (★ 필요하면 여기서 날짜 추가하면 됨)
const days: Day[] = [
  { label: 'DAY 1', date: '2025-05-07' },
  { label: 'DAY 2', date: '2025-05-08' },
  { label: 'DAY 3', date: '2025-05-09' },
];

export default function TimeTableDaySelector({ selectedDate, onSelect }: Props) {
  return (
    <div className="flex justify-between gap-3 px-1">
      {days.map((day) => {
        const isSelected = selectedDate === day.date;

        return (
          <motion.button
            key={day.date}
            onClick={() => onSelect(day.date)}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 rounded-2xl p-3 text-center transition-all duration-300 shadow-sm font-bold
              ${
                isSelected
                  ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-800'
              }`}
          >
            <div className="text-md">{day.label}</div>
            <div className="text-sm mt-1">{day.date}</div>
          </motion.button>
        );
      })}
    </div>
  );
}