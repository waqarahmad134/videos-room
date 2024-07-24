import React from "react"
import { Link } from "react-router-dom"
import { imgURL } from "../../utilities/URL"

export default function Card4(props) {
  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };
  return (
    <>
      <Link
        to={`/movie/${props?.slug}`}
        className="bg-[#7091E6] text-white p-1 sm:p-2 cursor-pointer hover:bg-[#3D52A0]"
      >
        <h3 className="text-sm sm:text-[17px] leading-tight mb-2">{truncateString(props?.title, 40)}</h3>
        <img
          src={`${imgURL}${props?.img}`}
          alt="Movie poster"
          className="w-full h-48 sm:h-52 object-cover object-top mb-2"
        />
        <div>
          <p className="text-xs">Views : {props?.views}</p>
        </div>
      </Link>
    </>
  )
}
