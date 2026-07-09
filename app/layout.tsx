import { Heart, Search, ShoppingCart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}

          <div className="flex flex-col">

            <h1 className="text-3xl font-extrabold tracking-wide">
              DATA <span className="text-orange-500">PLUS</span>
            </h1>

            <span className="text-xs text-gray-500">
              داتا بلوس | דאתא פלוס
            </span>

          </div>

          {/* Search */}

          <div className="hidden lg:block w-[500px]">

            <div className="relative">

              <input
                type="text"
                placeholder="ابحث عن أي منتج..."
                className="w-full rounded-xl border border-gray-300 py-3 pl-4 pr-12 outline-none focus:border-orange-500"
              />

              <Search
                size={20}
                className="absolute right-4 top-3.5 text-gray-400"
              />

            </div>

          </div>

          {/* Icons */}

          <div className="flex items-center gap-6">

            <button className="hover:text-orange-500 transition">
              <Heart size={24} />
            </button>

            <button className="hover:text-orange-500 transition relative">
              <ShoppingCart size={24} />

              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>

            </button>

            <button className="hover:text-orange-500 transition">
              <User size={24} />
            </button>

          </div>

        </div>

      </div>
    </header>
  );
}