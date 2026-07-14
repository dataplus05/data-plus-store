import { prisma } from "@/lib/prisma";

type DuplicateProductInput = {
  slug: string;
  sku: string;
  barcode?: string | null;
};

export type DuplicateProductErrors = Record<
  "slug" | "sku" | "barcode",
  string
>;

export async function checkProductDuplicates({
  slug,
  sku,
  barcode,
}: DuplicateProductInput): Promise<
  Partial<DuplicateProductErrors>
> {
  const conditions = [
    {
      slug,
    },
    {
      sku,
    },
  ];

  if (barcode) {
    conditions.push({
      barcode,
    });
  }

  const product = await prisma.product.findFirst({
    where: {
      OR: conditions,
    },
    select: {
      slug: true,
      sku: true,
      barcode: true,
    },
  });

  if (!product) {
    return {};
  }

  const errors: Partial<DuplicateProductErrors> = {};

  if (product.slug === slug) {
    errors.slug = "رابط المنتج مستخدم مسبقًا";
  }

  if (product.sku === sku) {
    errors.sku = "رمز SKU مستخدم مسبقًا";
  }

  if (barcode && product.barcode === barcode) {
    errors.barcode = "الباركود مستخدم مسبقًا";
  }

  return errors;
}