"use client";

import Link from "next/link";
import {
  Heart,
  Monitor,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

type ProductCardProps = {
  slug: string;
  titleHe: string;
  titleAr: string;
  price: number;
  oldPrice?: number;
  badgeHe?: string;
  badgeAr?: string;
};

export default function ProductCard({
  slug,
  titleHe,
  titleAr,
  price,
  oldPrice,
  badgeHe,
  badgeAr,
}: ProductCardProps) {
  const { isHebrew } = useLanguage();

  const title = isHebrew ? titleHe : titleAr;
  const badge = isHebrew ? badgeHe : badgeAr;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      {badge && (
        <span className="absolute start-4 top-4 z-10 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
          {badge}
        </span>
      )}

      <button
        type="button"
        aria-label={isHebrew ? "הוספה למועדפים" : "إضافة إلى المفضلة"}
        className="absolute end-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-orange-300 hover:text-orange-500"
      >
        <Heart size={19} />
      </button>

      <Link
        href={`/product/${slug}`}
        className="flex h-56 items-center justify-center bg-gray-50"
      >
        <Monitor
          size={92}
          strokeWidth={1.2}
          className="text-gray-700 transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-1 text-amber-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={15} fill="currentColor" />
          ))}

          <span className="ms-2 text-xs text-gray-400">(5)</span>
        </div>

        <Link href={`/product/${slug}`}>
          <h3 className="mt-3 min-h-14 text-lg font-bold leading-7 text-gray-800 transition hover:text-orange-600">
            {title}
          </h3>
        </Link>

        <div className="mt-4 flex items-end gap-3">
          <span className="text-2xl font-black text-orange-500">
            ₪{price.toLocaleString()}
          </span>

          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₪{oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        <p className="mt-3 text-sm font-semibold text-green-600">
          {isHebrew ? "במלאי" : "متوفر في المخزون"}
        </p>

        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 py-3 font-bold text-white transition hover:bg-orange-500"
        >
          <ShoppingCart size={19} />

          {isHebrew ? "הוספה לסל" : "أضف إلى السلة"}
        </button>
      </div>
    </article>
  );
}