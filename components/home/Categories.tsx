import Image from "next/image";

const categories = [
  {
    title: "أجهزة كمبيوتر",
    image: "/images/categories/desktop.jpg",
  },
  {
    title: "لابتوبات",
    image: "/images/categories/laptop.jpg",
  },
  {
    title: "Gaming",
    image: "/images/categories/gaming.jpg",
  },
  {
    title: "شاشات",
    image: "/images/categories/monitor.jpg",
  },
  {
    title: "طابعات",
    image: "/images/categories/printer.jpg",
  },
  {
    title: "الأثاث المكتبي",
    image: "/images/categories/furniture.jpg",
  },
  {
    title: "الشبكات",
    image: "/images/categories/network.jpg",
  },
  {
    title: "قطع غيار",
    image: "/images/categories/parts.jpg",
  },
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">

      <h2 className="text-4xl font-black mb-10 text-gray-900">
        تصفح حسب القسم
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {categories.map((category) => (
          <div
            key={category.title}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer overflow-hidden group"
          >
            <div className="relative h-48 bg-gray-100">

              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />

            </div>

            <div className="p-5 text-center">

              <h3 className="font-bold text-lg">
                {category.title}
              </h3>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}