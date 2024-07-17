import React from "react";

export default function Card2() {
  return (
    <div>
      <div className="relative space-y-5">
        <div className="absolute top-[11px] w-full z-20 ">
          <div className="rounded-sm flex flex-row justify-between p-5 box-border gap-[4px]">
            <div className="flex items-center gap-3">
              <img
                className="w-[15px] relative h-3.5"
                alt=""
                src="/vector5.svg"
              />
              <div className="relative">8.0</div>
            </div>
            <div className="flex items-center gap-3">
              <img
                className="w-[13.3px] relative h-[13.3px] object-contain"
                alt=""
                src="/vector1.svg"
              />
              <div className="relative font-medium">3:12:00</div>
            </div>
          </div>
        </div>
        <div className="h-48 overflow-hidden rounded-md">
          <img
            className=" aspect-[4/2] object-cover hover:scale-110 ease-in"
            alt=""
            src="/rectangle-3@2x.png"
          />
        </div>
        <div className="flex items-center justify-between ">
          <h2 className="text-xl md:text-2xl font-semibold">Medellin</h2>
          <div className="flex items-center justify-end gap-3">
            <div className="rounded-md bg-red-500  p-2">
              <span className="relative">Action</span>
            </div>
            <div className="rounded-md bg-red-500 p-2">
              <span className="relative">Comedy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
