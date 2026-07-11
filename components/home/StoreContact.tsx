"use client";

import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { site } from "@/lib/site";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function StoreContact() {
  const { isHebrew } = useLanguage();

  const whatsappMessage = isHebrew
    ? "שלום, אני מעוניין לקבל מידע נוסף מ־Data Plus."
    : "السلام عليكم، أريد الحصول على معلومات إضافية من Data Plus.";

  const whatsappUrl = `${site.whatsapp}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <p
                dir="ltr"
                className="text-sm font-black tracking-[0.16em] text-orange-500"
              >
                CONTACT DATA PLUS
              </p>

              <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
                {isHebrew
                  ? "אנחנו כאן כדי לעזור לכם"
                  : "نحن هنا لمساعدتك"}
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-gray-500">
                {isHebrew
                  ? "צריכים עזרה בבחירת מחשב, ציוד, מדפסת או ריהוט משרדי? צרו איתנו קשר ונשמח לעזור."
                  : "تحتاج مساعدة في اختيار كمبيوتر، معدات، طابعة أو أثاث مكتبي؟ تواصل معنا وسنساعدك."}
              </p>

              <div className="mt-8 grid gap-4">
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4 transition hover:border-orange-300 hover:bg-orange-50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <Phone size={21} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      {isHebrew ? "טלפון" : "الهاتف"}
                    </p>

                    <p className="font-bold text-gray-900" dir="ltr">
                      {site.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4 transition hover:border-orange-300 hover:bg-orange-50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <Mail size={21} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      {isHebrew ? "דוא״ל" : "البريد الإلكتروني"}
                    </p>

                    <p className="font-bold text-gray-900" dir="ltr">
                      {site.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      {isHebrew ? "כתובת" : "العنوان"}
                    </p>

                    <p className="font-bold text-gray-900">
                      {isHebrew ? site.locationHe : site.locationAr}
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-xl bg-green-500 px-6 py-3.5 font-bold text-white transition hover:bg-green-600"
              >
                <MessageCircle size={21} />

                {isHebrew
                  ? "דברו איתנו ב־WhatsApp"
                  : "تواصل معنا عبر واتساب"}
              </a>
            </div>

            <div className="flex min-h-[420px] items-center justify-center bg-gray-950 p-8 text-white sm:p-12">
              <div className="max-w-md text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500 text-2xl font-black">
                  DP
                </div>

                <h3 className="mt-7 text-3xl font-black">
                  DATA PLUS
                </h3>

                <p className="mt-2 text-gray-400">
                  {isHebrew ? "דאתא פלוס" : "داتا بلوس"}
                </p>

                <p className="mt-6 leading-8 text-gray-300">
                  {isHebrew
                    ? "מחשבים, טכנולוגיה, גיימינג, הדפסה, רשתות וריהוט משרדי."
                    : "كمبيوتر، تكنولوجيا، Gaming، طباعة، شبكات وأثاث مكتبي."}
                </p>

                <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-5">
                  <p className="text-sm text-gray-400">
                    {isHebrew ? "אזור השירות" : "منطقة الخدمة"}
                  </p>

                  <p className="mt-2 font-bold text-orange-400">
                    {isHebrew
                      ? "בענה, דיר אל-אסד והסביבה"
                      : "البعنة، دير الأسد والمناطق المجاورة"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}