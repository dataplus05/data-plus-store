"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { ProductStatus } from "@/lib/generated/prisma/client";

export type ProductActionState = {
  success: boolean;
  message: string;
  fieldErrors: Record<string, string>;
};

export const initialProductState: ProductActionState = {
  success: false,
  message: "",
  fieldErrors: {},
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
  errors: Record<string, string>
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
  errors: Record<string, string>,
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

function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
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

export async function createProduct(
  _previousState: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  const fieldErrors: Record<string, string> = {};

  const nameAr = getRequiredText(
    formData,
    "nameAr",
    "اسم المنتج بالعربية",
    fieldErrors
  );

  const nameHe = getRequiredText(
    formData,
    "nameHe",
    "اسم المنتج بالعبرية",
    fieldErrors
  );

  const rawSlug = getRequiredText(
    formData,
    "slug",
    "رابط المنتج",
    fieldErrors
  );

  const slug = normalizeSlug(rawSlug);

  if (rawSlug && !slug) {
    fieldErrors.slug =
      "رابط المنتج يجب أن يحتوي على أحرف إنجليزية أو أرقام";
  }

  const rawSku = getRequiredText(
    formData,
    "sku",
    "SKU",
    fieldErrors
  );

  const sku = rawSku.toUpperCase();

  const categoryId = getRequiredText(
    formData,
    "categoryId",
    "القسم",
    fieldErrors
  );

  const price = getNumber(
    formData,
    "price",
    "سعر البيع",
    fieldErrors,
    {
      required: true,
      minimum: 0,
    }
  );

  const compareAtPrice = getNumber(
    formData,
    "compareAtPrice",
    "السعر قبل الخصم",
    fieldErrors,
    {
      minimum: 0,
    }
  );

  const costPrice = getNumber(
    formData,
    "costPrice",
    "تكلفة الشراء",
    fieldErrors,
    {
      minimum: 0,
    }
  );

  const stock = getNumber(
    formData,
    "stock",
    "الكمية المتوفرة",
    fieldErrors,
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
      fieldErrors,
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
    fieldErrors.compareAtPrice =
      "السعر قبل الخصم يجب أن يكون أعلى من سعر البيع";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: "راجع الحقول المطلوبة ثم حاول مرة أخرى.",
      fieldErrors,
    };
  }

  const barcode = getOptionalText(formData, "barcode");
  const mpn = getOptionalText(formData, "mpn");
  const brandId = getOptionalText(formData, "brandId");

  const status = getStatus(
    getText(formData, "status")
  );

  const categoryExists = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      id: true,
    },
  });

  if (!categoryExists) {
    return {
      success: false,
      message: "القسم المختار غير موجود.",
      fieldErrors: {
        categoryId: "اختر قسمًا صحيحًا",
      },
    };
  }

  if (brandId) {
    const brandExists = await prisma.brand.findUnique({
      where: {
        id: brandId,
      },
      select: {
        id: true,
      },
    });

    if (!brandExists) {
      return {
        success: false,
        message: "الماركة المختارة غير موجودة.",
        fieldErrors: {
          brandId: "اختر ماركة صحيحة",
        },
      };
    }
  }

  const duplicateConditions = [
    {
      slug,
    },
    {
      sku,
    },
  ];

  if (barcode) {
    duplicateConditions.push({
      barcode,
    });
  }

  const existingProduct = await prisma.product.findFirst({
    where: {
      OR: duplicateConditions,
    },
    select: {
      slug: true,
      sku: true,
      barcode: true,
    },
  });

  if (existingProduct) {
    const duplicateErrors: Record<string, string> = {};

    if (existingProduct.slug === slug) {
      duplicateErrors.slug =
        "رابط المنتج مستخدم مسبقًا";
    }

    if (existingProduct.sku === sku) {
      duplicateErrors.sku =
        "رمز SKU مستخدم مسبقًا";
    }

    if (
      barcode &&
      existingProduct.barcode === barcode
    ) {
      duplicateErrors.barcode =
        "الباركود مستخدم مسبقًا";
    }

    return {
      success: false,
      message: "توجد بيانات مستخدمة في منتج آخر.",
      fieldErrors: duplicateErrors,
    };
  }

  const specificationKeysAr = formData.getAll(
    "specificationKeyAr"
  );

  const specificationKeysHe = formData.getAll(
    "specificationKeyHe"
  );

  const specificationValuesAr = formData.getAll(
    "specificationValueAr"
  );

  const specificationValuesHe = formData.getAll(
    "specificationValueHe"
  );

  const specifications = specificationKeysAr
    .map((keyArEntry, index) => {
      return {
        keyAr: String(keyArEntry ?? "").trim(),
        keyHe: String(
          specificationKeysHe[index] ?? ""
        ).trim(),
        valueAr: String(
          specificationValuesAr[index] ?? ""
        ).trim(),
        valueHe: String(
          specificationValuesHe[index] ?? ""
        ).trim(),
        sortOrder: index,
      };
    })
    .filter((specification) => {
      return (
        specification.keyAr &&
        specification.keyHe &&
        specification.valueAr &&
        specification.valueHe
      );
    });

  try {
    await prisma.product.create({
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
        barcode,
        mpn,

        price: price!,
        compareAtPrice,
        costPrice,

        stock: stock!,
        lowStockAt,

        status,

        isFeatured:
          formData.get("isFeatured") === "on",

        isNew:
          formData.get("isNew") === "on",

        categoryId,
        brandId,

        specifications: {
          create: specifications,
        },
      },
    });
  } catch (error) {
    console.error("CREATE_PRODUCT_ERROR", error);

    return {
      success: false,
      message:
        "لم نتمكن من حفظ المنتج. تحقق من الاتصال بقاعدة البيانات وحاول مرة أخرى.",
      fieldErrors: {},
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/");

  redirect("/admin/products?created=1");
}