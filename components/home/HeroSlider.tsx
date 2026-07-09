"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "أفضل عروض اللابتوبات",
    text: "خصومات على أجهزة ASUS و Lenovo و HP",
    image: "/images/banners/banner1.jpg",
  },
  {
    title: "أجهزة Gaming",
    text: "أحدث أجهزة الألعاب وقطع الكمبيوتر",
    image: "/images/banners/banner2.jpg",
  },
  {
    title: "الأثاث المكتبي",
    text: "مكاتب وكراسي بجودة عالية",
    image: "/images/banners/banner3.jpg",
  },
];

export default function HeroSlider() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="grid lg:grid-cols-2 bg-gradient-to-r from-orange-50 to-white rounded-3xl overflow-hidden shadow-lg min-h-[420px]">

              <div className="flex flex-col justify-center p-10">

                <span className="text-orange-500 font-bold">
                  Data Plus
                </span>

                <h1 className="text-5xl font-black mt-4">
                  {slide.title}
                </h1>

                <p className="text-gray-600 mt-6 text-lg">
                  {slide.text}
                </p>

                <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 py-4 w-fit transition">
                  تسوق الآن
                </button>

              </div>

              <div className="relative min-h-[420px]">

                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />

              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}