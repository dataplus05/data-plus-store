"use client";

import {
  Globe2,
  LogIn,
  MapPin,
  Phone,
  Truck,
} from "lucide-react";
import { site } from "@/lib/site";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function TopBar() {
  const { language, isHebrew, setLanguage } = useLanguage();

  return (
    <div className="bg-gray-950 text-sm text-white">
      <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <div className="flex items-center gap-4 lg:gap-6">
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-2 transition hover:text-orange-300"
          >
            <Phone size={15} />

            <span dir="ltr">{site.phone}</span>
          </a>

          <div className="hidden items-center gap-2 md:flex">
            <MapPin size={15} />

            <span>
              {isHebrew
                ? "בענה – דיר אל-אסד"
                : "البعنة – دير الأسد"}
            </span>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Truck size={15} />

            <span>
              {isHebrew
                ? "משלוחים מהירים לאזור"
                : "توصيل سريع إلى المنطقة"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe2 size={15} />

            <button
              type="button"
              onClick={() => setLanguage("he")}
              aria-pressed={language === "he"}
              className={
                language === "he"
                  ? "rounded-md bg-orange-500 px-2 py-1 font-bold text-white"
                  : "rounded-md px-2 py-1 text-gray-300 transition hover:bg-gray-800 hover:text-white"
              }
            >
              עברית
            </button>

            <span className="text-gray-600">|</span>

            <button
              type="button"
              onClick={() => setLanguage("ar")}
              aria-pressed={language === "ar"}
              className={
                language === "ar"
                  ? "rounded-md bg-orange-500 px-2 py-1 font-bold text-white"
                  : "rounded-md px-2 py-1 text-gray-300 transition hover:bg-gray-800 hover:text-white"
              }
            >
              العربية
            </button>
          </div>

          <button
            type="button"
            className="hidden items-center gap-2 text-gray-200 transition hover:text-orange-300 sm:flex"
          >
            <LogIn size={15} />

            <span>
              {isHebrew ? "התחברות" : "تسجيل الدخول"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}