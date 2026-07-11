"use client";

import {
  BadgeCheck,
  Headphones,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const benefits = [
  {
    icon: BadgeCheck,
    titleHe: "מוצרים איכותיים",
    titleAr: "منتجات موثوقة",
    descriptionHe:
      "מבחר מוצרים איכותיים ממותגים מובילים עם אחריות ושירות מקצועי.",
    descriptionAr:
      "منتجات من علامات تجارية معروفة مع ضمان وخدمة احترافية.",
  },
  {
    icon: Truck,
    titleHe: "משלוח מהיר",
    titleAr: "توصيل سريع",
    descriptionHe:
      "משלוחים מהירים לבענה, דיר אל-אסד וליישובים באזור.",
    descriptionAr:
      "توصيل سريع إلى البعنة، دير الأسد والمناطق المجاورة.",
  },
  {
    icon: ShieldCheck,
    titleHe: "אחריות ושירות",
    titleAr: "ضمان وخدمة",
    descriptionHe:
      "ליווי מקצועי לפני הרכישה ושירות אמין גם לאחר הקנייה.",
    descriptionAr:
      "مساعدة قبل الشراء وخدمة موثوقة بعد استلام المنتج.",
  },
  {
    icon: Headphones,
    titleHe: "ייעוץ מקצועי",
    titleAr: "استشارة احترافية",
    descriptionHe:
      "נעזור לכם לבחור מחשב, ציוד או ריהוט שמתאים לצרכים ולתקציב.",
    descriptionAr:
      "نساعدك في اختيار الجهاز أو المعدات المناسبة لاحتياجاتك وميزانيتك.",
  },
];

export default function WhyChooseUs() {
  const { isHebrew } = useLanguage();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p
            dir="ltr"
            className="text-sm font-black tracking-[0.16em] text-orange-500"
          >
            WHY DATA PLUS
          </p>

          <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
            {isHebrew
              ? "למה כדאי לקנות ב־Data Plus?"
              : "لماذا تختار Data Plus؟"}
          </h2>

          <p className="mt-4 leading-8 text-gray-500">
            {isHebrew
              ? "שירות מקומי, יחס אישי ומוצרים שנבחרו כדי לתת לכם חוויית קנייה בטוחה ונוחה."
              : "خدمة محلية، تعامل شخصي ومنتجات مختارة لتوفير تجربة شراء سهلة وآمنة."}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.titleHe}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <Icon size={28} strokeWidth={1.9} />
                </div>

                <h3 className="mt-6 text-xl font-black text-gray-950">
                  {isHebrew ? benefit.titleHe : benefit.titleAr}
                </h3>

                <p className="mt-3 leading-7 text-gray-500">
                  {isHebrew
                    ? benefit.descriptionHe
                    : benefit.descriptionAr}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}