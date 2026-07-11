"use client";

import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { useLanguage } from "@/components/providers/LanguageProvider";

const products = [
  {
    slug: "asus-tuf-gaming",
    titleHe: "מחשב נייד ASUS TUF Gaming",
    titleAr: "لابتوب ASUS TUF Gaming",
    price: 4299,
    oldPrice: 4699,
    badgeHe: "מבצע",
    badgeAr: "خصم",
  },
  {
    slug: "hp-laserjet",
    titleHe: "מדפסת HP LaserJet",
    titleAr: "طابعة HP LaserJet",
    price: 899,
    badgeHe: "חדש",
    badgeAr: "جديد",
  },
  {
    slug: "rtx-5070",
    titleHe: "כרטיס מסך NVIDIA RTX 5070",
    titleAr: "كرت شاشة NVIDIA RTX 5070",
    price: 3199,
    oldPrice: 3399,
    badgeHe: "מחיר מיוחד",
    badgeAr: "سعر خاص",
  },
  {
    slug: "office-chair",
    titleHe: "כיסא מנהלים ארגונומי",
    titleAr: "كرسي مدير مريح",
    price: 699,
    badgeHe: "מומלץ",
    badgeAr: "موصى به",
  },
];

export default function FeaturedProducts() {
  const { isHebrew } = useLanguage();

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              dir="ltr"
              className="text-sm font-black tracking-[0.15em] text-orange-500"
            >
              FEATURED PRODUCTS
            </p>

            <h2 className="mt-2 text-3xl font-black text-gray-950 sm:text-4xl">
              {isHebrew ? "מוצרים מומלצים" : "المنتجات المميزة"}
            </h2>

            <p className="mt-3 text-gray-500">
              {isHebrew
                ? "מבחר מוצרים מומלצים במחירים מיוחדים."
                : "مجموعة مختارة من المنتجات بأسعار مميزة."}
            </p>
          </div>

          <Link
            href="/shop"
            className="w-fit rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
          >
            {isHebrew ? "לכל המוצרים" : "جميع المنتجات"}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}