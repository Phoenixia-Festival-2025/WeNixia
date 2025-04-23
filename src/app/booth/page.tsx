'use client';

import { useState } from 'react';
import BoothBanner from '@/components/booth/BoothBanner';
import BoothMap from '@/components/booth/BoothMap';
import BoothCategorySelector from '@/components/booth/BoothCategorySelector';
import BoothCard from '@/components/booth/BoothCard';

const categories = ['전체', '동아리 부스', '푸드트럭', '편의시설'] as const;

const booths = [
  {
    id: 1,
    category: '동아리 부스',
    name: '코딩 동아리',
    description: 'VR 체험 및 미니게임 제공',
    time: '10:00 ~ 17:00',
    imageUrl: '/images/booth/coding.png',
  },
  {
    id: 2,
    category: '푸드트럭',
    name: '닭강정 트럭',
    description: '달콤한 닭강정과 탄산음료',
    time: '11:00 ~ 20:00',
    imageUrl: '/images/booth/chicken.png',
  },
  {
    id: 3,
    category: '편의시설',
    name: '휴게 텐트',
    description: '편안한 그늘 쉼터',
    time: '상시 운영',
    imageUrl: '/images/booth/tent.png',
  },
];

export default function BoothPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredBooths =
    selectedCategory === '전체'
      ? booths
      : booths.filter((booth) => booth.category === selectedCategory);

  return (
    <section className="p-4 space-y-6">
      <BoothBanner />
      <BoothMap />
      <BoothCategorySelector
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <div className="space-y-4">
        {filteredBooths.map((booth) => (
          <BoothCard key={booth.id} {...booth} />
        ))}
      </div>
    </section>
  );
}