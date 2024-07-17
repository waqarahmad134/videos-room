import React from "react";
import { Link } from "react-router-dom";

export default function Card1(props) {
  return (
    <>
      <div className="flex flex-row items-center justify-start gap-3">
        <Link>
          <img
            className="relative rounded-sm h-52 w-full object-cover"
            alt={props?.name}
            src="/rectangle-22@2x.png"
          />
        </Link>
        <div className="flex flex-col items-start justify-start gap-[4px]">
          <div className="relative font-medium">{props?.name || "The Flash"} {props?.index}</div>
          <div className="relative">{props?.type || "Series/Movie"}</div>
          <div className="relative">{props?.createdAt || "11/05/23"}</div>
        </div>
      </div>
    </>
  );
}
