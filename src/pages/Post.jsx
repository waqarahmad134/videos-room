import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import GetAPI from "../utilities/GetAPI"
import { imgURL } from "../utilities/URL"
import DefaultLayout from "../Layout/DefaultLayout"

export default function Post() {
  const { slug } = useParams()
  const [loading, setLoading] = useState(true)
  const [movieData, setMovieData] = useState(null)
  const { data } = GetAPI(`movie/${slug}`)

  useEffect(() => {
    if (data) {
      setMovieData(data.data)
      setLoading(false)
    }
  }, [data])

  if (loading) {
    return (
      <div>
        as
      </div>
    )
  } else
    return (
      <>
        <DefaultLayout>
          <main className="md:col-span-8 p-4 bg-[#373737]">
            <h2 className="text-2xl font-bold text-white mb-4">
              {movieData?.title}
            </h2>
            
            <div className="my-5">
              <div className="text-white py-3">
                <b>{movieData?.description}</b>
              </div>

              <div className="[&>div]:mb-10 my-3">
                <div>
                  {movieData?.iframe_link1 ? (
                    <>
                      <h4 className="text-white text-xl">
                        {movieData?.title} Player{" "}
                      </h4>
                      <iframe
                        width="100%"
                        height="315"
                        src={movieData?.iframe_link1}
                        frameborder="0"
                        allow="autoplay"
                        allowfullscreen
                      ></iframe>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {movieData?.iframe_link2 ? (
                    <>
                      <h4 className="text-white text-xl">
                        {movieData?.title} Player{" "}
                      </h4>
                      <iframe
                        width="100%"
                        height="315"
                        src={movieData?.iframe_link2}
                        frameborder="0"
                        allow="autoplay"
                        allowfullscreen
                      ></iframe>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {movieData?.iframe_link3 ? (
                    <>
                      <h4 className="text-white text-xl">
                        {movieData?.title} Player{" "}
                      </h4>
                      <iframe
                        width="100%"
                        height="315"
                        src={movieData?.iframe_link3}
                        frameborder="0"
                        allow="autoplay"
                        allowfullscreen
                      ></iframe>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="[&>div]:mb-3 [&>div]:cursor-pointer my-3">
                <div className="text-center underline text-lg font-semibold bg-white text-red-500 p-2">
                  <a href={movieData?.download_link1} target="_blank">
                    Click Here To Download From Link 1
                  </a>
                </div>
                <div className="text-center underline text-lg font-semibold bg-white text-red-500 p-2">
                  <a href={movieData?.download_link2} target="_blank">
                    Click Here To Download From Link 2
                  </a>
                </div>
                <div className="text-center underline text-lg font-semibold bg-white text-red-500 p-2">
                  <a href={movieData?.download_link3} target="_blank">
                    Click Here To Download From Link 3
                  </a>
                </div>
              </div>
            </div>

            <div className="text-white flex gap-x-3">
              <div className="">
                <img
                  className="h-60"
                  src={`${imgURL}${movieData?.thumbnail}`}
                  alt={movieData?.title}
                />
              </div>
              <div>
                <h4>
                  <b>Categories : </b>
                  {movieData?.categories
                    ?.map((genre) => genre?.name)
                    .join(", ")}
                </h4>
                <h4>
                  <b>Added on :</b>
                  {new Date(movieData?.created_at).toLocaleDateString()}
                </h4>
                <h4>
                  <b>Duration :</b> {movieData?.duration}
                </h4>
                <h4>
                  <b>Views :</b> {movieData?.views}
                </h4>
                <h4>
                  <b>Duration :</b> {movieData?.duration}
                </h4>
              </div>
            </div>
          </main>
        </DefaultLayout>
      </>
    )
}
