import Link from "next/link";
import {
  ArrowUpDown,
  CheckCircle2,
  Filter,
  Flame,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type AdminProductsPageProps = {
  searchParams: Promise<{
    q?: string;
    created?: string;
  }>;
};

const productStatusLabels = {
  DRAFT: {
    label: "مسودة",
    className:
      "bg-gray-100 text-gray-700",
  },
  ACTIVE: {
    label: "نشط",
    className:
      "bg-green-50 text-green-700",
  },
  ARCHIVED: {
    label: "مؤرشف",
    className:
      "bg-amber-50 text-amber-700",
  },
} as const;

function formatPrice(value: unknown) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "₪0.00";
  }

  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
}

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const params = await searchParams;
  const searchQuery = params.q?.trim() ?? "";

  const products = await prisma.product.findMany({
    where: searchQuery
      ? {
          OR: [
            {
              nameAr: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
            {
              nameHe: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
            {
              sku: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
            {
              barcode: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
            {
              mpn: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
            {
              brand: {
                name: {
                  contains: searchQuery,
                  mode: "insensitive",
                },
              },
            },
            {
              category: {
                OR: [
                  {
                    nameAr: {
                      contains: searchQuery,
                      mode: "insensitive",
                    },
                  },
                  {
                    nameHe: {
                      contains: searchQuery,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            },
            {
              specifications: {
                some: {
                  OR: [
                    {
                      keyAr: {
                        contains: searchQuery,
                        mode: "insensitive",
                      },
                    },
                    {
                      keyHe: {
                        contains: searchQuery,
                        mode: "insensitive",
                      },
                    },
                    {
                      valueAr: {
                        contains: searchQuery,
                        mode: "insensitive",
                      },
                    },
                    {
                      valueHe: {
                        contains: searchQuery,
                        mode: "insensitive",
                      },
                    },
                  ],
                },
              },
            },
          ],
        }
      : undefined,
    select: {
      id: true,
      nameAr: true,
      nameHe: true,
      sku: true,
      barcode: true,
      mpn: true,
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
        },
      },
      brand: {
        select: {
          name: true,
        },
      },
      images: {
        where: {
          isPrimary: true,
        },
        orderBy: {
          sortOrder: "asc",
        },
        take: 1,
        select: {
          url: true,
          altAr: true,
        },
      },
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-orange-500">
            إدارة الكتالوج
          </p>

          <h1 className="mt-1 text-3xl font-black text-gray-950">
            المنتجات
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            أضف المنتجات وعدّل الأسعار والمخزون وحالة العرض.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600"
        >
          <Plus size={20} />
          إضافة منتج
        </Link>
      </section>

      {params.created === "1" && (
        <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">
          <CheckCircle2
            size={22}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-black">
              تم إنشاء المنتج بنجاح
            </p>

            <p className="mt-1 text-sm text-green-700">
              أصبح المنتج محفوظًا في قاعدة بيانات المتجر.
            </p>
          </div>
        </div>
      )}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <form
            method="GET"
            className="flex flex-1 flex-col gap-3 sm:flex-row"
          >
            <label className="relative block flex-1">
              <span className="sr-only">
                البحث في المنتجات
              </span>

              <input
                type="search"
                name="q"
                defaultValue={searchQuery}
                placeholder="الاسم، SKU، الباركود، MPN أو المواصفات..."
                className="h-11 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 pe-11 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />

              <Search
                size={19}
                className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </label>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              <Search size={18} />
              بحث
            </button>

            {searchQuery && (
              <Link
                href="/admin/products"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-gray-300 px-4 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
              >
                إلغاء البحث
              </Link>
            )}

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
            >
              <Filter size={18} />
              فلترة
            </button>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
            >
              <ArrowUpDown size={18} />
              ترتيب
            </button>
          </form>

          <p className="shrink-0 text-sm text-gray-500">
            عدد المنتجات:{" "}
            <span className="font-black text-gray-900">
              {products.length}
            </span>
          </p>
        </div>

        {/* عرض الهاتف والتابلت */}
        <div className="divide-y divide-gray-100 lg:hidden">
          {products.map((product) => {
            const primaryImage = product.images[0];
            const statusInfo =
              productStatusLabels[product.status];
            const isLowStock =
              product.stock <= product.lowStockAt;

            return (
              <article
                key={product.id}
                className="space-y-4 p-5"
              >
                <div className="flex items-start gap-4">
                  {primaryImage ? (
                    <div
                      role="img"
                      aria-label={
                        primaryImage.altAr ??
                        product.nameAr
                      }
                      className="h-20 w-20 shrink-0 rounded-2xl border border-gray-200 bg-gray-50 bg-contain bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url("${primaryImage.url}")`,
                      }}
                    />
                  ) : (
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                      <Package size={30} />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2">
                      {product.isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-black text-orange-700">
                          <Flame size={13} />
                          מוצר להיט
                        </span>
                      )}

                      {product.isNew && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-700">
                          <Sparkles size={13} />
                          جديد
                        </span>
                      )}
                    </div>

                    <h2 className="mt-2 truncate font-black text-gray-950">
                      {product.nameAr}
                    </h2>

                    <p
                      dir="rtl"
                      className="mt-1 truncate text-sm text-gray-500"
                    >
                      {product.nameHe}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      SKU: {product.sku}
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-4 text-sm">
                  <div>
                    <dt className="text-xs text-gray-500">
                      السعر
                    </dt>

                    <dd className="mt-1 font-black text-gray-950">
                      {formatPrice(product.price)}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs text-gray-500">
                      المخزون
                    </dt>

                    <dd
                      className={
                        isLowStock
                          ? "mt-1 font-black text-red-600"
                          : "mt-1 font-black text-green-700"
                      }
                    >
                      {product.stock}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs text-gray-500">
                      القسم
                    </dt>

                    <dd className="mt-1 font-bold text-gray-800">
                      {product.category.nameAr}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs text-gray-500">
                      الماركة
                    </dt>

                    <dd className="mt-1 font-bold text-gray-800">
                      {product.brand?.name ?? "بدون ماركة"}
                    </dd>
                  </div>
                </dl>

                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${statusInfo.className}`}
                  >
                    {statusInfo.label}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                    >
                      تعديل
                    </Link>

                    <button
                      type="button"
                      aria-label={`إجراءات المنتج ${product.nameAr}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* عرض الحاسوب */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1050px] text-right">
            <thead className="bg-gray-50 text-xs font-bold text-gray-500">
              <tr>
                <th className="px-5 py-4">المنتج</th>
                <th className="px-5 py-4">SKU / MPN</th>
                <th className="px-5 py-4">القسم والماركة</th>
                <th className="px-5 py-4">السعر</th>
                <th className="px-5 py-4">المخزون</th>
                <th className="px-5 py-4">الحالة</th>
                <th className="px-5 py-4">إجراءات</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.map((product) => {
                const primaryImage = product.images[0];
                const statusInfo =
                  productStatusLabels[product.status];
                const isLowStock =
                  product.stock <= product.lowStockAt;

                return (
                  <tr
                    key={product.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {primaryImage ? (
                          <div
                            role="img"
                            aria-label={
                              primaryImage.altAr ??
                              product.nameAr
                            }
                            className="h-14 w-14 shrink-0 rounded-xl border border-gray-200 bg-gray-50 bg-contain bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url("${primaryImage.url}")`,
                            }}
                          />
                        ) : (
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                            <Package size={24} />
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="max-w-64 truncate font-bold text-gray-900">
                              {product.nameAr}
                            </p>

                            {product.isFeatured && (
                              <span
                                title="منتج رائج"
                                className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-[11px] font-black text-orange-700"
                              >
                                <Flame size={12} />
                                מוצר להיט
                              </span>
                            )}

                            {product.isNew && (
                              <span
                                title="منتج جديد"
                                className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-[11px] font-black text-blue-700"
                              >
                                جديد
                              </span>
                            )}
                          </div>

                          <p className="mt-1 max-w-64 truncate text-xs text-gray-500">
                            {product.nameHe}
                          </p>

                          <p className="mt-1 text-[11px] text-gray-400">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-gray-700">
                        {product.sku}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        MPN: {product.mpn ?? "—"}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Barcode: {product.barcode ?? "—"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-gray-700">
                        {product.category.nameAr}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {product.category.nameHe}
                      </p>

                      <p className="mt-1 text-xs font-medium text-orange-600">
                        {product.brand?.name ?? "بدون ماركة"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-black text-gray-950">
                        {formatPrice(product.price)}
                      </p>

                      {product.compareAtPrice && (
                        <p className="mt-1 text-xs text-gray-400 line-through">
                          {formatPrice(
                            product.compareAtPrice
                          )}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={
                          isLowStock
                            ? "rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600"
                            : "rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600"
                        }
                      >
                        {product.stock}
                      </span>

                      {isLowStock && (
                        <p className="mt-2 text-[11px] font-bold text-red-500">
                          مخزون منخفض
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${statusInfo.className}`}
                      >
                        {statusInfo.label}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                        >
                          تعديل
                        </Link>

                        <button
                          type="button"
                          aria-label={`إجراءات المنتج ${product.nameAr}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
              {searchQuery ? (
                <Search size={30} />
              ) : (
                <Package size={30} />
              )}
            </div>

            <h2 className="mt-5 text-lg font-black text-gray-900">
              {searchQuery
                ? "لم نجد منتجات مطابقة"
                : "لا توجد منتجات"}
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              {searchQuery
                ? `لا توجد نتائج للبحث عن “${searchQuery}”. جرّب الاسم أو SKU أو الباركود أو MPN أو إحدى المواصفات.`
                : "أضف أول منتج إلى متجر Data Plus، وسيظهر هنا مباشرة بعد حفظه."}
            </p>

            {searchQuery ? (
              <Link
                href="/admin/products"
                className="mt-5 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
              >
                عرض جميع المنتجات
              </Link>
            ) : (
              <Link
                href="/admin/products/new"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                <Plus size={18} />
                إضافة أول منتج
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}