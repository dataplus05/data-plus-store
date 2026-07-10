export default function Brands() {
  const brands = [
    "HP",
    "DELL",
    "LENOVO",
    "ASUS",
    "MSI",
    "INTEL",
    "AMD",
    "NVIDIA",
    "LOGITECH",
    "TP-LINK",
    "CANON",
    "EPSON",
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-black text-center mb-10">
          أشهر الماركات العالمية
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {brands.map((brand) => (
            <div
              key={brand}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 hover:border-orange-400 transition h-24 flex items-center justify-center"
            >
              <span className="font-black text-lg text-gray-700">
                {brand}
              </span>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}