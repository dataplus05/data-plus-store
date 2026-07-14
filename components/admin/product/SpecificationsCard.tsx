"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

type Specification = {
  id: number;
  keyAr: string;
  keyHe: string;
  valueAr: string;
  valueHe: string;
};

export default function SpecificationsCard() {
  const [specifications, setSpecifications] = useState<Specification[]>([
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
    setSpecifications((current) => {
      if (current.length === 1) {
        return current;
      }

      return current.filter((item) => item.id !== id);
    });
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

  return (
    <Card
      title="مواصفات المنتج"
      description="أضف المواصفات التقنية بالعربية والعبرية، مثل المعالج والذاكرة والتخزين."
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
        {specifications.map((specification, index) => (
          <div
            key={specification.id}
            className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-black text-gray-900">
                  المواصفة رقم {index + 1}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  يجب تعبئة الحقول الأربعة حتى يتم حفظ المواصفة.
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeSpecification(specification.id)}
                disabled={specifications.length === 1}
                aria-label={`حذف المواصفة رقم ${index + 1}`}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Trash2 size={19} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Input
                name="specificationKeyAr"
                label="اسم المواصفة بالعربية"
                placeholder="مثال: المعالج"
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
                name="specificationKeyHe"
                label="שם המפרט בעברית"
                placeholder="לדוגמה: מעבד"
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
                name="specificationValueAr"
                label="القيمة بالعربية"
                placeholder="مثال: Intel Core i7"
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
                name="specificationValueHe"
                label="הערך בעברית"
                placeholder="לדוגמה: Intel Core i7"
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
        ))}
      </div>
    </Card>
  );
}