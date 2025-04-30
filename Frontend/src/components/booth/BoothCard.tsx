'use client';

import { useRouter } from 'next/navigation';

interface CommonBoothCardProps {
  id: number;
  name: string;
  description: string;
  status: string;
  imageUrl?: string; // 선택사항: foodtruck은 menu에서 가져옴
  type: 'club' | 'foodtruck' | 'flea'; // 타입 추가 (어디로 이동할지 구분)
}

const typeLabelMap: Record<CommonBoothCardProps['type'], string> = {
  foodtruck: '푸드트럭',
  club: '동아리/부스',
  flea: '플리마켓',
};

export default function BoothCard({
  id,
  name,
  description,
  imageUrl,
  type,
}: CommonBoothCardProps) {
  const router = useRouter();
  const label = typeLabelMap[type];

  return (
    <div
      onClick={() => router.push(`/booth/${type}/${id}`)}
      className="flex items-center p-4 bg-white rounded-xl shadow-md border hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex-1">
        <div className="text-xs text-blue-500 font-semibold mb-1">{label}</div>
        <div className="text-base font-bold">{name}</div>
        <div className="text-sm text-gray-600 line-clamp-2">{description}</div>
      </div>

      {imageUrl && (
        <div className="ml-4 w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}