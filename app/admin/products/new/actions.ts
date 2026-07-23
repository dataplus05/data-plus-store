"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { validateProductForm } from "@/lib/products/validation";
import { checkProductDuplicates } from "@/lib/products/duplicateCheck";
import { createProductRecord } from "@/lib/products/createProduct";

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

export async function createProduct(
  _previousState: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  const validationResult = validateProductForm(formData);

  if (!validationResult.success) {
    return {
      success: false,
      message: "راجع الحقول المطلوبة ثم حاول مرة أخرى.",
      fieldErrors: validationResult.errors,
    };
  }

  const input = validationResult.data;

  const duplicateErrors = await checkProductDuplicates({
    slug: input.slug,
    sku: input.sku,
    barcode: input.barcode,
  });

  if (Object.keys(duplicateErrors).length > 0) {
    return {
      success: false,
      message: "توجد بيانات مستخدمة في منتج آخر.",
      fieldErrors: duplicateErrors,
    };
  }

  try {
    await createProductRecord(input);
  } catch (error) {
    console.error("CREATE_PRODUCT_ERROR", error);

    if (
      error instanceof Error &&
      error.message === "CATEGORY_NOT_FOUND"
    ) {
      return {
        success: false,
        message: "القسم المختار غير موجود.",
        fieldErrors: {
          categoryId: "اختر قسمًا صحيحًا",
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
          brandId: "اختر ماركة صحيحة",
        },
      };
    }

    return {
      success: false,
      message:
        "تعذر حفظ المنتج. تحقق من الاتصال بقاعدة البيانات ثم حاول مرة أخرى.",
      fieldErrors: {},
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/");

  redirect("/admin/products?created=1");
}