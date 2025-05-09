'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BoothBanner from '@/components/booth/BoothBanner';
import BoothCategorySelector from '@/components/booth/BoothCategorySelector';
import BoothCard from '@/components/booth/BoothCard';
import { Booth } from '@/lib/types/booth'; // 타입 정리
import { FoodTruck } from '@/lib/types/foodtruck'; // 타입 정리
import { fetchBooths } from '@/api/getBooth'; // api 함수
import { fetchFoodTrucks } from '@/api/getFoodtruck'; // api 함수
import { useAppDispatch } from '@/redux/hooks';
import { setBooths } from '@/redux/modules/booth';
import { setFoodTrucks } from '@/redux/modules/foodTruck';
import { FleaMarket } from '@/lib/types/fleamarket';
import { fetchFleaMarkets } from '@/api/getFleaMarket';

const categories = ['전체', '동아리 / 부스', '푸드트럭', '플리마켓'] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function BoothPage() {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [boothList, setBoothList] = useState<Booth[]>([]);
  const [foodTruckList, setFoodTruckList] = useState<FoodTruck[]>([]);
  const [fleaMarketList, setFleaMarketList] = useState<FleaMarket[]>([]);

  useEffect(() => {
    async function loadData() {
      const booths = await fetchBooths();
      const foodtrucks = await fetchFoodTrucks();
      const fleamarkets = await fetchFleaMarkets();
  
      setBoothList(booths);
      setFoodTruckList(foodtrucks);
      setFleaMarketList(fleamarkets);
  
      dispatch(setBooths(booths));
      dispatch(setFoodTrucks(foodtrucks));
    }
    loadData();
  }, [dispatch]);
  
  const renderList = () => {
    // 푸드트럭
    if (selectedCategory === '푸드트럭') {
      const sorted = [...foodTruckList].sort((a, b) => a.name.localeCompare(b.name));
      return sorted.map((truck) => (
        <motion.div key={`foodtruck-${truck.id}`} variants={itemVariants}>
          <BoothCard
            id={truck.id}
            name={truck.name}
            description={truck.description}
            status={truck.status}
            imageUrl={truck.imageUrl}
            type="foodtruck"
          />
        </motion.div>
      ));
    }

    // 전체
    if (selectedCategory === '전체') {
      const merged = [
        ...boothList.map((booth) => ({
          id: booth.id,
          name: booth.name,
          description: booth.description,
          type: 'club' as const,
          imageUrl: booth.imageUrl,
        })),
        ...foodTruckList.map((truck) => ({
          id: truck.id,
          name: truck.name,
          description: truck.description,
          type: 'foodtruck' as const,
          imageUrl: truck.imageUrl,
        })),
        ...fleaMarketList.map((market) => ({
          id: market.id,
          name: market.title,
          description: market.description,
          type: 'flea' as const,
          imageUrl: undefined,
        })),
      ];

      const sorted = merged.sort((a, b) => a.name.localeCompare(b.name));

      return sorted.map((item) => (
        <motion.div key={`${item.type}-${item.id}`} variants={itemVariants}>
          <BoothCard
            id={item.id}
            name={item.name}
            description={item.description}
            imageUrl={item.imageUrl}
            type={item.type}
            status=""
          />
        </motion.div>
      ));
    }

    // 동아리 / 부스
    if (selectedCategory === '동아리 / 부스') {
      const sorted = [...boothList].sort((a, b) => a.name.localeCompare(b.name));
      return sorted.map((booth) => (
        <motion.div key={`club-${booth.id}`} variants={itemVariants}>
          <BoothCard
            id={booth.id}
            name={booth.name}
            description={booth.description}
            status={booth.status}
            imageUrl={booth.imageUrl}
            type="club"
          />
        </motion.div>
      ));
    }

    // 플리마켓
    if (selectedCategory === '플리마켓') {
      const sorted = [...fleaMarketList].sort((a, b) => a.title.localeCompare(b.title));
      return sorted.map((market) => (
        <motion.div key={`flea-${market.id}`} variants={itemVariants}>
          <BoothCard
            id={market.id}
            name={market.title}
            description={market.description}
            status={market.status}
            type="flea"
          />
        </motion.div>
      ));
    }
  
    // 나머지 (편의시설) 등
    return (
      <div className="text-center text-gray-400">
        해당 카테고리에 해당하는 부스가 없습니다.
      </div>
    );
  };

  return (
    <motion.section
      className="p-4 space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <BoothBanner />
      </motion.div>
      <motion.div variants={itemVariants}>
        <BoothCategorySelector
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-4">
        {renderList()}
      </motion.div>
    </motion.section>
  );
}