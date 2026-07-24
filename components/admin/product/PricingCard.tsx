import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

import type {
  PricingFormValues,
  ProductFieldErrors,
} from "@/lib/products/formTypes";

type PricingCardProps = {
  errors?: ProductFieldErrors;
  defaultValues?: Partial<PricingFormValues>;
};

export default function PricingCard({
  errors = {},
  defaultValues = {},
}: PricingCardProps) {
  return (
    <Card
      title="الأسعار"
      description="أدخل أسعار المنتج بالشيكل. تكلفة الشراء لا تظهر للعميل."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Input
          name="price"
          type="number"
          min="0"
          step="0.01"
          label="سعر البيع"
          placeholder="4299"
          defaultValue={defaultValues.price ?? ""}
          hint="السعر الذي سيظهر للعميل."
          error={errors.price}
          required
        />

        <Input
          name="compareAtPrice"
          type="number"
          min="0"
          step="0.01"
          label="السعر قبل الخصم"
          placeholder="4699"
          defaultValue={defaultValues.compareAtPrice ?? ""}
          hint="اختياري. اتركه فارغًا إذا لم يوجد خصم."
          error={errors.compareAtPrice}
        />

        <Input
          name="costPrice"
          type="number"
          min="0"
          step="0.01"
          label="تكلفة الشراء"
          placeholder="3500"
          defaultValue={defaultValues.costPrice ?? ""}
          hint="اختياري ولا يظهر للعميل."
          error={errors.costPrice}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-4">
        <p className="text-sm font-bold text-gray-900">
          ملاحظة مهمة
        </p>

        <p className="mt-1 text-sm leading-6 text-gray-600">
          يجب أن يكون السعر قبل الخصم أعلى من سعر
          البيع حتى يظهر التخفيض بشكل صحيح في المتجر.
        </p>
      </div>
    </Card>
  );
}