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

const categories = ['전체', '동아리 부스', '푸드트럭', '편의시설'] as const;

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

  useEffect(() => {
    async function loadData() {
      const booths = await fetchBooths();
      const foodtrucks = await fetchFoodTrucks();
  
      setBoothList(booths);
      setFoodTruckList(foodtrucks);
  
      dispatch(setBooths(booths)); // (혹시 부스만 Redux에 저장하는 경우)
      dispatch(setFoodTrucks(foodtrucks));
    }
    loadData();
  }, [dispatch]);
  
  const renderList = () => {
    if (selectedCategory === '푸드트럭') {
      return foodTruckList.map((truck) => (
        <motion.div key={`foodtruck-${truck.id}`} variants={itemVariants}>
          <BoothCard
            id={truck.id}
            name={truck.name}
            description={truck.description}
            status={truck.status}
            imageUrl={truck.menuItems[0]?.imageUrl}
            type="foodtruck"
          />
        </motion.div>
      ));
    }
  
    if (selectedCategory === '전체') {
      return (
        <>
          {boothList.map((booth) => (
            <motion.div key={`club-${booth.id}`} variants={itemVariants}>
              <BoothCard
                id={booth.id}
                name={booth.name}
                description={booth.description}
                status={booth.status}
                type="club"
              />
            </motion.div>
          ))}
          {foodTruckList.map((truck) => (
            <motion.div key={`foodtruck-${truck.id}`} variants={itemVariants}>
              <BoothCard
                id={truck.id}
                name={truck.name}
                description={truck.description}
                status={truck.status}
                imageUrl={truck.menuItems[0]?.imageUrl}
                type="foodtruck"
              />
            </motion.div>
          ))}
        </>
      );
    }
  
    if (selectedCategory === '동아리 부스') {
      return boothList.map((booth) => (
        <motion.div key={`club-${booth.id}`} variants={itemVariants}>
          <BoothCard
            id={booth.id}
            name={booth.name}
            description={booth.description}
            status={booth.status}
            type="club"
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