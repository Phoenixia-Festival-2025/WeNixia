'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BoothBanner from '@/components/booth/BoothBanner';
import BoothMap from '@/components/booth/BoothMap';
import BoothCategorySelector from '@/components/booth/BoothCategorySelector';
import BoothCard from '@/components/booth/BoothCard';
import { booths } from '@/lib/boothData';
import { setBooths } from '@/redux/modules/booth';
import { useAppDispatch } from '@/redux/hooks';

const categories = ['전체', '동아리 부스', '푸드트럭', '편의시설'] as const;

// 애니메이션 설정
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

  useEffect(() => {
    dispatch(setBooths(booths));
  }, [dispatch]);

  const filteredBooths =
    selectedCategory === '전체'
      ? booths
      : booths.filter((booth) => booth.category === selectedCategory);

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
        <BoothMap />
      </motion.div>
      <motion.div variants={itemVariants}>
        <BoothCategorySelector
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-4">
        {filteredBooths.map((booth) => (
          <motion.div key={booth.id} variants={itemVariants}>
            <BoothCard key={booth.id} {...booth} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}