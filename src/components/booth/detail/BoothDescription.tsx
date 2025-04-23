interface BoothDescriptionProps {
  name: string;
  description: string;
}

export default function BoothDescription({ name, description }: BoothDescriptionProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="mt-2 text-gray-700">{description}</p>
    </div>
  );
}