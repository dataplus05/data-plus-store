"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

const brands = [
  { name: "HP", slug: "hp" },
  { name: "DELL", slug: "dell" },
  { name: "LENOVO", slug: "lenovo" },
  { name: "ASUS", slug: "asus" },
  { name: "MSI", slug: "msi" },
  { name: "INTEL", slug: "intel" },
  { name: "AMD", slug: "amd" },
  { name: "NVIDIA", slug: "nvidia" },
  { name: "LOGITECH", slug: "logitech" },
  { name: "TP-LINK", slug: "tp-link" },
  { name: "CANON", slug: "canon" },
  { name: "EPSON", slug: "epson" },
];

export default function Brands() {
  const { isHebrew } = useLanguage();

  return (
    <section className="border-y border-gray-100 bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black tracking-[0.15em] text-orange-500">
              TOP BRANDS
            </p>

            <h2 className="mt-2 text-3xl font-black text-gray-950 sm:text-4xl">
              {isHebrew
                ? "המותגים המובילים בעולם"
                : "أشهر العلامات التجارية"}
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-gray-500">
              {isHebrew
                ? "מוצרים מקוריים ממותגים מובילים בתחום המחשבים, הגיימינג, ההדפסה והרשתות."
                : "منتجات أصلية من أبرز الشركات في عالم الكمبيوتر، الألعاب، الطباعة والشبكات."}
            </p>
          </div>

          <Link
            href="/brands"
            className="w-fit rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
          >
            {isHebrew ? "כל המותגים" : "جميع الماركات"}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brand/${brand.slug}`}
              className="group flex h-24 items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
            >
              <span
                dir="ltr"
                className="text-center text-lg font-black tracking-wide text-gray-700 transition group-hover:text-orange-600"
              >
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}