import Image from 'next/image';

export default function TimeTableBanner() {
  return (
    <div className="w-full flex justify-center">
      <Image
        src="/assets/위닉시아배너.jpg"
        alt="배너 이미지"
        width={768}
        height={288} // 원하는 비율로 수정
        className="rounded-md object-cover w-full h-auto"
        priority
      />
    </div>
  );
}