import Link from 'next/link';
import { Notice } from '@/lib/noticeData';

export default function NoticeItem({ id, title, date }: Notice) {
  return (
    <Link
      href={`/notice/${id}`}
      className="block p-4 bg-white rounded-md border shadow-sm hover:bg-gray-50 transition"
    >
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-gray-500">{date}</div>
    </Link>
  );
}