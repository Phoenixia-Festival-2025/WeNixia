'use client';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function BoothBanner() {
  return (
    <div className="w-full flex justify-center">
      <Zoom>
        <img
          src="/assets/전체배치도.jpg"
          alt="부스 전체 배치도"
          className="max-w-full h-auto rounded-md"
        />
      </Zoom>
    </div>
  );
}