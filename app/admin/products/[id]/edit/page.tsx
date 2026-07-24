import { notFound } from "next/navigation";

import ProductForm, {
  type ProductFormValues,
} from "@/components/admin/ProductForm";
import { updateProduct } from "@/app/admin/products/[id]/edit/actions";
import { prisma } from "@/lib/prisma";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const [product, categories, brands] = await Promise.all([
    prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        nameAr: true,
        nameHe: true,
        descriptionAr: true,
        descriptionHe: true,
        slug: true,
        sku: true,
        barcode: true,
        mpn: true,
        price: true,
        compareAtPrice: true,
        costPrice: true,
        stock: true,
        lowStockAt: true,
        categoryId: true,
        brandId: true,
        status: true,
        isFeatured: true,
        isNew: true,
        specifications: {
          orderBy: {
            sortOrder: "asc",
          },
          select: {
            keyAr: true,
            keyHe: true,
            valueAr: true,
            valueHe: true,
          },
        },
      },
    }),

    prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          nameAr: "asc",
        },
      ],
      select: {
        id: true,
        nameAr: true,
        nameHe: true,
      },
    }),

    prisma.brand.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
      },
    }),
  ]);

  if (!product) {
    notFound();
  }

  const defaultValues: ProductFormValues = {
    nameAr: product.nameAr,
    nameHe: product.nameHe,
    descriptionAr: product.descriptionAr ?? "",
    descriptionHe: product.descriptionHe ?? "",
    slug: product.slug,

    sku: product.sku,
    barcode: product.barcode ?? "",
    mpn: product.mpn ?? "",

    price: product.price.toString(),
    compareAtPrice: product.compareAtPrice?.toString() ?? "",
    costPrice: product.costPrice?.toString() ?? "",

    stock: product.stock.toString(),
    lowStockAt: product.lowStockAt.toString(),

    categoryId: product.categoryId,
    brandId: product.brandId ?? "",

    status: product.status,
    isFeatured: product.isFeatured,
    isNew: product.isNew,

    specifications: product.specifications.map(
      (specification) => ({
        keyAr: specification.keyAr,
        keyHe: specification.keyHe,
        valueAr: specification.valueAr,
        valueHe: specification.valueHe,
      })
    ),
  };

  const updateProductAction = updateProduct.bind(
    null,
    product.id
  );

  return (
    <ProductForm
      mode="edit"
      action={updateProductAction}
      categories={categories}
      brands={brands}
      defaultValues={defaultValues}
    />
  );
}