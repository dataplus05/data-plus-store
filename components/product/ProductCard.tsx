type Props = {
  title: string;
  price: string;
};

export default function ProductCard({ title, price }: Props) {
  return (
    <div className="bg-white rounded-2xl border hover:shadow-xl transition overflow-hidden group">

      <div className="h-56 bg-gray-100 flex items-center justify-center text-6xl group-hover:scale-105 transition">

        💻

      </div>

      <div className="p-5">

        <h3 className="font-bold text-lg text-gray-800">

          {title}

        </h3>

        <p className="text-orange-500 text-3xl font-black mt-4">

          ₪ {price}

        </p>

        <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 font-bold transition">

          أضف إلى السلة

        </button>

      </div>

    </div>
  );
}