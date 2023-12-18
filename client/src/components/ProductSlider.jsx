import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Progress } from "@nextui-org/react";

import axios from "axios";
import { useProducts } from "../context/ProductContext";

const ProductSlider = () => {
  const { products, productsLoading } = useProducts();


  if (productsLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-sm"
        />
      </div>
    );
  }

  return (
    <div className="p-4 xl:w-4/5 mx-auto">
      <Swiper
        spaceBetween={19}
        modules={[Autoplay]}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: "jaservice-bullet",
          bulletActiveClass: "jaservice-bullet-active",
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1450: {
            slidesPerView: 4,
          },
        }}
      >
        {products?.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="mb-10">
            <ProductCard variant="home" product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
