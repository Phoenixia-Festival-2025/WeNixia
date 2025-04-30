'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import TimeTableBanner from '@/components/timetable/TimeTableBanner';
import TimeTableDaySelector from '@/components/timetable/TimeTableDaySelector';
import TimeTableList from '@/components/timetable/TimeTableList';
import { fetchTimetableByDate } from '@/api/getTimetable'; // 🔥 API 분리해서 가져오기

import { TimeTableItem } from '@/lib/types/timetable'; // 🔥 타입 분리해서 가져오기

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.1 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function TimeTablePageClient() {
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState('2025-05-07');
  const [timetable, setTimetable] = useState<TimeTableItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTimetable = async (date: string) => {
    try {
      setLoading(true);
      const data = await fetchTimetableByDate(date);
      setTimetable(data);
    } catch (error) {
      console.error(error);
      setTimetable([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const defaultDate = searchParams.get('date');
    const today = new Date().toISOString().split('T')[0];

    // 날짜 목록에 포함된 날짜인지 확인
    const validDates = ['2025-05-07', '2025-05-08', '2025-05-09'];
    const fallbackDate = '2025-05-07';

    const initialDate = validDates.includes(defaultDate || today)
      ? (defaultDate || today)
      : fallbackDate;

    setSelectedDate(initialDate);
    loadTimetable(initialDate);
  }, [searchParams]);

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    loadTimetable(newDate);
  };

  return (
    <motion.section
      className="p-4 space-y-6"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <motion.div variants={fadeInUp}>
        <TimeTableBanner />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <TimeTableDaySelector selectedDate={selectedDate} onSelect={handleDateChange} />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDate}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <TimeTableList timetable={timetable} loading={loading} />
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}