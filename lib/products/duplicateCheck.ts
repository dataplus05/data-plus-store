import { prisma } from "@/lib/prisma";

type DuplicateCheckInput = {
  slug: string;
  sku?: string | null;
  barcode?: string | null;
  mpn?: string | null;
  excludeProductId?: string;
};

type ProductDuplicateCondition =
  | { slug: string }
  | { sku: string }
  | { barcode: string }
  | { mpn: string };

export type ProductDuplicateErrors = Record<string, string>;

export async function checkProductDuplicates({
  slug,
  sku,
  barcode,
  mpn,
  excludeProductId,
}: DuplicateCheckInput): Promise<ProductDuplicateErrors> {
  const normalizedSlug = slug.trim();
  const normalizedSku = sku?.trim() || null;
  const normalizedBarcode = barcode?.trim() || null;
  const normalizedMpn = mpn?.trim() || null;

  const conditions: ProductDuplicateCondition[] = [];

  if (normalizedSlug) {
    conditions.push({
      slug: normalizedSlug,
    });
  }

  if (normalizedSku) {
    conditions.push({
      sku: normalizedSku,
    });
  }

  if (normalizedBarcode) {
    conditions.push({
      barcode: normalizedBarcode,
    });
  }

  if (normalizedMpn) {
    conditions.push({
      mpn: normalizedMpn,
    });
  }

  if (conditions.length === 0) {
    return {};
  }

  const existingProducts = await prisma.product.findMany({
    where: {
      AND: [
        {
          OR: conditions,
        },
        ...(excludeProductId
          ? [
              {
                id: {
                  not: excludeProductId,
                },
              },
            ]
          : []),
      ],
    },
    select: {
      slug: true,
      sku: true,
      barcode: true,
      mpn: true,
    },
  });

  const errors: ProductDuplicateErrors = {};

  for (const product of existingProducts) {
    if (product.slug === normalizedSlug) {
      errors.slug = "هذا الرابط مستخدم لمنتج آخر.";
    }

    if (normalizedSku && product.sku === normalizedSku) {
      errors.sku = "رمز SKU مستخدم لمنتج آخر.";
    }

    if (
      normalizedBarcode &&
      product.barcode === normalizedBarcode
    ) {
      errors.barcode = "الباركود مستخدم لمنتج آخر.";
    }

    if (normalizedMpn && product.mpn === normalizedMpn) {
      errors.mpn = "رقم MPN مستخدم لمنتج آخر.";
    }
  }

  return errors;
}