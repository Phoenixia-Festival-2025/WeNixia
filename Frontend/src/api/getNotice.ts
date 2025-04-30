'use client';

// ✅ 수정
interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
}

export async function fetchNotices(): Promise<Notice[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notices`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('공지사항 데이터를 가져오는데 실패했습니다.');
  }

  const data: Notice[] = await res.json();
  return data.sort((a, b) => b.id - a.id); // 최신순 정렬
}