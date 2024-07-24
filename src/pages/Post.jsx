import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import GetAPI from "../utilities/GetAPI"
import { imgURL } from "../utilities/URL"
import DefaultLayout from "../Layout/DefaultLayout"
import { Helmet } from "react-helmet-async"
import { FaWhatsappSquare } from "react-icons/fa"
import { FaSquareXTwitter, FaLinkedin, FaFacebook } from "react-icons/fa6"

export default function Post() {
  const { slug } = useParams()
  const [loading, setLoading] = useState(true)
  const [movieData, setMovieData] = useState(null)
  console.log("🚀 ~ Post ~ movieData:", movieData)
  const [issue, setIssue] = useState(false)
  const { data } = GetAPI(`movie/${slug}`)

  useEffect(() => {
    if (data) {
      setMovieData(data.data)
      setLoading(false)
    }
  }, [data])

  const currentUrl = window.location.href

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${movieData?.title}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${currentUrl}&title=${movieData?.title}`,
    whatsapp: `https://wa.me/?text=${currentUrl}`,
  }

  const handleReport = (e) => {
    e.preventDefault()
    setIssue(!issue)
    alert("Report Submitted Sucessfully")
  }

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
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400"
              >
                <FaFacebook size={32} />
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300"
              >
                <FaSquareXTwitter size={32} />
              </a>
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                <FaLinkedin size={32} />
              </a>
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500"
              >
                <FaWhatsappSquare size={32} />
              </a>
            </div>

            <div className="my-5">
              <div className="text-white py-3">
                <b>{movieData?.description}</b>
              </div>
              <div>
                {movieData?.images?.map((data, index) => (
                  <div className="h-96 w-full object-contain mb-10" key={index}>
                    <img
                      src={`https://backend.videosroom.com/public/images/${data?.url}`}
                      alt={index}
                    />
                  </div>
                ))}
              </div>

              <div className="[&>div]:mb-10 my-3">
                <div>
                  {movieData?.iframe_link1 ? (
                    <>
                      <h4 className="text-white text-xl">
                        {movieData?.title} Player 1
                      </h4>
                      <iframe
                        className="w-full h-96"
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
                        {movieData?.title} Player 2
                      </h4>
                      <iframe
                        className="w-full h-96"
                        src={movieData?.iframe_link2}
                        allow="autoplay"
                        allowFullScreen
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
                        {movieData?.title} Player 3
                      </h4>
                      <iframe
                        className="w-full h-96"
                        src={movieData?.iframe_link3}
                        allow="autoplay"
                        allowFullScreen
                      ></iframe>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 my-4">
                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  <FaFacebook size={32} />
                </a>
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300"
                >
                  <FaSquareXTwitter size={32} />
                </a>
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  <FaLinkedin size={32} />
                </a>
                <a
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500"
                >
                  <FaWhatsappSquare size={32} />
                </a>
              </div>

              <div className="text-center text-base bg-red-600 text-white p-2 w-11/12 mx-auto">
                <button
                  onClick={() => {
                    setIssue(!issue)
                  }}
                >
                  Click Here To Report If Video Not Working OR Bad Video Quality
                  OR Any Other Issue{" "}
                </button>
              </div>
              {issue && (
                <div className="bg-gray-100 border-t-4 border-red-500 my-5">
                  <form onSubmit={handleReport} className="p-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label
                          for="countries"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Select an option
                        </label>
                        <select
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected>Choose Issue</option>
                          <option value="Movie Not Working">
                            Movie Not Working
                          </option>
                          <option value="Downlaod Link Not Working">
                            Downlaod Link Not Working
                          </option>
                          <option value="Player Are Deleted">
                            Player Are Deleted
                          </option>
                          <option value="Slow Buffering Speed">
                            Slow Buffering Speed
                          </option>
                          <option value="Other">Other</option>
                        </select>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your name
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your Email
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Details
                        </label>
                        <textarea
                          rows="8"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                      </div>
                    </div>
                    <div className="bg-red-600 p-2 text-center text-white mt-5">
                      <button type="submit">Submit Report</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="[&>div]:mb-3 [&>div]:cursor-pointer my-3">
                {movieData?.download_link1 && (
                  <div className="text-center underline text-lg font-semibold bg-white text-red-500 p-2">
                    <a href={movieData?.download_link1} target="_blank">
                      Click Here To Download From Link 1
                    </a>
                  </div>
                )}
                {movieData?.download_link2 && (
                  <div className="text-center underline text-lg font-semibold bg-white text-red-500 p-2">
                    <a href={movieData?.download_link2} target="_blank">
                      Click Here To Download From Link 2
                    </a>
                  </div>
                )}
                {movieData?.download_link3 && (
                  <div className="text-center underline text-lg font-semibold bg-white text-red-500 p-2">
                    <a href={movieData?.download_link3} target="_blank">
                      Click Here To Download From Link 3
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="text-white flex gap-x-3">
              <div className="">
                <img
                  className="h-60 w-52 object-cover"
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
