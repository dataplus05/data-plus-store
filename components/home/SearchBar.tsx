export default function SearchBar() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <input
        type="text"
        placeholder="🔍 ابحث عن أي منتج..."
        className="w-full rounded-xl border border-gray-300 px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}