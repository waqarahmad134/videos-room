import React from "react";

export default function Card3(props) {
  return (
    <>
      <div className="space-y-3 cursor-pointer">
        <div className="relative card3">
          <img
            className="rounded-md aspect-[9/12] object-cover"
            alt={props?.name}
            src="/rectangle-6@2x.png"
          />
          <span className="hidden absolute top-0 h-full w-full bg-black bg-opacity-50"></span>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <h2 className="relative font-medium">{props?.name || "Movie"}</h2>
          <div className="flex flex-row items-start justify-start gap-[8px]">
            <div className="rounded-md bg-red-500 p-1">
              <span className="font-medium">{props?.quality || "HD"}</span>
            </div>
            <div className="hidden md:flex flex-row items-center justify-center rounded-md p-1 gap-[8px] border-[1px] border-solid border-red-500">
              <img
                className="w-[13.3px] h-[13.3px] object-contain"
                alt=""
                src="/vector1.svg"
              />
              <span className="font-medium">
                {props?.duration || "3:12:00"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
