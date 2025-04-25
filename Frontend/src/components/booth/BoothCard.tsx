'use client';

import { useRouter } from 'next/navigation';
import { Booth } from '@/lib/boothData';

interface BoothCardProps {
  id: number;
  category: string;
  name: string;
  description: string;
  time: string;
  imageUrl: string;
}

export default function BoothCard({
  id,
  category,
  name,
  description,
  time,
  imageUrl,
}: BoothCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/booth/${id}`)}
      className="flex items-center p-4 bg-white rounded-xl shadow-md border hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex-1">
        <div className="text-xs text-gray-400 mb-1">{category}</div>
        <div className="text-base font-semibold">{name}</div>
        <div className="text-sm text-gray-600 line-clamp-2">{description}</div>
        <div className="text-xs text-gray-500 mt-1">{time}</div>
      </div>
      <div className="ml-4 w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}