"use client";

import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function WhatsAppButton() {
  const { isHebrew } = useLanguage();

  const message = isHebrew
    ? "שלום, אני מעוניין לקבל מידע על מוצר מ־Data Plus."
    : "السلام عليكم، أريد الاستفسار عن أحد منتجات Data Plus.";

  const href = `${site.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        isHebrew
          ? "יצירת קשר דרך WhatsApp"
          : "تواصل معنا عبر واتساب"
      }
      className="fixed bottom-5 end-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-200"
    >
      <MessageCircle size={29} strokeWidth={2.2} />

      <span className="absolute end-16 hidden whitespace-nowrap rounded-lg bg-gray-950 px-3 py-2 text-sm font-bold text-white shadow-lg lg:block">
        {isHebrew ? "דברו איתנו ב־WhatsApp" : "تواصل معنا عبر واتساب"}
      </span>
    </a>
  );
}