'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { TimeTableItem } from '@/lib/types/timetable';

export default function TimeTableList({ timetable, loading }: { timetable: TimeTableItem[]; loading: boolean }) {
  if (loading) {
    return <div className="text-center text-gray-400 py-10">로딩 중...</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.section
        className="relative px-2 pt-4 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute top-0 bottom-0 left-6 w-px bg-blue-200" />

        <div className="space-y-10 pl-12">
          {timetable.length > 0 ? (
            timetable.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="absolute left-[-30px] top-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md" />
                <div className="bg-white rounded-xl shadow-md px-4 py-3 border-l-4 border-blue-400">
                  <div className="text-sm text-gray-500">{item.time}</div>
                  <div className="text-base font-semibold text-gray-800">{item.title}</div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-gray-400 text-center py-10">해당 날짜에 일정이 없습니다.</div>
          )}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}