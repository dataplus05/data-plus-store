export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold">
              عروض Data Plus
            </span>

            <h1 className="text-5xl font-black text-gray-900 mt-6 leading-tight">

              كل ما تحتاجه
              <br />
              لعالم الكمبيوتر
              <br />
              في مكان واحد

            </h1>

            <p className="text-gray-600 text-lg mt-8 leading-8">

              أجهزة كمبيوتر، لابتوبات، قطع غيار،
              طابعات، شاشات، ألعاب، أثاث مكتبي،
              وخدمة صيانة احترافية.

            </p>

            <div className="flex gap-4 mt-10">

              <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-8 py-4 rounded-xl font-bold">

                تسوق الآن

              </button>

              <button className="border border-gray-300 hover:border-orange-500 transition px-8 py-4 rounded-xl font-bold">

                جميع الأقسام

              </button>

            </div>

          </div>

          <div>

            <div className="bg-white rounded-3xl shadow-2xl h-[420px] flex items-center justify-center border">

              <img
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=900"
                alt="Data Plus"
                className="w-full h-full object-cover rounded-3xl"
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}