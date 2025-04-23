'use client';

import { useParams } from 'next/navigation';
import BoothImage from '@/components/booth/detail/BoothImage';
import BoothDescription from '@/components/booth/detail/BoothDescription';
import BoothPhotoCards from '@/components/booth/detail/BoothPhotoCards';
import BoothMenuList from '@/components/booth/detail/BoothMenuList';

interface BoothDetail {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  photoCards?: string[];
  menus?: {
    name: string;
    price: string;
  }[];
}

const boothDetails: BoothDetail[] = [
  {
    id: 1,
    name: '코딩 동아리',
    description: '순천향대학교 최고의 개발자 동아리입니다. VR 체험과 미니게임을 준비했어요!',
    imageUrl: '/images/booth/coding.png',
    photoCards: [
      '/images/booth/photo1.png',
      '/images/booth/photo2.png',
      '/images/booth/photo3.png',
    ],
  },
  {
    id: 2,
    name: '닭강정 트럭',
    description: '겉바속촉 닭강정과 시원한 탄산음료를 드셔보세요!',
    imageUrl: '/images/booth/chicken.png',
    menus: [
      { name: '달콤 닭강정', price: '5,000원' },
      { name: '매콤 닭강정', price: '5,500원' },
      { name: '콜라', price: '1,500원' },
    ],
  },
];

export default function BoothDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const booth = boothDetails.find((b) => b.id === id);

  if (!booth) {
    return <div className="p-6 text-center text-gray-400">존재하지 않는 부스입니다.</div>;
  }

  return (
    <section className="p-4 space-y-6">
      <BoothImage src={booth.imageUrl} alt={booth.name} />
      <BoothDescription name={booth.name} description={booth.description} />
      {booth.photoCards && <BoothPhotoCards photoCards={booth.photoCards} />}
      {booth.menus && <BoothMenuList menus={booth.menus} />}
    </section>
  );
}