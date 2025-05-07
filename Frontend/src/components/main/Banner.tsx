'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Autoplay, EffectCoverflow } from 'swiper/modules';

interface LineupInfo {
  src: string;
  name: string;
  time: string;
}

const lineup: LineupInfo[] = [
  { src: '/lineup/윤마치.jpg', name: '윤마치', time: '5월 7일 20:00' },
  { src: '/lineup/권은비.jpg', name: '권은비', time: '5월 7일 20:40' },
  { src: '/lineup/윤도현밴드.jpg', name: 'YB', time: '5월 7일 21:25' },
  { src: '/lineup/호미들.jpg', name: '호미들', time: '5월 8일 20:15' },
  { src: '/lineup/애쉬아일랜드.jpg', name: 'ASH ISLAND', time: '5월 8일 20:50' },
  { src: '/lineup/스패셜게스트.jpg', name: 'SPECIAL GUEST', time: '5월 8일 21:25' },
  { src: '/lineup/로이킴.jpg', name: '로이킴', time: '5월 9일 20:00' },
  { src: '/lineup/다비치.jpg', name: '다비치', time: '5월 9일 20:40' },
  { src: '/lineup/루시.jpg', name: 'LUCY', time: '5월 9일 21:25' },
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
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 2.5,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
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

              {/* ✨ 텍스트 오버레이 */}
              <div
                className={`absolute bottom-6 left-0 right-0 px-4 text-center z-20 transition-opacity duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className={`text-2xl font-bold text-white drop-shadow-[0_2px_6px_rgba(255,255,255,0.3)] tracking-wide transition-all duration-500 ${
                    isActive && loaded
                      ? 'opacity-100 delay-[500ms] translate-y-0'
                      : 'opacity-0 translate-y-3'
                  }`}
                >
                  {item.name}
                </div>
                <div
                  className={`text-base mt-2 text-white drop-shadow-[0_1px_4px_rgba(255,255,255,0.2)] tracking-tight transition-all duration-500 ${
                    isActive && loaded
                      ? 'opacity-100 delay-[800ms] translate-y-0'
                      : 'opacity-0 translate-y-3'
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