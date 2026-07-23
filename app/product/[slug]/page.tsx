import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Package,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPrice(value: unknown) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "₪0";
  }

  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 2,
  }).format(numericValue);
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      slug: true,
      sku: true,
      barcode: true,
      mpn: true,
      nameAr: true,
      nameHe: true,
      descriptionAr: true,
      descriptionHe: true,
      price: true,
      compareAtPrice: true,
      stock: true,
      lowStockAt: true,
      status: true,
      isFeatured: true,
      isNew: true,
      category: {
        select: {
          nameAr: true,
          nameHe: true,
          slug: true,
        },
      },
      brand: {
        select: {
          name: true,
        },
      },
      images: {
        orderBy: [
          {
            isPrimary: "desc",
          },
          {
            sortOrder: "asc",
          },
        ],
        select: {
          id: true,
          url: true,
          altAr: true,
          altHe: true,
        },
      },
      specifications: {
        orderBy: {
          sortOrder: "asc",
        },
        select: {
          id: true,
          keyAr: true,
          keyHe: true,
          valueAr: true,
          valueHe: true,
        },
      },
    },
  });

  if (!product || product.status !== "ACTIVE") {
    notFound();
  }

  const primaryImage = product.images[0];

  const hasDiscount =
    product.compareAtPrice !== null &&
    Number(product.compareAtPrice) > Number(product.price);

  const discountPercentage = hasDiscount
    ? Math.round(
        ((Number(product.compareAtPrice) - Number(product.price)) /
          Number(product.compareAtPrice)) *
          100
      )
    : 0;

  const isLowStock =
    product.stock > 0 && product.stock <= product.lowStockAt;

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link
            href="/"
            className="transition hover:text-orange-600"
          >
            الرئيسية
          </Link>

          <span>/</span>

          <Link
            href="/shop"
            className="transition hover:text-orange-600"
          >
            المنتجات
          </Link>

          <span>/</span>

          <span className="font-bold text-gray-800">
            {product.nameAr}
          </span>
        </nav>

        <section className="grid gap-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm lg:grid-cols-2 lg:p-8">
          <div>
            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-2xl bg-gray-50 p-6 sm:min-h-[480px]">
              <div className="absolute start-4 top-4 z-10 flex flex-col gap-2">
                {product.isFeatured && (
                  <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-white">
                    מוצר להיט / منتج رائج
                  </span>
                )}

                {product.isNew && (
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">
                    חדש / جديد
                  </span>
                )}

                {hasDiscount && (
                  <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white">
                    خصم {discountPercentage}%
                  </span>
                )}
              </div>

              {primaryImage ? (
                <div
                  role="img"
                  aria-label={
                    primaryImage.altAr ?? product.nameAr
                  }
                  className="h-full min-h-[300px] w-full bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url("${primaryImage.url}")`,
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-4 text-gray-400">
                  <Package size={120} strokeWidth={1.1} />

                  <p className="text-sm font-bold">
                    لا توجد صورة للمنتج بعد
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <Link
              href={`/shop?category=${product.category.slug}`}
              className="w-fit text-sm font-black text-orange-600 transition hover:text-orange-700"
            >
              {product.category.nameAr}
            </Link>

            <h1 className="mt-3 text-3xl font-black leading-tight text-gray-950 sm:text-4xl">
              {product.nameAr}
            </h1>

            <p
              dir="rtl"
              className="mt-2 text-lg font-bold text-gray-500"
            >
              {product.nameHe}
            </p>

            {product.brand && (
              <p className="mt-3 text-sm text-gray-500">
                الماركة:{" "}
                <span className="font-black text-gray-800">
                  {product.brand.name}
                </span>
              </p>
            )}

            <div className="mt-5 flex items-center gap-1 text-gray-300">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={18} />
              ))}

              <span className="ms-2 text-sm text-gray-400">
                لا توجد تقييمات بعد
              </span>
            </div>

            <div className="mt-7 flex flex-wrap items-end gap-4">
              <span className="text-4xl font-black text-orange-500">
                {formatPrice(product.price)}
              </span>

              {hasDiscount && (
                <span className="pb-1 text-lg text-gray-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              {product.stock > 0 ? (
                <div className="flex items-center gap-3 text-green-700">
                  <CheckCircle2 size={22} />

                  <div>
                    <p className="font-black">
                      متوفر في المخزون
                    </p>

                    <p className="mt-1 text-sm text-green-600">
                      الكمية المتوفرة: {product.stock}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="font-black text-red-600">
                  غير متوفر في المخزون
                </p>
              )}

              {isLowStock && (
                <p className="mt-3 text-sm font-bold text-amber-600">
                  بقيت كمية قليلة فقط.
                </p>
              )}
            </div>

            {(product.descriptionAr ||
              product.descriptionHe) && (
              <div className="mt-6 space-y-3 text-sm leading-7 text-gray-600">
                {product.descriptionAr && (
                  <p>{product.descriptionAr}</p>
                )}

                {product.descriptionHe && (
                  <p dir="rtl">{product.descriptionHe}</p>
                )}
              </div>
            )}

            <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
              <button
                type="button"
                disabled={product.stock <= 0}
                className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 font-black text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <ShoppingCart size={21} />

                {product.stock > 0
                  ? "أضف إلى السلة"
                  : "غير متوفر"}
              </button>

              <button
                type="button"
                aria-label="إضافة إلى المفضلة"
                className="flex min-h-14 items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
              >
                <Heart size={21} />
                المفضلة
              </button>
            </div>

            <div className="mt-7 grid gap-3 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4">
                <ShieldCheck
                  size={24}
                  className="text-orange-500"
                />

                <div>
                  <p className="font-black text-gray-900">
                    دفع آمن
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    بيانات البطاقة لا تُخزن في الموقع.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4">
                <Truck
                  size={24}
                  className="text-orange-500"
                />

                <div>
                  <p className="font-black text-gray-900">
                    توصيل الطلبات
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    تفاصيل التوصيل تظهر عند إتمام الطلب.
                  </p>
                </div>
              </div>
            </div>

            <dl className="mt-7 grid gap-3 border-t border-gray-100 pt-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-gray-500">SKU</dt>
                <dd className="mt-1 font-bold text-gray-900">
                  {product.sku}
                </dd>
              </div>

              <div>
                <dt className="text-gray-500">MPN</dt>
                <dd className="mt-1 font-bold text-gray-900">
                  {product.mpn ?? "—"}
                </dd>
              </div>

              <div>
                <dt className="text-gray-500">Barcode</dt>
                <dd className="mt-1 font-bold text-gray-900">
                  {product.barcode ?? "—"}
                </dd>
              </div>

              <div>
                <dt className="text-gray-500">القسم</dt>
                <dd className="mt-1 font-bold text-gray-900">
                  {product.category.nameAr}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {product.specifications.length > 0 && (
          <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-2xl font-black text-gray-950">
              مواصفات المنتج
            </h2>

            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
              {product.specifications.map(
                (specification, index) => (
                  <div
                    key={specification.id}
                    className={`grid gap-3 p-4 sm:grid-cols-2 ${
                      index % 2 === 0
                        ? "bg-gray-50"
                        : "bg-white"
                    }`}
                  >
                    <div>
                      <p className="font-black text-gray-900">
                        {specification.keyAr}
                      </p>

                      <p
                        dir="rtl"
                        className="mt-1 text-sm text-gray-500"
                      >
                        {specification.keyHe}
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-gray-800">
                        {specification.valueAr}
                      </p>

                      <p
                        dir="rtl"
                        className="mt-1 text-sm text-gray-500"
                      >
                        {specification.valueHe}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-black text-orange-600 transition hover:text-orange-700"
        >
          <ArrowRight size={18} />
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </main>
  );
}