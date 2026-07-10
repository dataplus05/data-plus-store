"use client";

import { useState } from "react";
import { Globe, LogIn, Phone, Truck } from "lucide-react";
import { site } from "@/lib/site";

export default function TopBar() {
  const [language, setLanguage] = useState<"he" | "ar">("he");

  function changeLanguage(nextLanguage: "he" | "ar") {
    setLanguage(nextLanguage);

    document.documentElement.lang = nextLanguage;
    document.documentElement.dir = "rtl";
  }

  return (
    <div className="bg-gray-900 text-sm text-white">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-2 transition hover:text-orange-400"
          >
            <Phone size={15} />
            <span>{site.phone}</span>
          </a>

          <div className="hidden items-center gap-2 md:flex">
            <Truck size={15} />
            <span>
              {language === "he"
                ? "משלוח מהיר לאזור"
                : "توصيل سريع إلى المنطقة"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Globe size={15} />

            <button
              type="button"
              onClick={() => changeLanguage("he")}
              className={
                language === "he"
                  ? "font-bold text-orange-400"
                  : "transition hover:text-orange-400"
              }
            >
              עברית
            </button>

            <span className="text-gray-500">|</span>

            <button
              type="button"
              onClick={() => changeLanguage("ar")}
              className={
                language === "ar"
                  ? "font-bold text-orange-400"
                  : "transition hover:text-orange-400"
              }
            >
              العربية
            </button>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 transition hover:text-orange-400"
          >
            <LogIn size={15} />

            <span>
              {language === "he" ? "התחברות" : "تسجيل الدخول"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}