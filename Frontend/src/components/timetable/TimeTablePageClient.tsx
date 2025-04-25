// 📄 TimeTablePageClient.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DayKey, timetableData } from '@/lib/timetableData';

import TimeTableBanner from '@/components/timetable/TimeTableBanner';
import TimeTableDaySelector from '@/components/timetable/TimeTableDaySelector';
import TimeTableList from '@/components/timetable/TimeTableList';
import { AnimatePresence, motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function TimeTablePageClient() {
  const [selectedDate, setSelectedDate] = useState<DayKey>('25.05.07');
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
        <TimeTableDaySelector selectedDate={selectedDate} onSelect={setSelectedDate} />
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDate}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <TimeTableList selectedDate={selectedDate} />
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}