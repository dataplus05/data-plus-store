"use client";

import Link from "next/link";

const links = [
  { name: "الرئيسية", href: "/" },
  { name: "المنتجات", href: "/shop" },
  { name: "اللابتوبات", href: "/category/laptops" },
  { name: "أجهزة الكمبيوتر", href: "/category/desktops" },
  { name: "Gaming", href: "/category/gaming" },
  { name: "الشاشات", href: "/category/monitors" },
  { name: "الطابعات", href: "/category/printers" },
  { name: "الأثاث المكتبي", href: "/category/furniture" },
  { name: "العروض", href: "/offers" },
  { name: "اتصل بنا", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-8 h-14 overflow-x-auto whitespace-nowrap">

          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-orange-500 font-medium transition duration-200"
            >
              {link.name}
            </Link>
          ))}

        </div>
      </div>
    </nav>
  );
}