"use client";

import Link from "next/link";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Header() {
  const { isHebrew } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex min-h-20 items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-lg font-black text-white shadow-sm">
              DP
            </div>

            <div>
              <div
                dir="ltr"
                className="text-xl font-black tracking-tight text-gray-950 sm:text-2xl"
              >
                DATA <span className="text-orange-500">PLUS</span>
              </div>

              <div className="text-xs text-gray-500">
                {isHebrew ? "דאתא פלוס" : "داتا بلوس"}
              </div>
            </div>
          </Link>

          <div className="hidden max-w-2xl flex-1 lg:block">
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
                className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-5 pe-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />

              <Search
                size={20}
                className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </label>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label={isHebrew ? "מועדפים" : "المفضلة"}
              className="hidden h-11 w-11 items-center justify-center rounded-xl text-gray-700 transition hover:bg-orange-50 hover:text-orange-600 sm:flex"
            >
              <Heart size={22} />
            </button>

            <button
              type="button"
              aria-label={isHebrew ? "החשבון שלי" : "حسابي"}
              className="hidden h-11 w-11 items-center justify-center rounded-xl text-gray-700 transition hover:bg-orange-50 hover:text-orange-600 sm:flex"
            >
              <UserRound size={22} />
            </button>

            <button
              type="button"
              aria-label={isHebrew ? "עגלת קניות" : "سلة المشتريات"}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
            >
              <ShoppingCart size={23} />

              <span className="absolute end-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                0
              </span>
            </button>

            <Link
              href="/login"
              className="hidden rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600 md:block"
            >
              {isHebrew ? "התחברות" : "تسجيل الدخول"}
            </Link>

            <button
              type="button"
              aria-label={isHebrew ? "פתיחת תפריט" : "فتح القائمة"}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-700 transition hover:bg-orange-50 hover:text-orange-600 lg:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        <div className="pb-4 lg:hidden">
          <label className="relative block">
            <span className="sr-only">
              {isHebrew ? "חיפוש מוצרים" : "البحث عن المنتجات"}
            </span>

            <input
              type="search"
              placeholder={
                isHebrew ? "מה אתם מחפשים?" : "عن ماذا تبحث؟"
              }
              className="h-11 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 pe-11 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />

            <Search
              size={19}
              className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </label>
        </div>
      </div>
    </header>
  );
}