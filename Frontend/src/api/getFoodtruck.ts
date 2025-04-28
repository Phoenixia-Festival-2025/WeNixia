import { FoodTruck } from '@/lib/types/foodtruck';

// ✅ 전체 푸드트럭 목록 가져오기
export async function fetchFoodTrucks(): Promise<FoodTruck[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/foodtrucks`, { cache: 'no-store' });
  if (!res.ok) throw new Error('푸드트럭 정보를 불러올 수 없습니다.');
  return res.json();
}

// 🆕 추가 - 특정 푸드트럭(id) 가져오기
export async function fetchFoodTruckById(id: number): Promise<FoodTruck> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/foodtrucks/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('푸드트럭 정보를 불러올 수 없습니다.');
  return res.json();
}