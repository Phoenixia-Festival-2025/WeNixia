'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import BoothImage from '@/components/booth/detail/BoothImage';
import BoothDescription from '@/components/booth/detail/BoothDescription';
import BoothPhotoCards from '@/components/booth/detail/BoothPhotoCards';
import BoothMenuList from '@/components/booth/detail/BoothMenuList';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BoothDetailClient() {
  const router = useRouter();
  const { id } = useParams();
  const boothId = Number(id);

  const booth = useAppSelector((state: RootState) =>
    state.booth.booths.find((b) => b.id === boothId)
  );

  if (!booth) {
    return <div className="text-center text-gray-400 mt-10">해당 부스 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 바 */}
      <div className="bg-white h-14 flex items-center px-4 shadow-sm border-b">
        <IconButton onClick={() => router.back()} size="small">
          <ArrowBackIcon className="text-orange-500" />
        </IconButton>
        <div className="flex-1 text-center pr-10">
          <span className="text-base font-bold text-gray-800">부스 정보</span>
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
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {/* 대표 이미지 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="rounded-xl overflow-hidden shadow-md"
        >
          <BoothImage src={booth.imageUrl} alt={booth.name} />
        </motion.div>

        {/* 설명 */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          className="bg-indigo-50 rounded-xl p-4 shadow-sm"
        >
          <BoothDescription name={booth.name} description={booth.description} />
        </motion.div>

        {/* 포토카드 */}
        {booth.photoCards && (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="bg-blue-50 rounded-xl p-4 shadow-sm"
          >
            <h3 className="text-sm font-bold text-gray-700 mb-2">📸 포토카드</h3>
            <BoothPhotoCards photoCards={booth.photoCards} />
          </motion.div>
        )}

        {/* 메뉴 */}
        {booth.menus && (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="bg-blue-50 rounded-xl p-4 shadow-sm"
          >
            <BoothMenuList menus={booth.menus} />
          </motion.div>
        )}
      </motion.section>
    </div>
  );
}