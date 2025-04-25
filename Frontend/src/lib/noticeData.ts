// lib/noticeData.ts
export interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
}

export const notices: Notice[] = [
  {
    id: 1,
    title: '우천 시 대피소 안내',
    date: '2025.05.07',
    content: '비가 오는 경우 실내 체육관으로 이동하여 행사를 계속 진행합니다.',
  },
  {
    id: 2,
    title: 'DAY 2 초청 가수 변경 안내',
    date: '2025.05.08',
    content: '초청 가수가 A → B로 변경되었습니다. 양해 부탁드립니다.',
  },
  {
    id: 3,
    title: '푸드트럭 운영 시간 안내',
    date: '2025.05.09',
    content: '운영 시간은 오전 11시부터 저녁 8시까지입니다.',
  },
];