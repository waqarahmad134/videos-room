import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { imgURL } from "../utilities/URL"
import request from "../Images/request-movie-button.jpg"

export default function Sidebar({
  categories,
  actors,
  actress,
  southActors,
  mostViewedThisWeek,
  mostViewedLast24Hours,
  allTimeHighViews,
  latestMovies,
  loading,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [tab, setTab] = useState("recentMovies")
  const startYear = 1990
  const endYear = new Date().getFullYear()
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
      return str
    }
    return str.slice(0, num) + "..."
  }

  return (
    <>
      <aside className="md:col-span-4 bg-[#373737] sm:border-l-2 sm:border-white px-4">
        <div className="rounded mb-4 space-y-3">
          {/* <div className="">
            <img
              src="../src/Images/apk.png"
              alt=""
              className="m-auto my-2"
            />
          </div> */}
          <Link to={"/request-movie"} className="">
            <img src={request} alt="" className="m-auto" />
          </Link>
          {loading ? (
            <div className="flex items-center justify-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {location?.pathname.includes("movie") ? (
                <>
                  <div className="border border-white">
                    <div className="grid grid-cols-2">
                      <h3
                        onClick={() => setTab("recentMovies")}
                        className={` ${
                          tab === "recentMovies"
                            ? "border-r border-white bg-[#7091E6]"
                            : "bg-[#3D52A0]"
                        } cursor-pointer text-center font-semibold  text-white px-2 py-1`}
                      >
                        Recent Movies
                      </h3>
                      <h3
                        onClick={() => setTab("popularMovies")}
                        className={` ${
                          tab === "popularMovies"
                            ? "border-l border-white bg-[#7091E6]"
                            : "bg-[#3D52A0]"
                        } cursor-pointer text-center font-semibold  text-white px-2 py-1`}
                      >
                        Popular Movies
                      </h3>
                    </div>
                    {tab === "recentMovies" ? (
                      <ul className="bg-[#7091E6] text-white">
                        {latestMovies?.data?.map((data, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-1 border-b border-b-black"
                          >
                            <div className="h-[55px] min-w-[55px] max-w-[56px]">
                              <img
                                className="h-full w-full object-cover"
                                src={`${imgURL}${data?.thumbnail}`}
                                alt={data?.title}
                              />
                            </div>
                            <div>
                              <li
                                className="capitalize cursor-pointer text-xs font-semibold"
                                onClick={() =>
                                  handleGenreClick(data?.id, "movie")
                                }
                              >
                                {data?.title}
                              </li>
                              <li className="text-sm">Views : {data?.views}</li>
                            </div>
                          </div>
                        ))}
                      </ul>
                    ) : (
                      <ul className="bg-[#7091E6] text-white">
                        {allTimeHighViews?.data?.map((data, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-1 border-b border-b-black"
                          >
                            <div className="h-[55px] min-w-[55px] max-w-[56px]">
                              <img
                                className="h-full w-full object-cover"
                                src={`${imgURL}${data?.thumbnail}`}
                                alt={data?.title}
                              />
                            </div>
                            <div>
                              <li
                                className="capitalize cursor-pointer text-xs font-semibold"
                                onClick={() =>
                                  handleGenreClick(data?.id, "movie")
                                }
                              >
                                {data?.title}
                              </li>
                              <li className="text-sm">Views : {data?.views}</li>
                            </div>
                          </div>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <h3 className="text-center font-semibold bg-[#3D52A0] text-white px-2 py-1">
                      Most Viewed Movies For 24 Hours
                    </h3>
                    <ul className="bg-[#7091E6] text-white">
                      {mostViewedLast24Hours?.data?.map((data, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-1 border-b border-b-black"
                        >
                          <div className="h-[65px] min-w-[65px] max-w-[66px]">
                            <img
                              className="h-full w-full object-cover"
                              src={`${imgURL}${data?.thumbnail}`}
                              alt={data?.title}
                            />
                          </div>
                          <li
                            className="cursor-pointer"
                            style={{ width: "calc(100% - 90px)" }}
                            onClick={() => handleGenreClick(data?.id, "movie")}
                          >
                            {truncateString(data?.title, 50)}
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-center font-semibold bg-[#3D52A0] text-white px-2 py-1">
                      THIS WEEK MOST VIEWED MOVIES
                    </h3>
                    <ul className="bg-[#7091E6] text-white">
                      {mostViewedThisWeek?.data?.map((data, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-1 border-b border-b-black"
                        >
                          <div className="h-[65px] min-w-[65px] max-w-[66px]">
                            <img
                              className="h-full w-full object-cover"
                              src={`${imgURL}${data?.thumbnail}`}
                              alt={data?.title}
                            />
                          </div>
                          <li
                            className="cursor-pointer line-clamp-2"
                            onClick={() => handleGenreClick(data?.id, "movie")}
                          >
                            {data?.title}
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-center font-semibold bg-[#3D52A0] text-white px-2 py-1">
                      Categories
                    </h3>
                    <ul className="bg-[#7091E6] text-white grid grid-cols-2 [&>li]:border-b-[1px] [&>li]:border-r-[1px] [&>li]:border-black [&>li]:px-3 [&>li]:py-[2px] ">
                      {categories?.data?.map((genre) => (
                        <li
                          className="cursor-pointer"
                          onClick={() =>
                            handleGenreClick(genre?.id, "categories")
                          }
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
                      {actors?.data?.map((actor) => (
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
                      {actress?.data?.map((actres) => (
                        <li
                          className="cursor-pointer"
                          onClick={() =>
                            handleGenreClick(actres?.id, "actress")
                          }
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
                      {southActors?.data?.map((actor) => (
                        <li
                          className="cursor-pointer"
                          onClick={() =>
                            handleGenreClick(actor?.id, "southactor")
                          }
                          key={actor.id}
                        >
                          {actor.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </>
          )}
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
