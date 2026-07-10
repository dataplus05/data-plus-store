"use client";

import Link from "next/link";
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
import { useLanguage } from "@/components/providers/LanguageProvider";

const categories = [
  {
    slug: "desktops",
    he: "מחשבים נייחים",
    ar: "أجهزة كمبيوتر",
    icon: Server,
  },
  {
    slug: "laptops",
    he: "מחשבים ניידים",
    ar: "لابتوبات",
    icon: Laptop,
  },
  {
    slug: "gaming",
    he: "גיימינג",
    ar: "Gaming",
    icon: Gamepad2,
  },
  {
    slug: "monitors",
    he: "מסכים",
    ar: "شاشات",
    icon: Monitor,
  },
  {
    slug: "printers",
    he: "מדפסות",
    ar: "طابعات",
    icon: Printer,
  },
  {
    slug: "furniture",
    he: "ריהוט משרדי",
    ar: "الأثاث المكتبي",
    icon: Armchair,
  },
  {
    slug: "network",
    he: "רשתות וראוטרים",
    ar: "الشبكات والراوترات",
    icon: Network,
  },
  {
    slug: "components",
    he: "חלקי מחשב",
    ar: "قطع الكمبيوتر",
    icon: Wrench,
  },
];

export default function Categories() {
  const { language, isHebrew } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10">
        <p className="text-sm font-black tracking-[0.15em] text-orange-500">
          CATEGORIES
        </p>

        <h2 className="mt-2 text-3xl font-black text-gray-950 sm:text-4xl">
          {isHebrew ? "קניות לפי קטגוריה" : "تصفح حسب القسم"}
        </h2>

        <p className="mt-3 text-gray-500">
          {isHebrew
            ? "בחרו קטגוריה ומצאו במהירות את המוצר המתאים."
            : "اختر القسم المناسب واعثر على المنتج بسهولة."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group flex min-h-44 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                <Icon size={31} strokeWidth={1.8} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                {category[language]}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}