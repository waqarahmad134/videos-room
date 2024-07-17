import React from "react";

export default function Banner() {
  return (
    <>
      <div className="bg-heroBg bg-cover bg-no-repeat">
        <div className="w-11/12 m-auto pb-36 pt-52 space-y-4  ">
          <h1 className="text-4xl font-semibold">Avatar: The Way of Water</h1>
          <div className="flex flex-col md:flex-row items-start justify-start gap-[8px] text-black">
            <div className="flex items-center justify-start gap-x-3">
              <div className="rounded-xl bg-white flex flex-row items-center justify-center p-2.5">
                <h5 className="relative font-semibold">Action</h5>
              </div>
              <div className="rounded-xl bg-white flex flex-row items-center justify-center p-2.5">
                <h5 className="relative font-semibold">Adventure</h5>
              </div>
              <div className="rounded-xl bg-white flex flex-row items-center justify-center p-2.5">
                <h5 className="relative font-semibold">Science Fiction</h5>
              </div>
            </div>
            <div className="flex items-center justify-start gap-x-3">
              <div className="rounded-xl flex flex-row items-center justify-center p-2.5 gap-[10px] text-white">
                <img
                  className="w-[17.1px] relative h-[17px]"
                  alt=""
                  src="/group.svg"
                />
                <div className="relative font-medium">2022</div>
              </div>
              <div className="rounded-xl flex flex-row items-center justify-center p-2.5 gap-[10px] text-white">
                <img
                  className="w-[13.3px] relative h-[13.3px] object-contain"
                  alt=""
                  src="/vector1.svg"
                />
                <div className="relative font-medium">3:12:00</div>
              </div>
              <div className="rounded-xl flex flex-row items-center justify-center p-2.5 gap-[10px] text-white">
                <img
                  className="w-[17px] relative h-4"
                  alt=""
                  src="/vector2.svg"
                />
                <div className="relative font-medium">8.5</div>
              </div>
            </div>
          </div>
          <div className="font-medium inline-block md:w-[626px]">
            <p>
              Set more than a decade after the events of the first film, learn
              the story of the Sully family (Jake, Neytiri, and their kids), the
              trouble that follows them, the lengths they go to keep each other
              safe, the battles they fight to stay alive, and the tragedies they
              endure.
            </p>
          </div>

          <div>
            <button className="flex items-center justify-start rounded-lg bg-red-500 p-2.5 gap-[10px]">
              <b className="relative">Watch Now</b>
              <img
                className="w-[31px] relative h-[31px]"
                alt=""
                src="/vector3.svg"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
