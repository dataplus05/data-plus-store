import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

import HeroSlider from "@/components/home/HeroSlider";
import Brands from "@/components/home/Brands";
import SearchBar from "@/components/home/SearchBar";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <Navbar />

      <main>
        <HeroSlider />
        <Brands />
        <SearchBar />
        <Categories />
        <FeaturedProducts />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}