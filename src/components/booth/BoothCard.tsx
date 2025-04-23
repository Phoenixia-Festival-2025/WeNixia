'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

  const handleClick = () => {
    router.push(`/booth/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center bg-white border rounded-lg shadow-sm p-4 hover:bg-gray-50 transition cursor-pointer"
    >
      <div className="flex-1">
        <div className="text-xs text-gray-400">{category}</div>
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-sm text-gray-600">{description}</div>
        <div className="text-xs text-gray-500 mt-1">{time}</div>
      </div>
      <div className="w-20 h-20 ml-4 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        <img src={imageUrl} alt={name} className="object-cover w-full h-full" />
      </div>
    </div>
  );
}