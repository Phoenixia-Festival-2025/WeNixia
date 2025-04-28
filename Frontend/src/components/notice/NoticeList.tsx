import Link from 'next/link';

interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
}

interface NoticeListProps {
  notices: Notice[];
}

export default function NoticeList({ notices }: NoticeListProps) {
  return (
    <div className="space-y-3">
      {notices.map((notice) => (
        <Link
          key={notice.id}
          href={`/notice/${notice.id}`}
          className="block bg-white border rounded-lg p-4 shadow-sm hover:bg-gray-50 transition"
        >
          <h3 className="text-base font-semibold text-gray-800">{notice.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{notice.date}</p>
        </Link>
      ))}
    </div>
  );
}