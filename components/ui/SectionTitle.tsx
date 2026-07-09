type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-10">

      <h2 className="text-4xl font-black text-gray-900">

        {title}

      </h2>

      {subtitle && (
        <p className="text-gray-500 mt-3">

          {subtitle}

        </p>
      )}

    </div>
  );
}