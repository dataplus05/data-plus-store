import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "@/app/admin/products/new/actions";
export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: [
        { sortOrder: "asc" },
        { nameAr: "asc" },
      ],
      select: {
        id: true,
        nameAr: true,
        nameHe: true,
      },
    }),

    prisma.brand.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    }),
  ]);

 return (
  <ProductForm
    mode="create"
    action={createProduct}
    categories={categories}
    brands={brands}
  />
);
}