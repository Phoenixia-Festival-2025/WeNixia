import { Booth } from '@/lib/types/booth';

// ✅ 전체 부스 목록 가져오기
export async function fetchBooths(): Promise<Booth[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booths`, { cache: 'no-store' });
  if (!res.ok) throw new Error('부스 정보를 불러올 수 없습니다.');
  return res.json();
}

// 🆕 추가 - 특정 부스(id) 가져오기
export async function fetchBoothById(id: number): Promise<Booth> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booths/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('부스 정보를 불러올 수 없습니다.');
  return res.json();
}