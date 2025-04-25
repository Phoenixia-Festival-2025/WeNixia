interface BoothPhotoCardsProps {
  photoCards: string[];
}

export default function BoothPhotoCards({ photoCards }: BoothPhotoCardsProps) {
  if (photoCards.length === 0) return null;

  return (
    <div>
      <h2 className="font-semibold text-lg mb-2">포토카드</h2>
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {photoCards.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`포토카드 ${idx + 1}`}
            className="w-32 h-32 rounded-md object-cover cursor-pointer"
            onClick={() => alert('클릭 시 확대 기능 예정')}
          />
        ))}
      </div>
    </div>
  );
}