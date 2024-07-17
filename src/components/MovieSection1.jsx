import React from "react";
import Card2 from "../components/cards/Card2";

export default function MovieSection1(props) {
  return (
    <>
      <div className="py-6 md:py-16 w-11/12 m-auto">
        <div className="pb-4 md:pb-10 flex justify-between">
          <h2 className="text-xl md:text-3xl font-medium">{props?.section}</h2>
          <div className="flex flex-row items-center justify-start gap-[8px] text-lg md:text-2xl">
            <div className="relative font-semibold opacity-[0.5]">View all</div>
            <img
              className="w-[22px] relative h-5 opacity-[0.5]"
              alt=""
              src="/vector8.svg"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 md:gap-10">
          <Card2 />
          <Card2 />
          <Card2 />
        </div>
      </div>
    </>
  );
}
