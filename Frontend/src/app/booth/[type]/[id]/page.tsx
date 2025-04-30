'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Booth } from '@/lib/types/booth';
import { FoodTruck } from '@/lib/types/foodtruck';
import { FleaMarket } from '@/lib/types/fleamarket';
import { fetchBoothById } from '@/api/getBooth';
import { fetchFoodTruckById } from '@/api/getFoodtruck';
import { fetchFleaMarketById } from '@/api/getFleaMarket'; // ✅ 추가
import { AnimatePresence, motion } from 'framer-motion';
import BoothImage from '@/components/booth/detail/BoothImage';
import BoothDescription from '@/components/booth/detail/BoothDescription';
import BoothMenuList from '@/components/booth/detail/BoothMenuList';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BoothMapHighlighter from '@/components/booth/detail/\bBoothMapHighlighter';

export default function BoothDetailPage() {
  const router = useRouter();
  const { type, id } = useParams();
  const boothId = Number(id);

  const [booth, setBooth] = useState<Booth | null>(null);
  const [foodTruck, setFoodTruck] = useState<FoodTruck | null>(null);
  const [fleaMarket, setFleaMarket] = useState<FleaMarket | null>(null); // ✅ 추가
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        if (type === 'club' || type === 'facility') {
          const boothData = await fetchBoothById(boothId);
          setBooth(boothData);
        } else if (type === 'foodtruck') {
          const foodTruckData = await fetchFoodTruckById(boothId);
          setFoodTruck(foodTruckData);
        } else if (type === 'flea') {
          const fleaData = await fetchFleaMarketById(boothId); // ✅ 플리마켓 불러오기
          setFleaMarket(fleaData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [type, boothId]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-400">로딩 중...</div>;
  }

  if (!booth && !foodTruck && !fleaMarket) {
    return <div className="text-center mt-10 text-gray-400">해당 정보를 찾을 수 없습니다.</div>;
  }
  console.log(booth);

  const name = booth?.name || foodTruck?.name || fleaMarket?.title || '';
  const description = booth?.description || foodTruck?.description || fleaMarket?.description || '';
  const menus = foodTruck?.menuItems || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white h-14 flex items-center px-4 shadow-sm border-b">
        <IconButton onClick={() => router.back()} size="small">
          <ArrowBackIcon className="text-blue-500" />
        </IconButton>
        <div className="flex-1 text-center pr-10">
          <span className="text-base font-bold text-gray-800">부스 상세</span>
        </div>
      </div>

      <motion.section
        className="p-4 space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2, delayChildren: 0.2 },
          },
        }}
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          className="rounded-xl overflow-hidden shadow-md"
        >
          <BoothImage src="/placeholder.jpg" alt={name} />
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
          className="bg-blue-50 rounded-xl p-4 shadow-sm"
        >
          <BoothDescription name={name} description={description} />
        </motion.div>

        {/* 메뉴는 푸드트럭만 표시 */}
        {menus.length > 0 && (
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="bg-blue-50 rounded-xl p-4 shadow-sm"
          >
            <BoothMenuList menus={menus} />
          </motion.div>
        )}

        {/* 상세 위치 보기 버튼 (club일 때만 표시) */}
        {type === 'club' && (
          <motion.div
            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
            className="flex justify-center"
          >
            <button
              onClick={() => setShowMap((prev) => !prev)}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition"
            >
              <svg
                className={`w-4 h-4 transform transition-transform ${showMap ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              {showMap ? '상세 위치 닫기' : '상세 위치 보기'}
            </button>
          </motion.div>
        )}

        {/* 상세 지도 (club일 때만 표시) */}
        {type === 'club' && (
          <AnimatePresence>
            {showMap && booth?.locationNumber !== undefined && (
              <motion.div
                key="map"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden rounded-xl shadow-md"
              >
                <BoothMapHighlighter boothNumber={booth.locationNumber} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.section>
    </div>
  );
}