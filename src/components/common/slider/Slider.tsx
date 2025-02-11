import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay } from "swiper/modules";
import React from "react";

interface SliderProps {
  children?: React.ReactNode;
}

const Slider: React.FC<SliderProps> = ({ children }) => {
  return (
    <Swiper
      spaceBetween={0}
      effect={"fade"}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="mySwiper"
    >
      {React.Children.map(children, (child) => (
        <SwiperSlide className="h-full">{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
