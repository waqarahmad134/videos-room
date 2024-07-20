import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import GetAPI from "../utilities/GetAPI"
import { imgURL } from "../utilities/URL"
import DefaultLayout from "../Layout/DefaultLayout"
import { Helmet } from "react-helmet-async"
import { FaWhatsappSquare } from "react-icons/fa";
import { FaSquareXTwitter ,FaLinkedin ,FaFacebook  } from "react-icons/fa6";



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

  const currentUrl = window.location.href;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${movieData?.title}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${currentUrl}&title=${movieData?.title}`,
    whatsapp: `https://wa.me/?text=${currentUrl}`,
  };

  if (loading) {
    return <div>Loading</div>
  } else
    return (
      <>
        <Helmet>
          <meta http-equiv="Permissions-Policy" content="fullscreen=(self)" />
        </Helmet>
        <DefaultLayout>
          <main className="md:col-span-8 p-4 bg-[#373737]">
            <h2 className="text-2xl font-bold text-white mb-4">
              {movieData?.title}
            </h2>
            <div className="text-lg text-red-600 font-semibold">
              To play Movie Click on Play icon on Player 2-3 times until Movie
              Starts, During this Few Useless windows opened just close them
              they are ADS.
              <br /> If the Movie keeps buffering, Just pause it for 5-10
              minutes then continue playing!.{" "}
            </div>
            <div className="flex items-center justify-center gap-4 my-4">
              <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                <FaFacebook  size={32} />
              </a>
              <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-300">
                <FaSquareXTwitter size={32} />
              </a>
              <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                <FaLinkedin size={32} />
              </a>
              <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-500">
              <FaWhatsappSquare size={32}/>
              </a>
            </div>


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
                        data-src={movieData?.iframe_link1}
                        allow="autoplay; fullscreen https://ok.ru/"
                        allowFullScreen={true}
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
