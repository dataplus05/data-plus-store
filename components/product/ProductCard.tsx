"use client";

import Link from "next/link";
import {
  Flame,
  Heart,
  Monitor,
  ShoppingCart,
  Sparkles,
  Star,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";

type ProductCardProps = {
  slug: string;
  titleHe: string;
  titleAr: string;
  price: number;
  oldPrice?: number;
  stock: number;
  isFeatured?: boolean;
  isNew?: boolean;
  imageUrl?: string;
  imageAltAr?: string;
  imageAltHe?: string;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("he-IL", {
    maximumFractionDigits: 2,
  }).format(value);
}

export default function ProductCard({
  slug,
  titleHe,
  titleAr,
  price,
  oldPrice,
  stock,
  isFeatured = false,
  isNew = false,
  imageUrl,
  imageAltAr,
  imageAltHe,
}: ProductCardProps) {
  const { isHebrew } = useLanguage();

  const title = isHebrew ? titleHe : titleAr;
  const imageAlt = isHebrew
    ? imageAltHe ?? titleHe
    : imageAltAr ?? titleAr;

  const hasDiscount =
    typeof oldPrice === "number" && oldPrice > price;

  const discountPercentage = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute start-4 top-4 z-10 flex flex-col items-start gap-2">
        {isFeatured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
            <Flame size={13} />

            {isHebrew ? "מוצר להיט" : "منتج رائج"}
          </span>
        )}

        {isNew && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
            <Sparkles size={13} />

            {isHebrew ? "חדש" : "جديد"}
          </span>
        )}

        {hasDiscount && (
          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
            {isHebrew
              ? `${discountPercentage}% הנחה`
              : `خصم ${discountPercentage}%`}
          </span>
        )}
      </div>

      <button
        type="button"
        aria-label={
          isHebrew
            ? "הוספה למועדפים"
            : "إضافة إلى المفضلة"
        }
        className="absolute end-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-orange-300 hover:text-orange-500"
      >
        <Heart size={19} />
      </button>

      <Link
        href={`/product/${slug}`}
        className="flex h-56 items-center justify-center overflow-hidden bg-gray-50 p-5"
      >
        {imageUrl ? (
          <div
            role="img"
            aria-label={imageAlt}
            className="h-full w-full bg-contain bg-center bg-no-repeat transition duration-300 group-hover:scale-105"
            style={{
              backgroundImage: `url("${imageUrl}")`,
            }}
          />
        ) : (
          <Monitor
            size={92}
            strokeWidth={1.2}
            className="text-gray-700 transition duration-300 group-hover:scale-105"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1 text-gray-300">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={15} />
          ))}

          <span className="ms-2 text-xs text-gray-400">
            (0)
          </span>
        </div>

        <Link href={`/product/${slug}`}>
          <h3 className="mt-3 min-h-14 text-lg font-bold leading-7 text-gray-800 transition hover:text-orange-600">
            {title}
          </h3>
        </Link>

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <span className="text-2xl font-black text-orange-500">
            ₪{formatPrice(price)}
          </span>

          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ₪{formatPrice(oldPrice)}
            </span>
          )}
        </div>

        <p
          className={
            stock > 0
              ? "mt-3 text-sm font-semibold text-green-600"
              : "mt-3 text-sm font-semibold text-red-600"
          }
        >
          {stock > 0
            ? isHebrew
              ? "במלאי"
              : "متوفر في المخزون"
            : isHebrew
              ? "אזל מהמלאי"
              : "غير متوفر في المخزون"}
        </p>

        <button
          type="button"
          disabled={stock <= 0}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 py-3 font-bold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <ShoppingCart size={19} />

          {stock > 0
            ? isHebrew
              ? "הוספה לסל"
              : "أضف إلى السلة"
            : isHebrew
              ? "לא זמין"
              : "غير متوفر"}
        </button>
      </div>
    </article>
  );
}