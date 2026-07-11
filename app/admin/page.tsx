import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpLeft,
  CircleDollarSign,
  Package,
  PackageCheck,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "مبيعات اليوم",
    value: "₪0",
    note: "لا توجد مبيعات بعد",
    icon: CircleDollarSign,
    iconClass: "bg-green-50 text-green-600",
  },
  {
    title: "الطلبات الجديدة",
    value: "0",
    note: "بانتظار أول طلب",
    icon: ShoppingCart,
    iconClass: "bg-orange-50 text-orange-600",
  },
  {
    title: "عدد المنتجات",
    value: "0",
    note: "أضف أول منتج",
    icon: Package,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    title: "عدد العملاء",
    value: "0",
    note: "لا يوجد عملاء بعد",
    icon: Users,
    iconClass: "bg-violet-50 text-violet-600",
  },
];

const quickActions = [
  {
    title: "إضافة منتج",
    description: "أضف منتجًا جديدًا إلى المتجر",
    href: "/admin/products/new",
    icon: PackageCheck,
  },
  {
    title: "متابعة الطلبات",
    description: "راجع الطلبات الجديدة والحالية",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "إدارة المخزون",
    description: "راجع الكميات والتنبيهات",
    href: "/admin/inventory",
    icon: AlertTriangle,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 rounded-3xl bg-gray-950 p-7 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-orange-400">
            DATA PLUS ADMIN
          </p>

          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            مرحبًا محمد
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-300">
            من هنا يمكنك إدارة المنتجات والأسعار والمخزون
            والطلبات والعملاء والحملات.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white transition hover:bg-orange-600"
        >
          <PackageCheck size={20} />
          إضافة منتج جديد
        </Link>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    {stat.title}
                  </p>

                  <p className="mt-3 text-3xl font-black text-gray-950">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconClass}`}
                >
                  <Icon size={24} />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
                <TrendingUp size={16} className="text-gray-400" />

                <span className="text-xs text-gray-500">
                  {stat.note}
                </span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <article className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 p-6">
            <div>
              <h2 className="text-xl font-black text-gray-950">
                آخر الطلبات
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                أحدث الطلبات التي وصلت إلى المتجر
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700"
            >
              عرض الكل
              <ArrowUpLeft size={17} />
            </Link>
          </div>

          <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
              <ShoppingCart size={30} />
            </div>

            <h3 className="mt-5 text-lg font-black text-gray-900">
              لا توجد طلبات حتى الآن
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-7 text-gray-500">
              عندما يبدأ العملاء بإرسال الطلبات ستظهر هنا.
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-950">
                تنبيهات المخزون
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                المنتجات التي تحتاج متابعة
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle size={22} />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-7 text-center">
            <p className="font-bold text-gray-800">
              لا توجد تنبيهات
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              ستظهر هنا المنتجات منخفضة المخزون أو غير المتوفرة.
            </p>
          </div>

          <Link
            href="/admin/inventory"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
          >
            فتح إدارة المخزون
            <ArrowUpLeft size={17} />
          </Link>
        </article>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-black text-gray-950">
            إجراءات سريعة
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            اختصارات للمهام اليومية الأكثر استخدامًا
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.href}
                href={action.href}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 text-lg font-black text-gray-900">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {action.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-600">
                  فتح
                  <ArrowUpLeft size={17} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}