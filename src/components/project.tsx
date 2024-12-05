import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import projeto1 from "../assets/projeto1.jpeg";
import projeto2 from "../assets/projeto2.jpeg";
import projeto3 from "../assets/projeto3.jpeg";
import projeto4 from "../assets/projeto4.jpeg";
import projeto5 from "../assets/projeto5.jpeg";
import projeto6 from "../assets/projeto6.jpeg";
import projeto7 from "../assets/projeto7.jpeg";
import projeto8 from "../assets/projeto8.jpeg";
import projeto9 from "../assets/projeto9.jpeg";

export default function Projects() {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={25}
        slidesPerView={1}
        modules={[Navigation]}
        autoplay={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          576: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide className="relative">
          <div className="shadow-md w-full overflow-hidden rounded-lg border border-zinc-200">
            <div className="relative w-full h-48">
              <img
                src={projeto1.src}
                alt="Imagem de energia"
                className="absolute -z-10 inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="text-center p-4">
              <span className="text-viva-blue font-bold">
                Comercial: oficina Joab Car
              </span>
              <p className="text-sm">Economia anual de R$ 130.500,00</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="shadow-md w-full overflow-hidden rounded-lg border border-zinc-200">
            <div className="relative w-full h-48">
              <img
                src={projeto2.src}
                alt="Imagem de energia"
                className="absolute -z-10 inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="text-center p-4">
              <span className="text-viva-blue font-bold">
                Residencial: Cliente dona Iramaia
              </span>
              <p className="text-sm">Economia anual: 17.000,00</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="shadow-md w-full overflow-hidden rounded-lg border border-zinc-200">
            <div className="relative w-full h-48">
              <img
                src={projeto3.src}
                alt="Imagem de energia"
                className="absolute -z-10 inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="text-center p-4">
              <span className="text-viva-blue font-bold">
                Residencial: cliente Felipe
              </span>
              <p className="text-sm">Economia anual: 13.000,00</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="shadow-md w-full overflow-hidden rounded-lg border border-zinc-200">
            <div className="relative w-full h-48">
              <img
                src={projeto4.src}
                alt="Imagem de energia"
                className="absolute -z-10 inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="text-center p-4">
              <span className="text-viva-blue font-bold">
                Residencial: Cliente Cristina
              </span>
              <p className="text-sm">Economia anual média de R$18.200</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="shadow-md w-full overflow-hidden rounded-lg border border-zinc-200">
            <div className="relative w-full h-48">
              <img
                src={projeto5.src}
                alt="Imagem de energia"
                className="absolute -z-10 inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="text-center p-4">
              <span className="text-viva-blue font-bold">
                Cliente Igreja São Gerardo
              </span>
              <p className="text-sm">Economia anual média de R$35.000</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="shadow-md w-full overflow-hidden rounded-lg border border-zinc-200">
            <div className="relative w-full h-48">
              <img
                src={projeto6.src}
                alt="Imagem de energia"
                className="absolute -z-10 inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="text-center p-4">
              <span className="text-viva-blue font-bold">
                Residencial: Cliente Ítalo
              </span>
              <p className="text-sm">Economia anual média de R$9.500</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="shadow-md w-full overflow-hidden rounded-lg border border-zinc-200">
            <div className="relative w-full h-48">
              <img
                src={projeto7.src}
                alt="Imagem de energia"
                className="absolute -z-10 inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="text-center p-4">
              <span className="text-viva-blue font-bold">
                Comercial: GM Móveis Projetos
              </span>
              <p className="text-sm">Economia anula média de R$36.000</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="shadow-md w-full overflow-hidden rounded-lg border border-zinc-200">
            <div className="relative w-full h-48">
              <img
                src={projeto8.src}
                alt="Imagem de energia"
                className="absolute -z-10 inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="text-center p-4">
              <span className="text-viva-blue font-bold">
                Comercial: Mercadinho VFL
              </span>
              <p className="text-sm">Economia anual de R$40.300</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="shadow-md w-full overflow-hidden rounded-lg border border-zinc-200">
            <div className="relative w-full h-48">
              <img
                src={projeto9.src}
                alt="Imagem de energia"
                className="absolute -z-10 inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="text-center p-4">
              <span className="text-viva-blue font-bold">
                Residencial: Cliente Mário
              </span>
              <p className="text-sm">Economia anual de R$35.700</p>
            </div>
          </div>
        </SwiperSlide>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
}
