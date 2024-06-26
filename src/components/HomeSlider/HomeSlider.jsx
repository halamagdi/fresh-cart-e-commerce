import React, { useEffect, useState } from "react";
import style from "./HomeSlider.module.css";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";

export default function HomeSlider() {
  const [first, setfirst] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <div className="grid grid-cols-12 mb-6 mx-auto w-10/12">
        <div className="col-span-8">
          <swiper-container style ={{ height : "100%"}} loop={true}>
            <swiper-slide style ={{ height : "100%"}}><img src={slider3} className="w-full h-full object-cover" alt="" /></swiper-slide>
            <swiper-slide style ={{ height : "100%"}}><img src={slider2} className="w-full h-full object-cover" alt="" /></swiper-slide>
            <swiper-slide style ={{ height : "100%"}}><img src={slider1} className="w-full h-full object-cover" alt="" /></swiper-slide>
          </swiper-container>
        </div>
        <div className="col-span-4 ">
          <div className="h-1/2">
            <img src={slider2} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="h-1/2">
            <img src={slider1} className="w-full h-full object-cover" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
