"use client";

export default function HeroSlider() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">

      <div className="grid lg:grid-cols-3 gap-6">

        {/* البانر الرئيسي */}

        <div className="lg:col-span-2 rounded-3xl overflow-hidden bg-gradient-to-r from-orange-50 via-white to-orange-100 shadow-lg">

          <div className="grid lg:grid-cols-2 min-h-[430px]">

            <div className="flex flex-col justify-center p-10">

              <span className="text-orange-500 font-bold text-lg">
                DATA PLUS
              </span>

              <h1 className="text-5xl font-black text-gray-900 leading-tight mt-5">
                أفضل عروض
                <br />
                أجهزة الكمبيوتر
              </h1>

              <p className="mt-6 text-gray-600 text-lg leading-8">

                أحدث أجهزة الكمبيوتر واللابتوبات وملحقات الألعاب
                بأفضل الأسعار وجودة مضمونة.

              </p>

              <div className="flex gap-4 mt-8">

                <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-8 py-4 rounded-xl font-bold">

                  تسوق الآن

                </button>

                <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 transition px-8 py-4 rounded-xl font-bold">

                  شاهد العروض

                </button>

              </div>

            </div>

            <div className="flex items-center justify-center">

              <div className="w-80 h-80 rounded-full bg-orange-200 flex items-center justify-center text-8xl">

                💻

              </div>

            </div>

          </div>

        </div>

        {/* بطاقات جانبية */}

        <div className="space-y-6">

          <div className="rounded-3xl bg-white shadow-lg p-8 border">

            <div className="text-5xl mb-4">

              🎮

            </div>

            <h3 className="text-2xl font-bold">

              أجهزة Gaming

            </h3>

            <p className="text-gray-600 mt-3">

              خصومات على أحدث أجهزة الألعاب.

            </p>

          </div>

          <div className="rounded-3xl bg-white shadow-lg p-8 border">

            <div className="text-5xl mb-4">

              🪑

            </div>

            <h3 className="text-2xl font-bold">

              الأثاث المكتبي

            </h3>

            <p className="text-gray-600 mt-3">

              مكاتب وكراسي بجودة عالية.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}