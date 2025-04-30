'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchNotices } from '@/api/getNotice';
import { Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';

interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
}

export default function MiniNotice() {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data = await fetchNotices();
        setNotices(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadNotices();
  }, []);

  if (loading) return null;

  return (
    <section className="px-4 mt-8">
      {/* 제목 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
          <Megaphone className="w-5 h-5 text-black-500" />
          공지사항
        </h2>
        <button
          className="text-sm text-gray-500 hover:underline font-medium"
          onClick={() => router.push('/notice')}
        >
          더보기
        </button>
      </div>

      {/* 공지 리스트 */}
      <div className="space-y-2">
        {notices.slice(0, 3).map((notice) => (
          <motion.div
            key={notice.id}
            onClick={() => router.push(`/notice/${notice.id}`)}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer bg-blue-50 border border-blue-100 rounded-xl p-3 shadow-sm transition flex items-center gap-2"
          >
            <span className="text-sm text-gray-800">{notice.title}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}