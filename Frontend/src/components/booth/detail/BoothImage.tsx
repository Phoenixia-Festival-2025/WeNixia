interface BoothImageProps {
  src: string;
  alt: string;
}

export default function BoothImage({ src, alt }: BoothImageProps) {
  return (
    <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden">
      <img src={src} alt={alt} className="object-cover w-full h-full" />
    </div>
  );
}