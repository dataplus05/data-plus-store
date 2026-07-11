"use client";

import {
  Bell,
  Menu,
  Search,
  UserRound,
} from "lucide-react";

export default function AdminTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="فتح القائمة"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-xl font-black text-gray-950 sm:text-2xl">
              لوحة التحكم
            </h1>

            <p className="hidden text-sm text-gray-500 sm:block">
              إدارة متجر Data Plus ومتابعة العمل
            </p>
          </div>
        </div>

        <div className="hidden max-w-md flex-1 lg:block">
          <label className="relative block">
            <span className="sr-only">البحث في لوحة الإدارة</span>

            <input
              type="search"
              placeholder="ابحث عن منتج أو طلب أو عميل..."
              className="h-11 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 pe-11 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />

            <Search
              size={19}
              className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="الإشعارات"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
          >
            <Bell size={21} />

            <span className="absolute end-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
          </button>

          <button
            type="button"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 transition hover:border-orange-300"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-950 text-white">
              <UserRound size={18} />
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-gray-900">
                محمد خليل
              </p>

              <p className="text-xs text-gray-500">
                مدير النظام
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}