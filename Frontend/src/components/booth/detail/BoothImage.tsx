'use client';

import Image from 'next/image';

interface BoothImageProps {
  src: string;
  alt: string;
}

export default function BoothImage({ src, alt }: BoothImageProps) {
  return (
    <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-md overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 700px"
      />
    </div>
  );
}