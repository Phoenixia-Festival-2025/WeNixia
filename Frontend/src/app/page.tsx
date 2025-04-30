'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Banner from '@/components/main/Banner';
import FestivalSummary from '@/components/main/FestivalSummary';
import MiniNotice from '@/components/main/MiniNotice';
import CurrentTimeBlock from '@/components/main/CurrentTimeBlock';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
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

export default function HomePage() {
  const [today, setToday] = useState<string>('2025-05-07');
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const now = new Date();

    // 날짜 포맷: '2025-05-07'
    const formattedDate = now.toISOString().split('T')[0];

    // 시간 포맷: 'HH:MM'
    const timeStr = now.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    setToday(formattedDate);
    setCurrentTime(timeStr);
  }, []);

  return (
    <motion.section
      className="p-4 space-y-6"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeInUp}>
        <Banner />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <CurrentTimeBlock date={today} testTime={currentTime} />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <FestivalSummary />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <MiniNotice />
      </motion.div>
    </motion.section>
  );
}