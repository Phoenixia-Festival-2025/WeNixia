'use client';

import Image from 'next/image';

interface BoothImageProps {
  src: string;
  alt: string;
}

export default function BoothImage({ src, alt }: BoothImageProps) {
  console.log(src);
  
  return (
    <div className="w-full h-78 relative bg-gray-100 rounded-md overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-fill"
        sizes="(max-width: 768px) 100vw, 700px"
      />
    </div>
  );
}