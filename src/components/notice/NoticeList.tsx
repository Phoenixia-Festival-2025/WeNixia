import NoticeItem from './NoticeItem';
import { notices } from '@/lib/noticeData';

export default function NoticeList() {
  const sortedNotices = [...notices].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ul className="space-y-4">
      {sortedNotices.map((notice) => (
        <li key={notice.id}>
          <NoticeItem {...notice} />
        </li>
      ))}
    </ul>
  );
}