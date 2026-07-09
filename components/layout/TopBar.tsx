import { Phone, Globe, LogIn, Truck } from "lucide-react";
import { site } from "@/lib/site";

export default function TopBar() {
  return (
    <div className="bg-gray-900 text-white text-sm">
      <div className="max-w-7xl mx-auto h-10 px-6 flex items-center justify-between">

        <div className="flex items-center gap-6">

          <div className="flex items-center gap-2">
            <Phone size={15} />
            <span>{site.phone}</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Truck size={15} />
            <span>توصيل سريع إلى جميع المناطق</span>
          </div>

        </div>

        <div className="flex items-center gap-6">

          <button className="flex items-center gap-2 hover:text-orange-400 transition">
            <Globe size={15} />
            العربية | עברית
          </button>

          <button className="flex items-center gap-2 hover:text-orange-400 transition">
            <LogIn size={15} />
            تسجيل الدخول
          </button>

        </div>

      </div>
    </div>
  );
}