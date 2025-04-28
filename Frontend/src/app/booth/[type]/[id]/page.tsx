'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Booth } from '@/lib/types/booth';
import { FoodTruck } from '@/lib/types/foodtruck';
import { fetchBoothById } from '@/api/getBooth';
import { fetchFoodTruckById } from '@/api/getFoodtruck';
// 편의시설 API도 나중에 필요하면 추가 가능
import { motion } from 'framer-motion';
import BoothImage from '@/components/booth/detail/BoothImage';
import BoothDescription from '@/components/booth/detail/BoothDescription';
import BoothMenuList from '@/components/booth/detail/BoothMenuList';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BoothDetailPage() {
  const router = useRouter();
  const { type, id } = useParams();
  const boothId = Number(id);

  const [booth, setBooth] = useState<Booth | null>(null);
  const [foodTruck, setFoodTruck] = useState<FoodTruck | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        if (type === 'club' || type === 'facility') {
          const boothData = await fetchBoothById(boothId);
          setBooth(boothData);
        } else if (type === 'foodtruck') {
          const foodTruckData = await fetchFoodTruckById(boothId);
          setFoodTruck(foodTruckData);
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

  if (!booth && !foodTruck) {
    return <div className="text-center mt-10 text-gray-400">해당 정보를 찾을 수 없습니다.</div>;
  }

  const name = booth?.name || foodTruck?.name || '';
  const description = booth?.description || foodTruck?.description || '';
  const menus = foodTruck?.menuItems || [];

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 바 */}
      <div className="bg-white h-14 flex items-center px-4 shadow-sm border-b">
        <IconButton onClick={() => router.back()} size="small">
          <ArrowBackIcon className="text-orange-500" />
        </IconButton>
        <div className="flex-1 text-center pr-10">
          <span className="text-base font-bold text-gray-800">부스 상세</span>
        </div>
      </div>

      {/* 본문 */}
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
        {/* 이미지 (푸드트럭은 메뉴 이미지 활용 가능) */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="rounded-xl overflow-hidden shadow-md"
        >
          <BoothImage src="/placeholder.jpg" alt={name} />
        </motion.div>

        {/* 설명 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          className="bg-indigo-50 rounded-xl p-4 shadow-sm"
        >
          <BoothDescription name={name} description={description} />
        </motion.div>

        {/* 메뉴 (푸드트럭만) */}
        {menus.length > 0 && (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="bg-blue-50 rounded-xl p-4 shadow-sm"
          >
            <BoothMenuList menus={menus} />
          </motion.div>
        )}
      </motion.section>
    </div>
  );
}