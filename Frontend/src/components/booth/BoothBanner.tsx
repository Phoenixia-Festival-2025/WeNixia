'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Image from 'next/image';

export default function BoothBanner() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="space-y-4 flex flex-col items-center">
      {/* 이미지 & 버튼 공통 wrapper */}
      <div className="w-full max-w-md space-y-3">
        {/* 전체 배치도 */}
        <div className="relative w-full flex justify-center">
          <Zoom>
            <Image
              src="/assets/전체배치도.jpg"
              alt="부스 전체 배치도"
              width={768}
              height={512}
              className="rounded-md w-full h-auto object-contain"
              priority
            />
          </Zoom>
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md pointer-events-none">
            클릭하여 확대
          </div>
        </div>

        {/* 토글 버튼 */}
        <button
          onClick={() => setShowDetails((prev) => !prev)}
          className="w-full text-sm px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
        >
          {showDetails ? '부스 설명 접기' : '부스 번호 설명 보기'}
        </button>
      </div>

      {/* 부스 번호 설명 이미지 */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden w-full max-w-md"
          >
            <Zoom>
              <Image
                src="/assets/부스안내.jpg"
                alt="부스 번호 설명"
                width={768}
                height={512}
                className="rounded-md w-full h-auto object-contain"
                priority
              />
            </Zoom>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}