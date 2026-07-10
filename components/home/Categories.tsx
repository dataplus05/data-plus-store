import {
  Armchair,
  Gamepad2,
  Laptop,
  Monitor,
  Network,
  Printer,
  Server,
  Wrench,
} from "lucide-react";

const categories = [
  {
    title: "أجهزة كمبيوتر",
    icon: Server,
  },
  {
    title: "لابتوبات",
    icon: Laptop,
  },
  {
    title: "Gaming",
    icon: Gamepad2,
  },
  {
    title: "شاشات",
    icon: Monitor,
  },
  {
    title: "طابعات",
    icon: Printer,
  },
  {
    title: "الأثاث المكتبي",
    icon: Armchair,
  },
  {
    title: "الشبكات",
    icon: Network,
  },
  {
    title: "قطع غيار",
    icon: Wrench,
  },
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900">
          تصفح حسب القسم
        </h2>

        <p className="mt-3 text-gray-500">
          اختر القسم المناسب وابحث عن المنتجات بسهولة
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.title}
              type="button"
              className="group flex min-h-44 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                <Icon size={31} strokeWidth={1.8} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                {category.title}
              </h3>
            </button>
          );
        })}
      </div>
    </section>
  );
}