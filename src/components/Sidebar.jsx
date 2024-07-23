import React from "react"
import { useNavigate } from "react-router-dom"
import { imgURL } from "../utilities/URL"

export default function Sidebar({ categories, actors, actress, southActors ,mostViewedThisWeek }) {
  console.log("🚀 ~ Sidebar ~ mostViewedThisWeek:", mostViewedThisWeek)
  const navigate = useNavigate()
  const startYear = 1990 // Start year
  const endYear = new Date().getFullYear() // Current year
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (v, k) => endYear - k
  )

  const handleGenreClick = (id, categories) => {
    navigate(`/${categories}/${id}`)
  }

  // const handleYearClick = (year) => {
  //   navigate(`/year/${year}`, { state: { year } })
  // }
  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };

  return (
    <>
      <aside className="md:col-span-4 bg-[#373737] border-l-2 border-white px-4">
        <div className="rounded mb-4 space-y-3">
          {/* <div className="">
            <img
              src="../src/Images/apk.png"
              alt=""
              className="m-auto my-2"
            />
          </div> */}
          <div className="">
            <img
              src="https://www.watch-movies.com.pk/wp-content/uploads/2017/10/request-movie-button.jpg"
              alt=""
              className="m-auto"
            />
          </div>
          <div>
            <h3 className="text-center font-semibold bg-[#3D52A0] text-white px-2 py-1">
              THIS WEEK MOST VIEWED MOVIES
            </h3>
            <ul className="bg-[#7091E6] text-white ">
              {mostViewedThisWeek?.data?.data?.map((data , index) => (
                <div className="flex items-center gap-2 p-1 border-b border-b-black">
                  <img className="h-[55px] w-[65px] object-contain"  src={`${imgURL}${data?.thumbnail}`} alt={data?.title} />
                  
                  <li
                    className="cursor-pointer"
                    onClick={() => handleGenreClick(data?.id)}
                    key={index}
                  >
                    {truncateString(data?.title, 50)}
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <div className="">
            <h3 className="text-center font-semibold bg-[#3D52A0] text-white px-2 py-1">
              Categories
            </h3>
            <ul className="bg-[#7091E6] text-white grid grid-cols-2 [&>li]:border-b-[1px] [&>li]:border-r-[1px] [&>li]:border-black [&>li]:px-3 [&>li]:py-[2px] ">
              {categories?.data?.data?.map((genre) => (
                <li
                  className="cursor-pointer"
                  onClick={() => handleGenreClick(genre?.id, "categories")}
                  key={genre.id}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-center font-semibold bg-[#3D52A0] text-white px-2 py-1">
              Actors
            </h3>
            <ul className="bg-[#7091E6] text-white grid grid-cols-2 [&>li]:border-b-[1px] [&>li]:border-r-[1px] [&>li]:border-black [&>li]:px-3 [&>li]:py-[2px] ">
              {actors?.data?.data?.map((actor) => (
                <li
                  className="cursor-pointer"
                  onClick={() => handleGenreClick(actor?.id, "actors")}
                  key={actor.id}
                >
                  {actor.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-center font-semibold bg-[#3D52A0] text-white px-2 py-1">
              Actress
            </h3>
            <ul className="bg-[#7091E6] text-white grid grid-cols-2 [&>li]:border-b-[1px] [&>li]:border-r-[1px] [&>li]:border-black [&>li]:px-3 [&>li]:py-[2px] ">
              {actress?.data?.data?.map((actres) => (
                <li
                  className="cursor-pointer"
                  onClick={() => handleGenreClick(actres?.id, "actress")}
                  key={actres.id}
                >
                  {actres.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-center font-semibold bg-[#3D52A0] text-white px-2 py-1">
              South Actors
            </h3>
            <ul className="bg-[#7091E6] text-white grid grid-cols-2 [&>li]:border-b-[1px] [&>li]:border-r-[1px] [&>li]:border-black [&>li]:px-3 [&>li]:py-[2px] ">
              {southActors?.data?.data?.map((actor) => (
                <li
                  className="cursor-pointer"
                  onClick={() => handleGenreClick(actor?.id, "southactor")}
                  key={actor.id}
                >
                  {actor.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <div className="py-2">
          <h3 className="text-center font-semibold bg-[#3D52A0] text-white px-2 py-1">
            Filter by Year
          </h3>
          <ul className="bg-[#7091E6] text-white grid grid-cols-2 [&>li]:border-b-[1px] [&>li]:border-r-[1px] [&>li]:border-black [&>li]:px-3 [&>li]:py-[2px] ">
            {years.map((year) => (
              <li
                className="cursor-pointer"
                key={year}
                onClick={() => handleYearClick(year)}
              >
                {year}
              </li>
            ))}
          </ul>
        </div> */}
      </aside>
    </>
  )
}
