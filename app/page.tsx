import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSlider from "@/components/home/HeroSlider";
import Brands from "@/components/home/Brands";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SearchBar from "@/components/home/SearchBar";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <Navbar />

      <HeroSlider />

      <Brands />

      <SearchBar />

      <Categories />

      <FeaturedProducts />

      <Footer />
    </>
  );
}