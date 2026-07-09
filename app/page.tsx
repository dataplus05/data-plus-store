import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <Navbar />
      <HeroSlider />
      <SearchBar />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </>
  );
}