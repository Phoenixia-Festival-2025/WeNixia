interface BoothCategorySelectorProps {
  categories: readonly string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function BoothCategorySelector({
  categories,
  selected,
  onSelect,
}: BoothCategorySelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`flex-shrink-0 px-4 py-2 rounded-full border font-medium ${
            selected === cat
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}