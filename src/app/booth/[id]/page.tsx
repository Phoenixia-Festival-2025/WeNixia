'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import BoothImage from '@/components/booth/detail/BoothImage';
import BoothDescription from '@/components/booth/detail/BoothDescription';
import BoothPhotoCards from '@/components/booth/detail/BoothPhotoCards';
import BoothMenuList from '@/components/booth/detail/BoothMenuList';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { booths } from '@/lib/boothData';
import { useEffect } from 'react';

export default function BoothDetailClient() {
  const router = useRouter();
  const { id } = useParams();
  const boothId = Number(id);

  const booth = useAppSelector((state: RootState) =>
    state.booth.booths.find((b) => b.id === boothId)
  );

  if (!booth) {
    return <div className="text-center text-gray-400 mt-10">해당 부스 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-100 h-14 flex items-center px-4">
        <IconButton onClick={() => router.back()} size="small">
          <ArrowBackIcon />
        </IconButton>

        <div className="flex-1 text-center pr-10">
          <span className="text-sm font-medium text-gray-700">부스</span>
        </div>
      </div>
      <section className="p-4 space-y-6">
        <BoothImage src={booth.imageUrl} alt={booth.name} />
        <BoothDescription name={booth.name} description={booth.description} />
        {booth.photoCards && <BoothPhotoCards photoCards={booth.photoCards} />}
        {booth.menus && <BoothMenuList menus={booth.menus} />}
      </section>
    </div>
  );
}