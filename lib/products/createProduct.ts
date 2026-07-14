import { prisma } from "@/lib/prisma";
import type { ProductInput } from "@/lib/products/types";

export async function createProductRecord(
  input: ProductInput
) {
  const category = await prisma.category.findUnique({
    where: {
      id: input.categoryId,
    },
    select: {
      id: true,
    },
  });

  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  if (input.brandId) {
    const brand = await prisma.brand.findUnique({
      where: {
        id: input.brandId,
      },
      select: {
        id: true,
      },
    });

    if (!brand) {
      throw new Error("BRAND_NOT_FOUND");
    }
  }

  return prisma.product.create({
    data: {
      nameAr: input.nameAr,
      nameHe: input.nameHe,

      descriptionAr: input.descriptionAr,
      descriptionHe: input.descriptionHe,

      slug: input.slug,
      sku: input.sku,
      barcode: input.barcode,
      mpn: input.mpn,

      price: input.price,
      compareAtPrice: input.compareAtPrice,
      costPrice: input.costPrice,

      stock: input.stock,
      lowStockAt: input.lowStockAt,

      categoryId: input.categoryId,
      brandId: input.brandId,

      status: input.status,
      isFeatured: input.isFeatured,
      isNew: input.isNew,

      specifications: {
        create: input.specifications.map(
          (specification) => ({
            keyAr: specification.keyAr,
            keyHe: specification.keyHe,
            valueAr: specification.valueAr,
            valueHe: specification.valueHe,
            sortOrder: specification.sortOrder,
          })
        ),
      },
    },

    select: {
      id: true,
      slug: true,
      sku: true,
      nameAr: true,
      nameHe: true,
      status: true,
      createdAt: true,
    },
  });
}