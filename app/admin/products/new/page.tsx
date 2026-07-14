"use client";

import Link from "next/link";
import {
  ArrowRight,
  Barcode,
  Boxes,
  ImagePlus,
  PackageCheck,
  Plus,
  Save,
  Tag,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

type Specification = {
  id: number;
  keyAr: string;
  keyHe: string;
  valueAr: string;
  valueHe: string;
};

const categoryOptions = [
  { value: "laptops", label: "لابتوبات / מחשבים ניידים" },
  { value: "desktops", label: "أجهزة كمبيوتر / מחשבים נייחים" },
  { value: "gaming", label: "Gaming / גיימינג" },
  { value: "monitors", label: "شاشات / מסכים" },
  { value: "printers", label: "طابعات / מדפסות" },
  { value: "network", label: "شبكات وراوترات / רשתות וראוטרים" },
  { value: "furniture", label: "أثاث مكتبي / ריהוט משרדי" },
  { value: "components", label: "قطع كمبيوتر / חלקי מחשב" },
];

const brandOptions = [
  { value: "asus", label: "ASUS" },
  { value: "hp", label: "HP" },
  { value: "dell", label: "Dell" },
  { value: "lenovo", label: "Lenovo" },
  { value: "msi", label: "MSI" },
  { value: "logitech", label: "Logitech" },
  { value: "tp-link", label: "TP-Link" },
  { value: "other", label: "ماركة أخرى" },
];

const statusOptions = [
  { value: "DRAFT", label: "مسودة" },
  { value: "ACTIVE", label: "نشط ومعروض في المتجر" },
  { value: "ARCHIVED", label: "مؤرشف" },
];

export default function NewProductPage() {
  const [specifications, setSpecifications] = useState<
    Specification[]
  >([
    {
      id: 1,
      keyAr: "",
      keyHe: "",
      valueAr: "",
      valueHe: "",
    },
  ]);

  function addSpecification() {
    setSpecifications((current) => [
      ...current,
      {
        id: Date.now(),
        keyAr: "",
        keyHe: "",
        valueAr: "",
        valueHe: "",
      },
    ]);
  }

  function removeSpecification(id: number) {
    setSpecifications((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  function updateSpecification(
    id: number,
    field: keyof Omit<Specification, "id">,
    value: string
  ) {
    setSpecifications((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    alert(
      "تم تجهيز النموذج. في الخطوة التالية سنربطه بقاعدة البيانات."
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
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

          <p className="mt-2 text-sm leading-6 text-gray-500">
            أدخل معلومات المنتج بالعربية والعبرية، ثم احفظه
            في متجر Data Plus.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
          >
            حفظ كمسودة
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            <Save size={19} />
            حفظ المنتج
          </button>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="space-y-6">
          <Card
            title="معلومات المنتج"
            description="الاسم والوصف الذي سيظهر للعملاء في المتجر."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                name="nameAr"
                label="اسم المنتج بالعربية"
                placeholder="مثال: لابتوب ASUS TUF Gaming"
                required
              />

              <Input
                name="nameHe"
                label="שם המוצר בעברית"
                placeholder="לדוגמה: מחשב נייד ASUS TUF Gaming"
                required
              />
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Textarea
                name="descriptionAr"
                label="الوصف بالعربية"
                placeholder="اكتب وصفًا واضحًا للمنتج..."
              />

              <Textarea
                name="descriptionHe"
                label="תיאור בעברית"
                placeholder="כתבו תיאור ברור של המוצר..."
              />
            </div>
          </Card>

          <Card
            title="رموز وتعريف المنتج"
            description="استخدم SKU داخليًا، ويمكن إدخال الباركود وMPN إن توفرا."
          >
            <div className="grid gap-5 md:grid-cols-3">
              <Input
                name="sku"
                label="SKU"
                placeholder="DP-LAP-0001"
                hint="رمز داخلي فريد خاص بمتجر Data Plus."
                icon={<Tag size={18} />}
                required
                dir="ltr"
              />

              <Input
                name="barcode"
                label="Barcode"
                placeholder="7290000000000"
                hint="اختياري: الباركود الموجود على علبة المنتج."
                icon={<Barcode size={18} />}
                dir="ltr"
              />

              <Input
                name="mpn"
                label="MPN"
                placeholder="FA507NV-LP023"
                hint="اختياري: رقم القطعة من الشركة المصنعة."
                icon={<PackageCheck size={18} />}
                dir="ltr"
              />
            </div>

            <div className="mt-5">
              <Input
                name="slug"
                label="رابط المنتج"
                placeholder="asus-tuf-gaming-a15"
                hint="يظهر في رابط صفحة المنتج، ويجب أن يكون بالإنجليزية دون مسافات."
                dir="ltr"
                required
              />
            </div>
          </Card>

          <Card
            title="الأسعار"
            description="جميع الأسعار بالشيكل وتشمل منزلتين عشريتين."
          >
            <div className="grid gap-5 md:grid-cols-3">
              <Input
                name="price"
                type="number"
                min="0"
                step="0.01"
                label="سعر البيع"
                placeholder="4299"
                required
              />

              <Input
                name="compareAtPrice"
                type="number"
                min="0"
                step="0.01"
                label="السعر قبل الخصم"
                placeholder="4699"
                hint="اتركه فارغًا إذا لم يوجد خصم."
              />

              <Input
                name="costPrice"
                type="number"
                min="0"
                step="0.01"
                label="تكلفة الشراء"
                placeholder="3500"
                hint="لا تظهر هذه القيمة للعميل."
              />
            </div>
          </Card>

          <Card
            title="المواصفات"
            description="أضف مواصفات المنتج بالعربية والعبرية."
            action={
              <button
                type="button"
                onClick={addSpecification}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-2.5 text-sm font-bold text-orange-600 transition hover:bg-orange-100"
              >
                <Plus size={18} />
                إضافة مواصفة
              </button>
            }
          >
            <div className="space-y-5">
              {specifications.map(
                (specification, index) => (
                  <div
                    key={specification.id}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <p className="font-bold text-gray-900">
                        المواصفة رقم {index + 1}
                      </p>

                      {specifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeSpecification(
                              specification.id
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50"
                          aria-label="حذف المواصفة"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <Input
                        label="اسم المواصفة بالعربية"
                        placeholder="المعالج"
                        value={specification.keyAr}
                        onChange={(event) =>
                          updateSpecification(
                            specification.id,
                            "keyAr",
                            event.target.value
                          )
                        }
                      />

                      <Input
                        label="שם המפרט בעברית"
                        placeholder="מעבד"
                        value={specification.keyHe}
                        onChange={(event) =>
                          updateSpecification(
                            specification.id,
                            "keyHe",
                            event.target.value
                          )
                        }
                      />

                      <Input
                        label="القيمة بالعربية"
                        placeholder="Intel Core i7"
                        value={specification.valueAr}
                        onChange={(event) =>
                          updateSpecification(
                            specification.id,
                            "valueAr",
                            event.target.value
                          )
                        }
                      />

                      <Input
                        label="הערך בעברית"
                        placeholder="Intel Core i7"
                        value={specification.valueHe}
                        onChange={(event) =>
                          updateSpecification(
                            specification.id,
                            "valueHe",
                            event.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </Card>

          <Card
            title="صور المنتج"
            description="رفع الصور وربطها بـ Cloudinary سيتم في المرحلة التالية."
          >
            <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center transition hover:border-orange-300 hover:bg-orange-50">
              <ImagePlus
                size={42}
                className="text-orange-500"
              />

              <p className="mt-4 font-black text-gray-900">
                اسحب صور المنتج هنا
              </p>

              <p className="mt-2 text-sm text-gray-500">
                أو اضغط لاختيار الصور من الكمبيوتر
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
              />
            </label>
          </Card>
        </div>

        <div className="space-y-6">
          <Card
            title="حالة المنتج"
            description="حدد هل المنتج ظاهر في المتجر."
          >
            <Select
              name="status"
              label="الحالة"
              options={statusOptions}
              defaultValue="DRAFT"
            />

            <div className="mt-5 space-y-4">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:border-orange-300">
                <div>
                  <p className="font-bold text-gray-900">
                    منتج مميز
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    يظهر في قسم المنتجات المميزة.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="isFeatured"
                  className="h-5 w-5 accent-orange-500"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:border-orange-300">
                <div>
                  <p className="font-bold text-gray-900">
                    منتج جديد
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    تظهر عليه شارة منتج جديد.
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

          <Card
            title="التصنيف"
            description="اختر القسم والماركة."
          >
            <div className="space-y-5">
              <Select
                name="categoryId"
                label="القسم"
                placeholder="اختر القسم"
                options={categoryOptions}
                required
              />

              <Select
                name="brandId"
                label="الماركة"
                placeholder="اختر الماركة"
                options={brandOptions}
              />
            </div>
          </Card>

          <Card
            title="المخزون"
            description="الكميات وتنبيهات انخفاض المخزون."
          >
            <div className="space-y-5">
              <Input
                name="stock"
                type="number"
                min="0"
                label="الكمية المتوفرة"
                placeholder="0"
                icon={<Boxes size={18} />}
                required
              />

              <Input
                name="lowStockAt"
                type="number"
                min="0"
                label="حد التنبيه"
                defaultValue="3"
                hint="يظهر تنبيه عندما تصل الكمية إلى هذا الرقم."
              />
            </div>
          </Card>

          <div className="sticky bottom-4 rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-lg">
            <p className="font-black text-gray-950">
              جاهز لحفظ المنتج؟
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              راجع المعلومات، ثم اضغط حفظ المنتج.
            </p>

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white transition hover:bg-orange-600"
            >
              <Save size={19} />
              حفظ المنتج
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}