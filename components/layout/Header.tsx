"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black text-xl">
              DP
            </div>

            <div>
              <h1 className="text-2xl font-black text-gray-900">
                DATA PLUS
              </h1>

              <p className="text-sm text-gray-500">
                Computers & Electronics
              </p>
            </div>

          </Link>

          {/* Search */}
          <div className="hidden lg:flex flex-1 mx-12">
            <input
              type="text"
              placeholder="ابحث عن أي منتج..."
              className="w-full h-12 rounded-xl border border-gray-300 px-5 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">

            <button className="text-gray-700 hover:text-orange-500 transition">
              ❤️
            </button>

            <button className="text-gray-700 hover:text-orange-500 transition">
              🛒
            </button>

            <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-5 py-2 rounded-xl font-semibold">
              تسجيل الدخول
            </button>

          </div>

        </div>

      </div>
    </header>
  );
}