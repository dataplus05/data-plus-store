import Image from "next/image";

export default function Hero() {
  return (
    <section className="border-b bg-gradient-to-b from-orange-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-orange-100 px-4 py-2 font-semibold text-orange-600">
              عروض Data Plus
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight text-gray-900">
              كل ما تحتاجه
              <br />
              لعالم الكمبيوتر
              <br />
              في مكان واحد
            </h1>

            <p className="mt-8 text-lg leading-8 text-gray-600">
              أجهزة كمبيوتر، لابتوبات، قطع غيار، طابعات، شاشات، ألعاب، أثاث
              مكتبي، وخدمة صيانة احترافية.
            </p>

            <div className="mt-10 flex gap-4">
              <button className="rounded-xl bg-orange-500 px-8 py-4 font-bold text-white transition hover:bg-orange-600">
                تسوق الآن
              </button>

              <button className="rounded-xl border border-gray-300 px-8 py-4 font-bold transition hover:border-orange-500">
                جميع الأقسام
              </button>
            </div>
          </div>

          <div>
            <div className="relative h-[420px] overflow-hidden rounded-3xl border bg-white shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=900"
                alt="Data Plus"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}