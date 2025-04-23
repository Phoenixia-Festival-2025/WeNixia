'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';

interface LineupInfo {
  src: string;
  name: string;
  time: string;
}

const lineup: LineupInfo[] = [
  { src: '/lineup/sing1.jpg', name: 'G-Dragon', time: '5월 7일 19:00' },
  { src: '/lineup/sing2.jpg', name: '아이유', time: '5월 8일 20:00' },
  { src: '/lineup/sing3.jpg', name: 'NMIXX', time: '5월 9일 18:30' },
];

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 200); // 약간의 연출용 지연

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`w-full max-w-md mx-auto mt-4 transition-opacity duration-700 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 2.5,
          slideShadows: false,
        }}
        modules={[EffectCoverflow]}
        className="w-full h-60"
      >
        {lineup.map((item, idx) => {
          const isActive = idx === activeIndex;

          return (
            <SwiperSlide
              key={idx}
              className="relative w-48 h-60 rounded-xl overflow-hidden shadow-md"
            >
              {/* 이미지 */}
              <img
                src={item.src}
                alt={item.name}
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  loaded ? 'opacity-100' : 'opacity-50'
                }`}
              />

              {/* ✅ 하단 그라데이션 오버레이 */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent z-10" />

              {/* 텍스트 오버레이 */}
              <div
                className={`absolute bottom-4 left-0 right-0 px-4 text-center z-20 transition-opacity duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className={`text-xl font-bold text-white transition-all duration-500 ${
                    isActive && loaded
                      ? 'opacity-100 delay-[500ms] translate-y-0'
                      : 'opacity-0 translate-y-2'
                  }`}
                >
                  {item.name}
                </div>
                <div
                  className={`text-lg mt-1 text-white transition-all duration-500 ${
                    isActive && loaded
                      ? 'opacity-100 delay-[800ms] translate-y-0'
                      : 'opacity-0 translate-y-2'
                  }`}
                >
                  {item.time}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}