export interface Booth {
  id: number;
  category: string;
  name: string;
  description: string;
  time: string;
  imageUrl: string;
  photoCards?: string[];
  menus?: { name: string; price: string }[];
}

export const booths: Booth[] = [
  {
    id: 1,
    category: '동아리 부스',
    name: '코딩 동아리',
    description: 'VR 체험 및 미니게임 제공',
    time: '10:00 ~ 17:00',
    imageUrl: '/images/booth/coding.png',
    photoCards: ['/images/photo1.png', '/images/photo2.png'],
  },
  {
    id: 2,
    category: '푸드트럭',
    name: '닭강정 트럭',
    description: '달콤한 닭강정과 탄산음료',
    time: '11:00 ~ 20:00',
    imageUrl: '/images/booth/chicken.png',
    menus: [
      { name: '달콤 닭강정', price: '5,000원' },
      { name: '매콤 닭강정', price: '5,500원' },
    ],
  },
  {
    id: 3,
    category: '편의시설',
    name: '휴게 텐트',
    description: '편안한 그늘 쉼터',
    time: '상시 운영',
    imageUrl: '/images/booth/tent.png',
  },
];