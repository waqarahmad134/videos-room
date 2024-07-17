import React from "react";
import { Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Card1 from "../components/cards/Card1";

export default function MovieSection() {
  const waqar = [1, 2, 33, 5, 6, 7, 8];
  return (
    <>
      <div className="py-6 md:py-16 w-11/12 m-auto">
        <div className="pb-10 flex justify-between">
          <h2 className="text-xl md:text-3xl font-medium">Recently Updated</h2>
          <div className="flex flex-row items-center justify-start gap-[8px] text-lg md:text-2xl">
            <div className="relative font-semibold opacity-[0.5]">View all</div>
            <img
              className="w-[22px] relative h-5 opacity-[0.5]"
              alt=""
              src="/vector8.svg"
            />
          </div>
        </div>
        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            grabCursor={true}
            loop={true}
            navigation={true}
            modules={[Mousewheel, Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
             
            }}
            className="mySwiper w-11/12 ml-0"
          >
            {waqar?.map((data, index) => (
              <SwiperSlide>
                <Card1 index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
