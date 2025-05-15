"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Scrollbar,
  Navigation,
  A11y,
  Virtual,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/virtual";

const showcaseCards = [
  "https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/938cd539-e3a4-478d-8971-3a585348d448.webp",
  "https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/46e3cd4f-586b-4bcb-be15-fd3a8d8c9bf4.webp",
  //"https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/12be8bba-636c-4b85-9db0-3a807981a767.webp",
  "https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/cfdbc2b8-29ab-45a3-a733-ccc70ad45b96.webp",
  "https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/32792799-da56-4ff1-a2ef-612dfc5bc796.webp",
  //"https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/76e6d660-55cf-4542-afdf-0d23cde3b4e4.webp",
  //"https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/c9d8fad1-bd7d-4dfe-8cd6-d0c5acc20ff5.webp",
  "https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/ff4cf848-f465-4b5b-9972-3881d6a8e45c.webp",
  "https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/5b3586d1-0911-48ba-822b-1a3b77352716.webp",
  "https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/49100e8c-820a-4c4d-a95c-aef2bf4260f6.webp",
  "https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/5c3afed2-b709-4888-8ee4-fec11e32d333.webp",
  //"https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/41acdcc4-eb9a-4c13-8126-d541d9897692.webp",
  "https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/57650af0-dbbe-4e37-ab62-c4dfcf7cf5d0.webp",
  "https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/b0a22071-7c43-4ff2-b07c-475ba7f72dbd.webp",
  //"https://fkmywxxthxwsyjqngcgn.supabase.co/storage/v1/object/public/official-images/card-images/5a963f00-c936-401b-9b2b-c5029bb8cdf4.webp",
];

export default function ShowcaseCards() {
  return (
    <>
      <section className="bg-[var(--showcase-bg)] w-full bg-opacity-60 mt-20">
        <div className="gray-delimiter"></div>
        <div className="w-full mx-auto py-12">
          {/* Header Section */}
          <div className="text-center py-4">
            <h2 className="text-4xl font-bold text-white">Modern Design</h2>
            <p className="mt-2 text-lg text-gray-300">
              Where Western Meets Anime TCGs
            </p>
            {/* Styled Delimiter */}
            <div className="flex items-center justify-center mt-6">
              <div className="mx-4 text-gray-500 uppercase tracking-widest text-sm">
                Showcase
              </div>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="mt-4 px-[calc(max(50vw-350px,10px))] xl:px-[calc(max(50vw-500px,10px))]">
            <Swiper
              breakpoints={{
                10: { slidesPerView: 10 },
                200: { slidesPerView: 2.4 },
                1280: { slidesPerView: 3.33 },
              }}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 300,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="group"
            >
              {showcaseCards.map((card, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="relative on-hover:scale-105 transition-all duration-300"
                    style={{
                      left: "50%",
                      transform: "translate(-50%, 0)",
                    }}
                  >
                    <Image
                      src={card}
                      alt={`Card image ${index + 1}`}
                      width={300}
                      height={(300 * 88) / 63}
                      style={{
                        userSelect: "none",
                      }}
                      className="w-full"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-8">
            <Link href="/cards/official">
              <Button className="button-login">View All</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
