'use client';

import { useParams, useRouter } from 'next/navigation';
import { notices } from '@/lib/noticeData';
import NoticeDetail from '@/components/notice/NoticeDetail';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NoticeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const notice = notices.find((n) => n.id === id);

  if (!notice) {
    return <div className="p-6 text-center text-gray-400">존재하지 않는 공지입니다.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-100 h-14 flex items-center px-4">
        <IconButton onClick={() => router.back()} size="small">
          <ArrowBackIcon />
        </IconButton>

        <div className="flex-1 text-center pr-10">
          <span className="text-sm font-medium text-gray-700">공지사항</span>
        </div>
      </div>

      {/* 본문 */}
      <section className="p-4 space-y-6">
        <NoticeDetail {...notice} />
      </section>
    </div>
  );
}