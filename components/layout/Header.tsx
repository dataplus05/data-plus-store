import { Search, ShoppingCart, Heart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-white">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between h-20 px-6">

          {/* Logo */}

          <div>

            <h1 className="text-3xl font-black">

              DATA <span className="text-orange-500">PLUS</span>

            </h1>

            <p className="text-xs text-gray-500">

              داتا بلوس

            </p>

          </div>

          {/* Search */}

          <div className="hidden md:flex w-[500px] relative">

            <input
              className="w-full border rounded-xl py-3 px-5 pr-12 outline-none focus:border-orange-500"
              placeholder="ابحث عن منتج..."
            />

            <Search
              className="absolute right-4 top-3.5 text-gray-400"
              size={20}
            />

          </div>

          {/* Icons */}

          <div className="flex gap-6">

            <Heart className="cursor-pointer hover:text-orange-500" />

            <ShoppingCart className="cursor-pointer hover:text-orange-500" />

            <User className="cursor-pointer hover:text-orange-500" />

          </div>

        </div>

      </div>

    </header>
  );
}