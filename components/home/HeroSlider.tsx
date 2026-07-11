"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Armchair,
  Gamepad2,
  Laptop,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function HeroSlider() {
  const { isHebrew } = useLanguage();

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-bl from-orange-50 via-white to-amber-50 shadow-sm">
            <div className="absolute -start-20 -top-28 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" />

            <div className="relative grid min-h-[430px] items-center gap-8 px-7 py-12 md:grid-cols-2 md:px-12">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-orange-600 shadow-sm">
                  <ShieldCheck size={17} />

                  {isHebrew
                    ? "מוצרים איכותיים ושירות מקצועי"
                    : "منتجات موثوقة وخدمة احترافية"}
                </div>

                <p
                  dir="ltr"
                  className="mt-7 text-sm font-black tracking-[0.18em] text-orange-500"
                >
                  DATA PLUS
                </p>

                <h1 className="mt-3 max-w-xl text-4xl font-black leading-[1.18] text-gray-950 sm:text-5xl">
                  {isHebrew ? (
                    <>
                      המבצעים הטובים ביותר
                      <span className="block text-orange-500">
                        למחשבים ולטכנולוגיה
                      </span>
                    </>
                  ) : (
                    <>
                      أفضل عروض
                      <span className="block text-orange-500">
                        أجهزة الكمبيوتر
                      </span>
                    </>
                  )}
                </h1>

                <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
                  {isHebrew
                    ? "מחשבים, מחשבים ניידים, מסכים, מדפסות, ציוד גיימינג וריהוט משרדי במחירים מצוינים."
                    : "أحدث أجهزة الكمبيوتر واللابتوبات وملحقات الألعاب بأفضل الأسعار وجودة مضمونة."}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-orange-600"
                  >
                    {isHebrew ? "קנו עכשיו" : "تسوق الآن"}

                    <ArrowLeft size={19} />
                  </Link>

                  <Link
                    href="/offers"
                    className="inline-flex items-center gap-2 rounded-xl border border-orange-400 bg-white px-6 py-3.5 font-bold text-orange-600 transition hover:bg-orange-50"
                  >
                    {isHebrew ? "צפו במבצעים" : "شاهد العروض"}
                  </Link>
                </div>
              </div>

              <div className="relative flex min-h-72 items-center justify-center">
                <div className="absolute h-64 w-64 rounded-full bg-orange-200/70" />

                <div className="relative flex h-52 w-64 items-center justify-center rounded-3xl sm:h-60 sm:w-72">
                  <Laptop
                    size={112}
                    strokeWidth={1.25}
                    className="text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              href="/category/gaming"
              className="group rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Gamepad2 size={43} className="text-orange-500" />

              <h2 className="mt-7 text-2xl font-black text-gray-950">
                {isHebrew ? "ציוד גיימינג" : "أجهزة Gaming"}
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                {isHebrew
                  ? "מחשבים, קונסולות ואביזרים לגיימרים."
                  : "خصومات على أحدث أجهزة الألعاب."}
              </p>
            </Link>

            <Link
              href="/category/furniture"
              className="group rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Armchair size={43} className="text-orange-500" />

              <h2 className="mt-7 text-2xl font-black text-gray-950">
                {isHebrew ? "ריהוט משרדי" : "الأثاث المكتبي"}
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                {isHebrew
                  ? "שולחנות וכיסאות באיכות גבוהה."
                  : "مكاتب وكراسي بجودة عالية."}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}