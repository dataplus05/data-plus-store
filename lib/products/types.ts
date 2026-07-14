import { ProductStatus } from "@/lib/generated/prisma/client";

export type ProductInput = {
  nameAr: string;
  nameHe: string;

  descriptionAr?: string | null;
  descriptionHe?: string | null;

  slug: string;

  sku: string;
  barcode?: string | null;
  mpn?: string | null;

  price: number;
  compareAtPrice?: number | null;
  costPrice?: number | null;

  stock: number;
  lowStockAt: number;

  categoryId: string;
  brandId?: string | null;

  status: ProductStatus;

  isFeatured: boolean;
  isNew: boolean;

  specifications: ProductSpecificationInput[];
};

export type ProductSpecificationInput = {
  keyAr: string;
  keyHe: string;
  valueAr: string;
  valueHe: string;
  sortOrder: number;
};