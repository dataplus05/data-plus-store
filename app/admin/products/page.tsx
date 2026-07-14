import Link from "next/link";
import {
  ArrowUpDown,
  Filter,
  MoreHorizontal,
  Package,
  Plus,
  Search,
} from "lucide-react";

const products = [
  {
    id: "1",
    name: "ASUS TUF Gaming A15",
    sku: "DP-ASUS-001",
    category: "לפטופים / لابتوبات",
    price: "₪4,299",
    stock: 8,
    status: "نشط",
  },
  {
    id: "2",
    name: "HP LaserJet Pro",
    sku: "DP-HP-002",
    category: "מדפסות / طابعات",
    price: "₪899",
    stock: 4,
    status: "نشط",
  },
  {
    id: "3",
    name: "NVIDIA RTX 5070",
    sku: "DP-NV-003",
    category: "כרטיסי מסך / كروت شاشة",
    price: "₪3,199",
    stock: 2,
    status: "مخزون منخفض",
  },
];

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-orange-500">
            إدارة الكتالوج
          </p>

          <h1 className="mt-1 text-3xl font-black text-gray-950">
            المنتجات
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            أضف المنتجات وعدّل الأسعار والمخزون وحالة العرض.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600"
        >
          <Plus size={20} />
          إضافة منتج
        </Link>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <label className="relative block flex-1">
              <span className="sr-only">البحث في المنتجات</span>

              <input
                type="search"
                placeholder="ابحث باسم المنتج أو SKU..."
                className="h-11 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 pe-11 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />

              <Search
                size={19}
                className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </label>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
            >
              <Filter size={18} />
              فلترة
            </button>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
            >
              <ArrowUpDown size={18} />
              ترتيب
            </button>
          </div>

          <p className="text-sm text-gray-500">
            عدد المنتجات: {products.length}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-right">
            <thead className="bg-gray-50 text-xs font-bold text-gray-500">
              <tr>
                <th className="px-5 py-4">المنتج</th>
                <th className="px-5 py-4">SKU</th>
                <th className="px-5 py-4">القسم</th>
                <th className="px-5 py-4">السعر</th>
                <th className="px-5 py-4">المخزون</th>
                <th className="px-5 py-4">الحالة</th>
                <th className="px-5 py-4">إجراءات</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <Package size={22} />
                      </div>

                      <div>
                        <p className="font-bold text-gray-900">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          ID: {product.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {product.sku}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {product.category}
                  </td>

                  <td className="px-5 py-4 font-bold text-gray-900">
                    {product.price}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={
                        product.stock <= 2
                          ? "rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600"
                          : "rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={
                        product.status === "نشط"
                          ? "rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600"
                          : "rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600"
                      }
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                      >
                        تعديل
                      </Link>

                      <button
                        type="button"
                        aria-label="المزيد"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
              <Package size={30} />
            </div>

            <h2 className="mt-5 text-lg font-black text-gray-900">
              لا توجد منتجات
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              أضف أول منتج إلى متجر Data Plus.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}