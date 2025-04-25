interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
}

export default function NoticeDetail({ title, date, content }: Notice) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{date}</p>
      <div className="text-base text-gray-700 whitespace-pre-line">{content}</div>
    </div>
  );
}