"use client";

import { Search } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function SearchBar() {
  const { isHebrew } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:hidden">
      <label className="relative block">
        <span className="sr-only">
          {isHebrew ? "חיפוש מוצרים" : "البحث عن المنتجات"}
        </span>

        <input
          type="search"
          placeholder={
            isHebrew
              ? "חיפוש מחשב, מחשב נייד או מדפסת..."
              : "ابحث عن كمبيوتر، لابتوب أو طابعة..."
          }
          className="h-13 w-full rounded-2xl border border-gray-300 bg-white px-5 pe-13 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        />

        <Search
          size={21}
          className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </label>
    </section>
  );
}