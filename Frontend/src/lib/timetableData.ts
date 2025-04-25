export const days = [
  { label: 'DAY 1', date: '25.05.07' },
  { label: 'DAY 2', date: '25.05.08' },
  { label: 'DAY 3', date: '25.05.09' },
] as const;

export const timetableData = {
  '25.05.07': [
    { time: '13:00', title: '개막식 🔥' },
    { time: '14:00', title: 'G-Dragon 공연 🎤' },
    { time: '15:00', title: 'DJ 파티 🎧' },
    { time: '16:00', title: '개막식 🔥' },
    { time: '17:00', title: 'G-Dragon 공연 🎤' },
    { time: '20:00', title: 'DJ 파티 🎧' },
  ],
  '25.05.08': [
    { time: '14:00', title: '아이유 콘서트 🎵' },
    { time: '16:00', title: '푸드트럭 오픈 🍡' },
    { time: '18:00', title: '포토 이벤트 📸' },
  ],
  '25.05.09': [
    { time: '11:00', title: '장기자랑 👯' },
    { time: '19:00', title: '불꽃놀이 🎇' },
    { time: '20:00', title: '럭키드로우 🎁' },
  ],
} as const;

export const summaryData = days.map((day) => ({
  day: day.label,
  date: day.date,
  timetable: timetableData[day.date],
}));

export type DayKey = keyof typeof timetableData;