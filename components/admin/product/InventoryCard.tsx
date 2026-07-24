import {
  Barcode,
  Boxes,
  PackageCheck,
  Tag,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

import type {
  InventoryFormValues,
  ProductFieldErrors,
} from "@/lib/products/formTypes";

type InventoryCardProps = {
  errors?: ProductFieldErrors;
  defaultValues?: Partial<InventoryFormValues>;
};

export default function InventoryCard({
  errors = {},
  defaultValues = {},
}: InventoryCardProps) {
  return (
    <Card
      title="المخزون وتعريف المنتج"
      description="أدخل الرموز الداخلية والكمية وحد التنبيه للمخزون."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <Input
          name="sku"
          label="SKU"
          placeholder="DP-LAP-0001"
          defaultValue={defaultValues.sku ?? ""}
          hint="رمز داخلي فريد خاص بمتجر Data Plus."
          error={errors.sku}
          icon={<Tag size={18} />}
          dir="ltr"
          required
        />

        <Input
          name="barcode"
          label="Barcode"
          placeholder="7290000000000"
          defaultValue={defaultValues.barcode ?? ""}
          hint="اختياري. الباركود الموجود على علبة المنتج."
          error={errors.barcode}
          icon={<Barcode size={18} />}
          dir="ltr"
        />

        <Input
          name="mpn"
          label="MPN"
          placeholder="FA507NV-LP023"
          defaultValue={defaultValues.mpn ?? ""}
          hint="اختياري. رقم القطعة من الشركة المصنعة."
          error={errors.mpn}
          icon={<PackageCheck size={18} />}
          dir="ltr"
        />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Input
          name="stock"
          type="number"
          min="0"
          step="1"
          label="الكمية المتوفرة"
          placeholder="0"
          defaultValue={defaultValues.stock ?? "0"}
          hint="عدد القطع الموجودة حاليًا في المخزون."
          error={errors.stock}
          icon={<Boxes size={18} />}
          required
        />

        <Input
          name="lowStockAt"
          type="number"
          min="0"
          step="1"
          label="حد التنبيه"
          defaultValue={defaultValues.lowStockAt ?? "3"}
          hint="يظهر تنبيه عندما تصل الكمية إلى هذا الرقم."
          error={errors.lowStockAt}
        />
      </div>
    </Card>
  );
}