import { Notice } from '@/lib/noticeData';

export default function NoticeDetail({ title, date, content }: Notice) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="text-sm text-gray-500">{date}</div>
      <p className="text-base text-gray-800 whitespace-pre-line">{content}</p>
    </div>
  );
}