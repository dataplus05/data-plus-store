"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  Save,
} from "lucide-react";

import BasicInformation from "@/components/admin/product/BasicInformation";
import PricingCard from "@/components/admin/product/PricingCard";
import InventoryCard from "@/components/admin/product/InventoryCard";
import CategoryCard from "@/components/admin/product/CategoryCard";
import SpecificationsCard from "@/components/admin/product/SpecificationsCard";
import ImagesCard from "@/components/admin/product/ImagesCard";

import { createProduct } from "@/app/admin/products/new/actions";

import {
  initialProductState,
  type ProductActionState,
} from "@/lib/products/actionState";

type ProductFormProps = {
  categories: {
    id: string;
    nameAr: string;
    nameHe: string;
  }[];

  brands: {
    id: string;
    name: string;
  }[];
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <>
          <LoaderCircle
            size={19}
            className="animate-spin"
          />
          جاري حفظ المنتج...
        </>
      ) : (
        <>
          <Save size={19} />
          حفظ المنتج
        </>
      )}
    </button>
  );
}

export default function ProductForm({
  categories,
  brands,
}: ProductFormProps) {
  const [state, formAction] = useActionState(
    createProduct,
    initialProductState
  );

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: `${category.nameAr} / ${category.nameHe}`,
  }));

  const brandOptions = brands.map((brand) => ({
    value: brand.id,
    label: brand.name,
  }));

  return (
    <form
      action={formAction}
      className="space-y-6"
    >
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-orange-600"
          >
            <ArrowRight size={18} />
            العودة إلى المنتجات
          </Link>

          <h1 className="mt-3 text-3xl font-black text-gray-950">
            إضافة منتج جديد
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-500">
            أدخل بيانات المنتج بالعربية والعبرية، ثم احفظه
            مباشرة داخل قاعدة بيانات Data Plus.
          </p>
        </div>

        <SubmitButton />
      </section>

      {state.message && !state.success && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4"
        >
          <p className="font-bold text-red-700">
            تعذر حفظ المنتج
          </p>

          <p className="mt-1 text-sm leading-6 text-red-600">
            {state.message}
          </p>
        </div>
      )}

      {state.success && (
        <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-green-700">
          <CheckCircle2 size={22} />

          <p className="font-bold">
            تم حفظ المنتج بنجاح.
          </p>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(330px,1fr)]">
        <div className="space-y-6">
          <BasicInformation
            errors={state.fieldErrors}
          />

          <PricingCard
            errors={state.fieldErrors}
          />

          <InventoryCard
            errors={state.fieldErrors}
          />

          <SpecificationsCard />

          <ImagesCard />
        </div>

        <div className="space-y-6">
          <CategoryCard
            categoryOptions={categoryOptions}
            brandOptions={brandOptions}
            errors={state.fieldErrors}
          />

          <aside className="sticky bottom-4 rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-lg">
            <p className="font-black text-gray-950">
              جاهز لحفظ المنتج؟
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              راجع الاسم، السعر، المخزون، القسم والماركة قبل
              الحفظ.
            </p>

            <div className="mt-5">
              <SubmitButton />
            </div>
          </aside>
        </div>
      </div>
    </form>
  );
}