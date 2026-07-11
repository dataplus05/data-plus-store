"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  LayoutDashboard,
  Package,
  Percent,
  Settings,
  Shapes,
  ShoppingCart,
  Store,
  Tags,
  Users,
  Wrench,
} from "lucide-react";

const navigation = [
  {
    name: "لوحة التحكم",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "المنتجات",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "الأقسام",
    href: "/admin/categories",
    icon: Shapes,
  },
  {
    name: "الماركات",
    href: "/admin/brands",
    icon: Tags,
  },
  {
    name: "المخزون",
    href: "/admin/inventory",
    icon: Boxes,
  },
  {
    name: "الطلبات",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "العملاء",
    href: "/admin/customers",
    icon: Users,
  },
  {
    name: "العروض والحملات",
    href: "/admin/promotions",
    icon: Percent,
  },
  {
    name: "طلبات الصيانة",
    href: "/admin/repairs",
    icon: Wrench,
  },
  {
    name: "الإعدادات",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-72 border-l border-gray-800 bg-gray-950 text-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-gray-800 px-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 font-black text-white">
            DP
          </div>

          <div>
            <p className="text-lg font-black" dir="ltr">
              DATA <span className="text-orange-400">PLUS</span>
            </p>

            <p className="text-xs text-gray-400">
              لوحة إدارة المتجر
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-xs font-bold text-gray-500">
          إدارة النظام
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "flex items-center gap-3 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-sm"
                    : "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-300 transition hover:bg-gray-900 hover:text-white"
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-gray-800 p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-300 transition hover:bg-gray-900 hover:text-orange-400"
        >
          <Store size={20} />
          <span>فتح المتجر</span>
        </Link>
      </div>
    </aside>
  );
}