export type ProductStatus =
  | "DRAFT"
  | "ACTIVE"
  | "ARCHIVED";

export type ProductSpecificationFormValue = {
  keyAr: string;
  keyHe: string;
  valueAr: string;
  valueHe: string;
};

export type ProductFormValues = {
  nameAr: string;
  nameHe: string;
  descriptionAr: string;
  descriptionHe: string;
  slug: string;

  sku: string;
  barcode: string;
  mpn: string;

  price: string;
  compareAtPrice: string;
  costPrice: string;

  stock: string;
  lowStockAt: string;

  categoryId: string;
  brandId: string;

  status: ProductStatus;
  isFeatured: boolean;
  isNew: boolean;

  specifications: ProductSpecificationFormValue[];
};

export type BasicInformationFormValues = Pick<
  ProductFormValues,
  | "nameAr"
  | "nameHe"
  | "descriptionAr"
  | "descriptionHe"
  | "slug"
>;

export type PricingFormValues = Pick<
  ProductFormValues,
  "price" | "compareAtPrice" | "costPrice"
>;

export type InventoryFormValues = Pick<
  ProductFormValues,
  "sku" | "barcode" | "mpn" | "stock" | "lowStockAt"
>;

export type CategoryFormValues = Pick<
  ProductFormValues,
  | "categoryId"
  | "brandId"
  | "status"
  | "isFeatured"
  | "isNew"
>;

export type ProductFieldErrors = Record<string, string>;

export type SelectOption = {
  value: string;
  label: string;
};