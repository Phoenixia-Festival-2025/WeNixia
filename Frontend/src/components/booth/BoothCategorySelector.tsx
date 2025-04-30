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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border font-medium text-sm text-center transition ${
            selected === cat
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}