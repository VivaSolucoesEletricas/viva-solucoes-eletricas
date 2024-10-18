import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

import projeto1 from "../assets/quem-somos-1.jpeg";
import projeto2 from "../assets/quem-somos-2.jpeg";
import projeto3 from "../assets/quem-somos-3.jpeg";

export default function Projects() {
  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={true}
        breakpoints={{
          576: {
            // width: 576,
            slidesPerView: 3,
          },
          768: {
            // width: 768,
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide>
          <img src={projeto1.src} alt="Imagem de energia" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={projeto2.src} alt="Imagem de energia" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={projeto3.src} alt="Imagem de energia" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
