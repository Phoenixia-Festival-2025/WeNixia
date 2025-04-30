'use client';

export async function fetchNotices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notices`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('공지사항 데이터를 가져오는데 실패했습니다.');
  }

  const data = await res.json();

  // id 기준 내림차순 정렬 (최신 공지가 위로)
  return data.sort((a: any, b: any) => b.id - a.id);
}