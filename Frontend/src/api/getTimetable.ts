import { TimeTableItem } from '@/lib/types/timetable';

export async function fetchTimetableByDate(date: string): Promise<TimeTableItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/timetable/${date}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('타임테이블 데이터를 불러오는 데 실패했습니다.');
  }

  return res.json();
}