interface Menu {
  name: string;
  price: string;
}

interface BoothMenuListProps {
  menus: Menu[];
}

export default function BoothMenuList({ menus }: BoothMenuListProps) {
  if (menus.length === 0) return null;

  return (
    <div>
      <h2 className="font-semibold text-lg mb-2">메뉴</h2>
      <div className="space-y-2">
        {menus.map((menu, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-md border"
          >
            <span className="text-gray-800">{menu.name}</span>
            <span className="text-gray-600">{menu.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}