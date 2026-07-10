import type { Metadata } from "next";
import LanguageProvider from "@/components/providers/LanguageProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Data Plus | דאתא פלוס",
    template: "%s | Data Plus",
  },
  description:
    "חנות מחשבים, מחשבים ניידים, ציוד גיימינג, מדפסות, ריהוט משרדי ושירותי תיקונים באזור בענה ודיר אל-אסד.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className="bg-white text-gray-900 antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}