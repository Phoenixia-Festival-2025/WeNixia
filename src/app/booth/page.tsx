'use client';

import { useEffect, useState } from 'react';
import BoothBanner from '@/components/booth/BoothBanner';
import BoothMap from '@/components/booth/BoothMap';
import BoothCategorySelector from '@/components/booth/BoothCategorySelector';
import BoothCard from '@/components/booth/BoothCard';
import { booths } from '@/lib/boothData';
import { setBooths } from '@/redux/modules/booth';
import { useAppDispatch } from '@/redux/hooks';

const categories = ['전체', '동아리 부스', '푸드트럭', '편의시설'] as const;

export default function BoothPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBooths(booths));
  }, [dispatch]);

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