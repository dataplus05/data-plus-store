"use client";

import Link from "next/link";
import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { site } from "@/lib/site";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Footer() {
  const { isHebrew } = useLanguage();

  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-2xl font-black" dir="ltr">
              DATA <span className="text-orange-500">PLUS</span>
            </div>

            <p className="mt-4 leading-8 text-gray-400">
              {isHebrew
                ? "חנות מחשבים, טכנולוגיה, גיימינג, רשתות, הדפסה וריהוט משרדי באזור בענה ודיר אל-אסד."
                : "متجر للكمبيوتر، التكنولوجيا، Gaming، الشبكات، الطباعة والأثاث المكتبي في البعنة ودير الأسد."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-black">
              {isHebrew ? "קישורים מהירים" : "روابط سريعة"}
            </h3>

            <ul className="mt-5 space-y-3 text-gray-400">
              <li>
                <Link href="/shop" className="hover:text-orange-400">
                  {isHebrew ? "כל המוצרים" : "جميع المنتجات"}
                </Link>
              </li>

              <li>
                <Link href="/offers" className="hover:text-orange-400">
                  {isHebrew ? "מבצעים" : "العروض"}
                </Link>
              </li>

              <li>
                <Link href="/repair" className="hover:text-orange-400">
                  {isHebrew ? "מעבדת תיקונים" : "الصيانة"}
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-orange-400">
                  {isHebrew ? "צור קשר" : "اتصل بنا"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black">
              {isHebrew ? "קטגוריות" : "الأقسام"}
            </h3>

            <ul className="mt-5 space-y-3 text-gray-400">
              <li>{isHebrew ? "מחשבים ניידים" : "لابتوبات"}</li>
              <li>{isHebrew ? "מחשבים נייחים" : "حاسوب مكتبي"}</li>
              <li>{isHebrew ? "גיימינג" : "Gaming"}</li>
              <li>{isHebrew ? "מדפסות" : "طابعات"}</li>
              <li>{isHebrew ? "ריהוט משרדי" : "أثاث مكتبي"}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black">
              {isHebrew ? "פרטי התקשרות" : "بيانات التواصل"}
            </h3>

            <div className="mt-5 space-y-4 text-gray-400">
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-3 hover:text-orange-400"
              >
                <Phone size={18} />
                <span dir="ltr">{site.phone}</span>
              </a>

              <div className="flex items-center gap-3">
                <MapPin size={18} />

                <span>
                  {isHebrew
                    ? "בענה – דיר אל-אסד"
                    : "البعنة – دير الأسد"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Clock3 size={18} />

                <span>
                  {isHebrew
                    ? "שעות הפעילות יעודכנו בקרוב"
                    : "سيتم تحديث ساعات العمل قريبًا"}
                </span>
              </div>

              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 hover:text-orange-400"
              >
                <Mail size={18} />
                <span dir="ltr">{site.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-gray-800 pt-7 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Data Plus.{" "}
          {isHebrew
            ? "כל הזכויות שמורות."
            : "جميع الحقوق محفوظة."}
        </div>
      </div>
    </footer>
  );
}