import { ProductStatus } from "@/lib/generated/prisma/client";
import type {
  ProductInput,
  ProductSpecificationInput,
} from "@/lib/products/types";
import { createSlug } from "@/lib/products/slug";

type ValidationErrors = Record<string, string>;

export type ProductValidationResult =
  | {
      success: true;
      data: ProductInput;
      errors: ValidationErrors;
    }
  | {
      success: false;
      data: null;
      errors: ValidationErrors;
    };

function getText(
  formData: FormData,
  fieldName: string
): string {
  return String(formData.get(fieldName) ?? "").trim();
}

function getOptionalText(
  formData: FormData,
  fieldName: string
): string | null {
  const value = getText(formData, fieldName);

  return value || null;
}

function getRequiredText(
  formData: FormData,
  fieldName: string,
  label: string,
  errors: ValidationErrors
): string {
  const value = getText(formData, fieldName);

  if (!value) {
    errors[fieldName] = `${label} مطلوب`;
  }

  return value;
}

function getNumber(
  formData: FormData,
  fieldName: string,
  label: string,
  errors: ValidationErrors,
  options: {
    required?: boolean;
    integer?: boolean;
    minimum?: number;
  } = {}
): number | null {
  const rawValue = getText(formData, fieldName);

  if (!rawValue) {
    if (options.required) {
      errors[fieldName] = `${label} مطلوب`;
    }

    return null;
  }

  const value = Number(rawValue);

  if (!Number.isFinite(value)) {
    errors[fieldName] = `${label} غير صحيح`;
    return null;
  }

  if (options.integer && !Number.isInteger(value)) {
    errors[fieldName] = `${label} يجب أن يكون رقمًا صحيحًا`;
    return null;
  }

  if (
    options.minimum !== undefined &&
    value < options.minimum
  ) {
    errors[fieldName] =
      `${label} لا يمكن أن يكون أقل من ${options.minimum}`;

    return null;
  }

  return value;
}

function getStatus(value: string): ProductStatus {
  if (value === ProductStatus.ACTIVE) {
    return ProductStatus.ACTIVE;
  }

  if (value === ProductStatus.ARCHIVED) {
    return ProductStatus.ARCHIVED;
  }

  return ProductStatus.DRAFT;
}

function getSpecifications(
  formData: FormData
): ProductSpecificationInput[] {
  const keysAr = formData.getAll("specificationKeyAr");
  const keysHe = formData.getAll("specificationKeyHe");
  const valuesAr = formData.getAll(
    "specificationValueAr"
  );
  const valuesHe = formData.getAll(
    "specificationValueHe"
  );

  return keysAr
    .map((keyArEntry, index) => ({
      keyAr: String(keyArEntry ?? "").trim(),
      keyHe: String(keysHe[index] ?? "").trim(),
      valueAr: String(valuesAr[index] ?? "").trim(),
      valueHe: String(valuesHe[index] ?? "").trim(),
      sortOrder: index,
    }))
    .filter(
      (item) =>
        item.keyAr &&
        item.keyHe &&
        item.valueAr &&
        item.valueHe
    );
}

export function validateProductForm(
  formData: FormData
): ProductValidationResult {
  const errors: ValidationErrors = {};

  const nameAr = getRequiredText(
    formData,
    "nameAr",
    "اسم المنتج بالعربية",
    errors
  );

  const nameHe = getRequiredText(
    formData,
    "nameHe",
    "اسم المنتج بالعبرية",
    errors
  );

  const rawSlug = getRequiredText(
    formData,
    "slug",
    "رابط المنتج",
    errors
  );

  const slug = createSlug(rawSlug);

  if (rawSlug && !slug) {
    errors.slug =
      "رابط المنتج يجب أن يحتوي على أحرف إنجليزية أو أرقام";
  }

  const rawSku = getRequiredText(
    formData,
    "sku",
    "SKU",
    errors
  );

  const sku = rawSku.toUpperCase();

  const categoryId = getRequiredText(
    formData,
    "categoryId",
    "القسم",
    errors
  );

  const price = getNumber(
    formData,
    "price",
    "سعر البيع",
    errors,
    {
      required: true,
      minimum: 0,
    }
  );

  const compareAtPrice = getNumber(
    formData,
    "compareAtPrice",
    "السعر قبل الخصم",
    errors,
    {
      minimum: 0,
    }
  );

  const costPrice = getNumber(
    formData,
    "costPrice",
    "تكلفة الشراء",
    errors,
    {
      minimum: 0,
    }
  );

  const stock = getNumber(
    formData,
    "stock",
    "الكمية المتوفرة",
    errors,
    {
      required: true,
      integer: true,
      minimum: 0,
    }
  );

  const lowStockAt =
    getNumber(
      formData,
      "lowStockAt",
      "حد التنبيه",
      errors,
      {
        integer: true,
        minimum: 0,
      }
    ) ?? 3;

  if (
    price !== null &&
    compareAtPrice !== null &&
    compareAtPrice <= price
  ) {
    errors.compareAtPrice =
      "السعر قبل الخصم يجب أن يكون أعلى من سعر البيع";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      data: null,
      errors,
    };
  }

  return {
    success: true,
    data: {
      nameAr,
      nameHe,
      descriptionAr: getOptionalText(
        formData,
        "descriptionAr"
      ),
      descriptionHe: getOptionalText(
        formData,
        "descriptionHe"
      ),
      slug,
      sku,
      barcode: getOptionalText(formData, "barcode"),
      mpn: getOptionalText(formData, "mpn"),
      price: price!,
      compareAtPrice,
      costPrice,
      stock: stock!,
      lowStockAt,
      categoryId,
      brandId: getOptionalText(formData, "brandId"),
      status: getStatus(getText(formData, "status")),
      isFeatured:
        formData.get("isFeatured") === "on",
      isNew: formData.get("isNew") === "on",
      specifications: getSpecifications(formData),
    },
    errors: {},
  };
}