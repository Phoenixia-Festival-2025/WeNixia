interface Day {
  label: string;
  date: string;
}

const days: Day[] = [
  { label: 'DAY 1', date: '25.05.07' },
  { label: 'DAY 2', date: '25.05.08' },
  { label: 'DAY 3', date: '25.05.09' },
];

export default function DaySelector() {
  return (
    <div className="flex justify-between gap-2">
      {days.map((day) => (
        <button
          key={day.date}
          className={`flex-1 py-2 bg-gray-100 text-gray-700 rounded-full font-bold ${
            day.date === '25.05.07' ? 'bg-blue-500 text-white' : ''
          }`}
        >
          {day.label}
          <br />
          {day.date}
        </button>
      ))}
    </div>
  );
}