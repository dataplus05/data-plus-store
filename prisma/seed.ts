import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL غير موجود داخل ملف .env"
  );
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const categories = [
  {
    slug: "desktops",
    nameAr: "أجهزة كمبيوتر",
    nameHe: "מחשבים נייחים",
    sortOrder: 1,
  },
  {
    slug: "laptops",
    nameAr: "لابتوبات",
    nameHe: "מחשבים ניידים",
    sortOrder: 2,
  },
  {
    slug: "gaming",
    nameAr: "Gaming وألعاب",
    nameHe: "גיימינג",
    sortOrder: 3,
  },
  {
    slug: "monitors",
    nameAr: "شاشات",
    nameHe: "מסכים",
    sortOrder: 4,
  },
  {
    slug: "printers",
    nameAr: "طابعات",
    nameHe: "מדפסות",
    sortOrder: 5,
  },
  {
    slug: "ink-toner",
    nameAr: "أحبار وتونر",
    nameHe: "דיו וטונרים",
    sortOrder: 6,
  },
  {
    slug: "network",
    nameAr: "راوترات وشبكات",
    nameHe: "ראוטרים ורשתות",
    sortOrder: 7,
  },
  {
    slug: "cameras",
    nameAr: "كاميرات",
    nameHe: "מצלמות",
    sortOrder: 8,
  },
  {
    slug: "audio",
    nameAr: "سماعات وصوت",
    nameHe: "אוזניות ושמע",
    sortOrder: 9,
  },
  {
    slug: "keyboards",
    nameAr: "لوحات مفاتيح",
    nameHe: "מקלדות",
    sortOrder: 10,
  },
  {
    slug: "mice",
    nameAr: "فأرات",
    nameHe: "עכברים",
    sortOrder: 11,
  },
  {
    slug: "cables",
    nameAr: "كابلات ومحولات",
    nameHe: "כבלים ומתאמים",
    sortOrder: 12,
  },
  {
    slug: "components",
    nameAr: "قطع كمبيوتر",
    nameHe: "חלקי מחשב",
    sortOrder: 13,
  },
  {
    slug: "storage",
    nameAr: "SSD والتخزين",
    nameHe: "SSD ואחסון",
    sortOrder: 14,
  },
  {
    slug: "memory",
    nameAr: "RAM",
    nameHe: "זיכרונות RAM",
    sortOrder: 15,
  },
  {
    slug: "processors",
    nameAr: "معالجات",
    nameHe: "מעבדים",
    sortOrder: 16,
  },
  {
    slug: "graphics-cards",
    nameAr: "بطاقات شاشة",
    nameHe: "כרטיסי מסך",
    sortOrder: 17,
  },
  {
    slug: "power-supplies",
    nameAr: "مزودات طاقة",
    nameHe: "ספקי כוח",
    sortOrder: 18,
  },
  {
    slug: "cases",
    nameAr: "صناديق الكمبيوتر",
    nameHe: "מארזי מחשב",
    sortOrder: 19,
  },
  {
    slug: "consoles",
    nameAr: "PlayStation وXbox",
    nameHe: "PlayStation ו-Xbox",
    sortOrder: 20,
  },
  {
    slug: "tv-box",
    nameAr: "TV Box",
    nameHe: "TV Box",
    sortOrder: 21,
  },
  {
    slug: "furniture",
    nameAr: "أثاث مكتبي",
    nameHe: "ריהוט משרדי",
    sortOrder: 22,
  },
];

const brands = [
  { slug: "asus", name: "ASUS" },
  { slug: "hp", name: "HP" },
  { slug: "dell", name: "Dell" },
  { slug: "lenovo", name: "Lenovo" },
  { slug: "msi", name: "MSI" },
  { slug: "acer", name: "Acer" },
  { slug: "apple", name: "Apple" },
  { slug: "intel", name: "Intel" },
  { slug: "amd", name: "AMD" },
  { slug: "nvidia", name: "NVIDIA" },
  { slug: "gigabyte", name: "Gigabyte" },
  { slug: "logitech", name: "Logitech" },
  { slug: "razer", name: "Razer" },
  { slug: "corsair", name: "Corsair" },
  { slug: "kingston", name: "Kingston" },
  { slug: "crucial", name: "Crucial" },
  { slug: "samsung", name: "Samsung" },
  { slug: "western-digital", name: "Western Digital" },
  { slug: "seagate", name: "Seagate" },
  { slug: "tp-link", name: "TP-Link" },
  { slug: "ubiquiti", name: "Ubiquiti" },
  { slug: "canon", name: "Canon" },
  { slug: "epson", name: "Epson" },
  { slug: "brother", name: "Brother" },
  { slug: "sony", name: "Sony" },
  { slug: "microsoft", name: "Microsoft" },
  { slug: "other", name: "Other" },
];

async function main() {
  console.log("بدء إضافة الأقسام والماركات...");

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        slug: category.slug,
      },
      update: {
        nameAr: category.nameAr,
        nameHe: category.nameHe,
        sortOrder: category.sortOrder,
        isActive: true,
      },
      create: {
        slug: category.slug,
        nameAr: category.nameAr,
        nameHe: category.nameHe,
        sortOrder: category.sortOrder,
        isActive: true,
      },
    });
  }

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: {
        slug: brand.slug,
      },
      update: {
        name: brand.name,
        isActive: true,
      },
      create: {
        slug: brand.slug,
        name: brand.name,
        isActive: true,
      },
    });
  }

  const categoryCount = await prisma.category.count();
  const brandCount = await prisma.brand.count();

  console.log("--------------------------------");
  console.log(`تم تجهيز ${categoryCount} قسمًا.`);
  console.log(`تم تجهيز ${brandCount} ماركة.`);
  console.log("اكتملت العملية بنجاح.");
}

main()
  .catch((error: unknown) => {
    console.error("فشلت عملية تجهيز البيانات:");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });