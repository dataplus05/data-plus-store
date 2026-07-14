import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";

type CategoryOption = {
  value: string;
  label: string;
};

type CategoryCardProps = {
  categoryOptions: CategoryOption[];
  brandOptions: CategoryOption[];
  errors?: Record<string, string>;
};

const statusOptions = [
  {
    value: "DRAFT",
    label: "مسودة",
  },
  {
    value: "ACTIVE",
    label: "نشط ومعروض في المتجر",
  },
  {
    value: "ARCHIVED",
    label: "مؤرشف",
  },
];

export default function CategoryCard({
  categoryOptions,
  brandOptions,
  errors = {},
}: CategoryCardProps) {
  return (
    <div className="space-y-6">
      <Card
        title="التصنيف"
        description="اختر القسم والماركة المرتبطين بالمنتج."
      >
        <div className="space-y-5">
          <Select
            name="categoryId"
            label="القسم"
            placeholder="اختر القسم"
            options={categoryOptions}
            error={errors.categoryId}
            required
          />

          <Select
            name="brandId"
            label="الماركة"
            placeholder="اختر الماركة"
            options={brandOptions}
            error={errors.brandId}
          />
        </div>
      </Card>

      <Card
        title="حالة المنتج"
        description="حدد طريقة ظهور المنتج داخل المتجر."
      >
        <Select
          name="status"
          label="الحالة"
          options={statusOptions}
          defaultValue="DRAFT"
          error={errors.status}
        />

        <div className="mt-5 space-y-4">
          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:border-orange-300 hover:bg-orange-50">
            <div>
              <p className="font-bold text-gray-900">
                منتج مميز
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                يظهر المنتج في قسم المنتجات المميزة في الصفحة الرئيسية.
              </p>
            </div>

            <input
              type="checkbox"
              name="isFeatured"
              className="h-5 w-5 accent-orange-500"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:border-orange-300 hover:bg-orange-50">
            <div>
              <p className="font-bold text-gray-900">
                منتج جديد
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                تظهر شارة منتج جديد على بطاقة المنتج.
              </p>
            </div>

            <input
              type="checkbox"
              name="isNew"
              className="h-5 w-5 accent-orange-500"
            />
          </label>
        </div>
      </Card>
    </div>
  );
}