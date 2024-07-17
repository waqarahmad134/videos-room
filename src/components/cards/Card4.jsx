import React from "react"
import { Link } from "react-router-dom"
import { imgURL } from "../../utilities/URL"

export default function Card4(props) {
  return (
    <>
      <Link
        to={`/movie/${props?.slug}`}
        className="bg-[#004a70] text-white p-2 cursor-pointer hover:bg-black"
      >
        <img
          src={`${imgURL}${props?.img}`}
          alt="Movie poster"
          className="w-full h-32 sm:h-52 object-cover object-top mb-2"
        />
        <div>
          <h3 className="font-semibold">{props?.title}</h3>
          {props?.duration && (
            <p className="text-sm">Duration : {props?.duration}</p>
          )}
          <p className="text-sm">Views : {props?.views}</p>
        </div>
      </Link>
    </>
  )
}
