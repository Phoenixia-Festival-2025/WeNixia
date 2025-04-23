// src/lib/timetableData.ts

export const days = [
  { label: 'DAY 1', date: '25.05.07' },
  { label: 'DAY 2', date: '25.05.08' },
  { label: 'DAY 3', date: '25.05.09' },
] as const;

export const timetableData = {
  '25.05.07': [
    { time: '13:00', title: '개막식 🔥' },
    { time: '15:00', title: '밴드 공연 🎸' },
    { time: '19:00', title: 'EDM 파티 🎉' },
  ],
  '25.05.08': [
    { time: '12:00', title: '댄스 동아리 🎶' },
    { time: '17:00', title: '초청 가수 공연 🎤' },
  ],
  '25.05.09': [
    { time: '14:00', title: '장기자랑 👯' },
    { time: '18:00', title: '폐막식 🎇' },
  ],
} as const;

export type DayKey = keyof typeof timetableData;