import Link from 'next/link';

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
  return (
    <Link href={`/booth/${id}`}>
      <div className="flex my-4 items-center bg-white border rounded-lg shadow-sm p-3 hover:bg-gray-50 transition">
        {/* 텍스트 */}
        <div className="flex-1">
          <div className="text-xs text-gray-400">{category}</div>
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-sm text-gray-600">{description}</div>
          <div className="text-xs text-gray-500 mt-1">{time}</div>
        </div>

        {/* 이미지 */}
        <div className="w-20 h-20 ml-4 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </Link>
  );
}