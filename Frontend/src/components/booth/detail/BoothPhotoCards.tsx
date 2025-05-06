'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';

interface BoothPhotoCardsProps {
  photoCards: string[];
}

export default function BoothPhotoCards({ photoCards }: BoothPhotoCardsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (photoCards.length === 0) return null;

  return (
    <div>
      <h2 className="font-semibold text-lg mb-2">포토카드</h2>
      <div className="flex gap-3 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing">
        {photoCards.map((url, idx) => (
          <div
            key={idx}
            className="w-32 h-32 relative flex-shrink-0 rounded-md overflow-hidden"
            onClick={() => setSelectedImage(url)}
          >
            <Image
              src={url}
              alt={`포토카드 ${idx + 1}`}
              fill
              className="object-cover rounded-md"
              sizes="128px"
            />
          </div>
        ))}
      </div>

      {/* 확대 이미지 모달 */}
      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg overflow-hidden max-w-md w-full">
            <div className="relative w-full h-[60vh]">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="확대 이미지"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              )}
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="w-full py-2 text-sm font-medium text-blue-600 bg-gray-100 hover:bg-gray-200"
            >
              닫기
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}