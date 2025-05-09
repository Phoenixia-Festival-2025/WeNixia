'use client';

import { useEffect, useState } from 'react';
import NoticeBanner from '@/components/notice/NoticeBanner';
import NoticeList from '@/components/notice/NoticeList';
import { fetchNotices } from '@/api/getNotice';
import { motion } from 'framer-motion';

interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
}

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]); // ✅ 타입 명시
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data: Notice[] = await fetchNotices();
        setNotices(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadNotices();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  return (
    <motion.section
      className="p-4 space-y-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.2, delayChildren: 0.1 },
        },
      }}
    >
      <motion.div>
        <NoticeBanner />
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <NoticeList notices={notices} />
      </motion.div>
    </motion.section>
  );
}