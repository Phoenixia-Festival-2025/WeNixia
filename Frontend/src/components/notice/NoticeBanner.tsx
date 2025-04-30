'use client';

import { motion } from 'framer-motion';

export default function NoticeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full h-36 rounded-xl bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 flex items-center justify-center shadow-md relative overflow-hidden"
    >
      <h2 className="text-xl font-bold text-black-200 z-10">공지사항 안내</h2>
    </motion.div>
  );
}