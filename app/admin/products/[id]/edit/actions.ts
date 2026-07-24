"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { ProductActionState } from "@/lib/products/actionState";
import { checkProductDuplicates } from "@/lib/products/duplicateCheck";
import { updateProductRecord } from "@/lib/products/updateProduct";
import { validateProductForm } from "@/lib/products/validation";

export async function updateProduct(
  productId: string,
  _previousState: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  const validationResult =
    validateProductForm(formData);

  if (!validationResult.success) {
    return {
      success: false,
      message:
        "راجع الحقول المطلوبة ثم حاول مرة أخرى.",
      fieldErrors: validationResult.errors,
    };
  }

  const input = validationResult.data;

  const duplicateErrors =
    await checkProductDuplicates({
      slug: input.slug,
      sku: input.sku,
      barcode: input.barcode,
      mpn: input.mpn,
      excludeProductId: productId,
    });

  if (Object.keys(duplicateErrors).length > 0) {
    return {
      success: false,
      message:
        "توجد بيانات مستخدمة في منتج آخر.",
      fieldErrors: duplicateErrors,
    };
  }

  try {
    await updateProductRecord(productId, input);
  } catch (error) {
    console.error("UPDATE_PRODUCT_ERROR", error);

    if (
      error instanceof Error &&
      error.message === "PRODUCT_NOT_FOUND"
    ) {
      return {
        success: false,
        message: "المنتج المطلوب غير موجود.",
        fieldErrors: {},
      };
    }

    if (
      error instanceof Error &&
      error.message === "CATEGORY_NOT_FOUND"
    ) {
      return {
        success: false,
        message: "القسم المختار غير موجود.",
        fieldErrors: {
          categoryId: "اختر قسمًا صحيحًا.",
        },
      };
    }

    if (
      error instanceof Error &&
      error.message === "BRAND_NOT_FOUND"
    ) {
      return {
        success: false,
        message: "الماركة المختارة غير موجودة.",
        fieldErrors: {
          brandId: "اختر ماركة صحيحة.",
        },
      };
    }

    return {
      success: false,
      message:
        "تعذر تحديث المنتج. تحقق من الاتصال بقاعدة البيانات ثم حاول مرة أخرى.",
      fieldErrors: {},
    };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath(`/product/${input.slug}`);
  revalidatePath(
    `/admin/products/${productId}/edit`
  );

  redirect("/admin/products?updated=1");
}