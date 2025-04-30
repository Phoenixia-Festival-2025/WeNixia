import { FleaMarket } from '@/lib/types/fleamarket';

export async function fetchFleaMarkets(): Promise<FleaMarket[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fleamarkets`, { cache: 'no-store' });
  if (!res.ok) throw new Error('플리마켓 정보를 불러올 수 없습니다.');
  console.log(res);
  return res.json();
}

export async function fetchFleaMarketById(id: number): Promise<FleaMarket> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fleamarkets/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('플리마켓 정보를 불러올 수 없습니다.');
  console.log(res);
  return res.json();
}