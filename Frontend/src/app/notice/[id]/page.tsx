'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NoticeDetail from '@/components/notice/NoticeDetail';
import { fetchNotices } from '@/api/getNotice'; // API 호출

interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
}

export default function NoticeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchNotices();
        setNotices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-4 text-center">로딩 중...</div>;

  const notice = notices.find((n) => n.id === id);

  if (!notice) {
    return <div className="p-6 text-center text-gray-400">존재하지 않는 공지입니다.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 바 */}
      <div className="bg-white h-14 flex items-center px-4 shadow-sm">
        <IconButton onClick={() => router.back()} size="small">
          <ArrowBackIcon />
        </IconButton>
        <div className="flex-1 text-center pr-10">
          <span className="text-base font-semibold text-gray-800">공지사항</span>
        </div>
      </div>

      {/* 본문 */}
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
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="bg-white rounded-xl p-4 shadow-md"
        >
          <NoticeDetail {...notice} />
        </motion.div>
      </motion.section>
    </div>
  );
}