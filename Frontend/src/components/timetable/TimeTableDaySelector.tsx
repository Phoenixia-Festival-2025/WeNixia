import { DayKey, days } from '@/lib/timetableData';
import { motion } from 'framer-motion';

interface Props {
  selectedDate: DayKey;
  onSelect: (date: DayKey) => void;
}

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