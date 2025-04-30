import Image from 'next/image';
import highlightMap from '@/lib/highlightMap';

export default function BoothMapHighlighter({ boothNumber }: { boothNumber: number }) {
  const coords = highlightMap[boothNumber];
  const HIGHLIGHT_SIZE = 22;

  return (
    <div className="relative w-[350px] h-auto mx-auto">
      {/* 어두운 배경 */}
      <Image
        src="/assets/부스상세지도.jpg"
        alt="부스 위치"
        width={350}
        height={350}
        className="w-[350px] h-auto brightness-45 rounded-md"
      />

      {/* 밝은 이미지 (클리핑된 원만 표시) */}
      {coords && (
        <>
          <div
            className="absolute top-0 left-0 w-[350px] h-auto"
            style={{
              clipPath: `circle(${HIGHLIGHT_SIZE / 2}px at ${coords.left} ${coords.top})`,
            }}
          >
            <Image
              src="/assets/부스상세지도.jpg"
              alt="강조된 부스"
              width={350}
              height={350}
              className="w-[350px] h-auto rounded-md"
            />
          </div>

          {/* 강조 테두리 */}
          <div
            className="absolute border-2 border-red-500 rounded-full pointer-events-none"
            style={{
              top: `calc(${coords.top} - ${HIGHLIGHT_SIZE / 2}px)`,
              left: `calc(${coords.left} - ${HIGHLIGHT_SIZE / 2}px)`,
              width: `${HIGHLIGHT_SIZE}px`,
              height: `${HIGHLIGHT_SIZE}px`,
            }}
          />
        </>
      )}
    </div>
  );
}