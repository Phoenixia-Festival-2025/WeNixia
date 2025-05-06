import Image from 'next/image';

interface Menu {
  name: string;
  price: number | string;
  imageUrl?: string;
}

interface BoothMenuListProps {
  menus: Menu[];
}

export default function BoothMenuList({ menus }: BoothMenuListProps) {
  if (menus.length === 0) return null;

  return (
    <div>
      <h2 className="font-semibold text-lg mb-2">🍽️ 메뉴</h2>
      <div className="space-y-2">
        {menus.map((menu, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-white rounded-md p-3 shadow-sm"
          >
            {/* 텍스트 */}
            <div className="flex-1">
              <div className="text-gray-800 font-medium">{menu.name}</div>
              <div className="text-gray-500 text-sm mt-0.5">
                {typeof menu.price === 'number' ? `${menu.price}원` : menu.price}
              </div>
            </div>

            {/* 이미지 */}
            {menu.imageUrl ? (
              <div className="relative w-16 h-16 rounded-md overflow-hidden ml-4 flex-shrink-0">
                <Image
                  src={menu.imageUrl}
                  alt={`${menu.name} 이미지`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded-md ml-4">
                이미지 없음
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}