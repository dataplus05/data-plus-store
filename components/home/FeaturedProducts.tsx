import ProductCard from "@/components/product/ProductCard";

export default function FeaturedProducts() {
  const products = [
    { title: "ASUS TUF Gaming", price: "4299" },
    { title: "HP LaserJet", price: "899" },
    { title: "RTX 5070", price: "3199" },
    { title: "Office Chair", price: "699" },
  ];

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
     <h2 className="text-4xl font-black text-center mb-12">
    أحدث المنتجات
</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.title}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}