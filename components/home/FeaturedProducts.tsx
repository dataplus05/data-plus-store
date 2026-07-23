import Link from "next/link";

import ProductCard from "@/components/product/ProductCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      isFeatured: true,
    },
    select: {
      id: true,
      slug: true,
      nameAr: true,
      nameHe: true,
      price: true,
      compareAtPrice: true,
      stock: true,
      isFeatured: true,
      isNew: true,
      images: {
        orderBy: [
          {
            isPrimary: "desc",
          },
          {
            sortOrder: "asc",
          },
        ],
        take: 1,
        select: {
          url: true,
          altAr: true,
          altHe: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  if (products.length === 0) {
    return null;
  }

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
              المنتجات المميزة
              <span className="mx-2 text-gray-300">/</span>
              <span dir="rtl">מוצרים מומלצים</span>
            </h2>

            <p className="mt-3 text-gray-500">
              منتجات مختارة وعروض مميزة من متجر Data Plus.
            </p>
          </div>

          <Link
            href="/shop"
            className="w-fit rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
          >
            جميع المنتجات
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const image = product.images[0];

            return (
              <ProductCard
                key={product.id}
                slug={product.slug}
                titleAr={product.nameAr}
                titleHe={product.nameHe}
                price={Number(product.price)}
                oldPrice={
                  product.compareAtPrice
                    ? Number(product.compareAtPrice)
                    : undefined
                }
                stock={product.stock}
                isFeatured={product.isFeatured}
                isNew={product.isNew}
                imageUrl={image?.url}
                imageAltAr={image?.altAr ?? product.nameAr}
                imageAltHe={image?.altHe ?? product.nameHe}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}