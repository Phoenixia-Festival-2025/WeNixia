'use client';

import { motion } from 'framer-motion';
import NoticeBanner from '@/components/notice/NoticeBanner';
import NoticeList from '@/components/notice/NoticeList';

export default function NoticePage() {
  return (
    <motion.section
      className="p-4 space-y-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
          },
        },
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        <NoticeBanner />
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        <NoticeList />
      </motion.div>
    </motion.section>
  );
}