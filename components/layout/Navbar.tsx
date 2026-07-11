"use client";

import Link from "next/link";
import { ChevronDown, Flame } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const navigation = [
  {
    href: "/",
    he: "ראשי",
    ar: "الرئيسية",
  },
  {
    href: "/shop",
    he: "מוצרים",
    ar: "المنتجات",
  },
  {
    href: "/category/laptops",
    he: "מחשבים ניידים",
    ar: "اللابتوبات",
  },
  {
    href: "/category/desktops",
    he: "מחשבים נייחים",
    ar: "أجهزة الكمبيوتر",
  },
  {
    href: "/category/gaming",
    he: "גיימינג",
    ar: "Gaming",
  },
  {
    href: "/category/monitors",
    he: "מסכים",
    ar: "الشاشات",
  },
  {
    href: "/category/printers",
    he: "מדפסות",
    ar: "الطابعات",
  },
  {
    href: "/category/furniture",
    he: "ריהוט משרדי",
    ar: "الأثاث المكتبي",
  },
  {
    href: "/offers",
    he: "מבצעים",
    ar: "العروض",
  },
  {
    href: "/contact",
    he: "צור קשר",
    ar: "اتصل بنا",
  },
];

export default function Navbar() {
  const { language, isHebrew } = useLanguage();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 sm:px-6">
        <button
          type="button"
          className="my-2 flex shrink-0 items-center gap-2 rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gray-800"
        >
          <span>
            {isHebrew ? "כל הקטגוריות" : "جميع الأقسام"}
          </span>

          <ChevronDown size={16} />
        </button>

        <div className="flex min-h-14 items-center gap-1 whitespace-nowrap">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
            >
              {item[language]}
            </Link>
          ))}

          <Link
            href="/offers"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold text-orange-600 transition hover:bg-orange-50"
          >
            <Flame size={17} />

            {isHebrew ? "מבצעים חמים" : "عروض مميزة"}
          </Link>
        </div>
      </div>
    </nav>
  );
}