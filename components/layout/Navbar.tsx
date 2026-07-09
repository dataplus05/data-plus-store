export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6">

        <ul className="flex items-center gap-10 h-14 font-medium text-gray-700">

          <li className="text-orange-500 cursor-pointer">
            الرئيسية
          </li>

          <li className="cursor-pointer hover:text-orange-500 transition">
            المتجر
          </li>

          <li className="cursor-pointer hover:text-orange-500 transition">
            العروض
          </li>

          <li className="cursor-pointer hover:text-orange-500 transition">
            الصيانة
          </li>

          <li className="cursor-pointer hover:text-orange-500 transition">
            الأثاث المكتبي
          </li>

          <li className="cursor-pointer hover:text-orange-500 transition">
            اتصل بنا
          </li>

        </ul>

      </div>

    </nav>
  );
}