// HomePage.tsx

'use client';

import { motion } from 'framer-motion';
import Banner from '@/components/main/Banner';
import FestivalSummary from '@/components/main/FestivalSummary';
import MiniNotice from '@/components/main/MiniNotice';
import CurrentTimeBlock from '@/components/main/CurrentTimeBlock';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // 자식 요소 등장 간격
      delayChildren: 0.2,   // 첫 자식 요소 딜레이
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
        <FestivalSummary />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <CurrentTimeBlock date="25.05.08" testTime="16:00" />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <MiniNotice />
      </motion.div>
    </motion.section>
  );
}