export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl font-black">

              DATA <span className="text-orange-500">PLUS</span>

            </h2>

            <p className="text-gray-400 mt-4 leading-7">

              متجر متخصص في أجهزة الكمبيوتر،
              اللابتوبات، الألعاب، الطابعات،
              الأثاث المكتبي وخدمات الصيانة.

            </p>

          </div>

          <div>

            <h3 className="font-bold text-xl mb-5">

              الأقسام

            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>أجهزة كمبيوتر</li>

              <li>لابتوبات</li>

              <li>شاشات</li>

              <li>قطع غيار</li>

              <li>Gaming</li>

            </ul>

          </div>

          <div>

            <h3 className="font-bold text-xl mb-5">

              خدماتنا

            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>صيانة</li>

              <li>بيع أجهزة</li>

              <li>تركيب شبكات</li>

              <li>استشارات</li>

            </ul>

          </div>

          <div>

            <h3 className="font-bold text-xl mb-5">

              تواصل معنا

            </h3>

            <p className="text-gray-400">

              📞 0546734054

            </p>

            <p className="text-gray-400 mt-3">

              دير الأسد

            </p>

          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">

          © 2026 Data Plus. جميع الحقوق محفوظة.

        </div>

      </div>

    </footer>
  );
}