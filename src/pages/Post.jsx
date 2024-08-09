import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import GetAPI from "../utilities/GetAPI"
import { imgURL } from "../utilities/URL"
import DefaultLayout from "../Layout/DefaultLayout"
import { Helmet } from "react-helmet-async"
import { FaWhatsappSquare } from "react-icons/fa"
import { FaSquareXTwitter, FaLinkedin, FaFacebook } from "react-icons/fa6"
import { PostAPI } from "../utilities/PostAPI"
import { info_toaster, success_toaster } from "../utilities/Toaster"

export default function Post() {
  const { slug } = useParams()
  const [loading, setLoading] = useState(true)
  const [movieData, setMovieData] = useState(null)
  const [issue, setIssue] = useState(false)
  const { data } = GetAPI(`movie/${slug}`)

  const [complain, setComplain] = useState({
    issue: "",
    name: "",
    email: "",
    detail: "",
  })

  const onChange = (e) => {
    setComplain({ ...complain, [e.target.name]: e.target.value })
  }

  const handleReport = async (e) => {
    e.preventDefault()
    const { issue, name, email, detail } = complain
    if (name === "") {
      info_toaster("Please Enter Name")
    } else {
      try {
        let res = await PostAPI("complaints", {
          name: name,
          email: email,
          issue: issue,
          detail: detail,
          movieTitle: data?.data?.title || "",
        })
        if (res?.data?.status === true) {
          success_toaster(res?.data?.message)
          setComplain({
            issue: "",
            name: "",
            email: "",
            detail: "",
          })
        } else {
          info_toaster(res?.data?.error?.detail?.[0])
        }
      } catch (error) {
        console.error(error)
        info_toaster("An error occurred")
      }
    }
  }

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
    pinterestUrl: `https://pinterest.com/pin/create/button/?url=${currentUrl}&description=${movieData?.title}`,
    whatsapp: `https://wa.me/?text=${currentUrl}`,
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
                className="rounded-sm bg-[#0866ff]"
              >
                <svg
                  className="h-8"
                  focusable="false"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="#fff"
                    d="M28 16c0-6.627-5.373-12-12-12S4 9.373 4 16c0 5.628 3.875 10.35 9.101 11.647v-7.98h-2.474V16H13.1v-1.58c0-4.085 1.849-5.978 5.859-5.978.76 0 2.072.15 2.608.298v3.325c-.283-.03-.775-.045-1.386-.045-1.967 0-2.728.745-2.728 2.683V16h3.92l-.673 3.667h-3.247v8.245C23.395 27.195 28 22.135 28 16"
                  ></path>
                </svg>
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm bg-[#1d9bf0]"
              >
                <svg
                  className="h-8"
                  focusable="false"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="#FFF"
                    d="M28 8.557a10 10 0 0 1-2.828.775 4.93 4.93 0 0 0 2.166-2.725 9.7 9.7 0 0 1-3.13 1.194 4.92 4.92 0 0 0-3.593-1.55 4.924 4.924 0 0 0-4.794 6.049c-4.09-.21-7.72-2.17-10.15-5.15a4.94 4.94 0 0 0-.665 2.477c0 1.71.87 3.214 2.19 4.1a5 5 0 0 1-2.23-.616v.06c0 2.39 1.7 4.38 3.952 4.83-.414.115-.85.174-1.297.174q-.476-.001-.928-.086a4.935 4.935 0 0 0 4.6 3.42 9.9 9.9 0 0 1-6.114 2.107q-.597 0-1.175-.068a13.95 13.95 0 0 0 7.55 2.213c9.056 0 14.01-7.507 14.01-14.013q0-.32-.015-.637c.96-.695 1.795-1.56 2.455-2.55z"
                  ></path>
                </svg>
              </a>
              <a
                href={shareLinks.pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm bg-[#e60023]"
              >
                <svg
                  className="h-8"
                  focusable="false"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="#fff"
                    d="M15.995 4C9.361 4 4 9.37 4 15.995c0 5.084 3.16 9.428 7.622 11.176-.109-.948-.198-2.41.039-3.446.217-.938 1.402-5.963 1.402-5.963s-.356-.72-.356-1.777c0-1.668.968-2.912 2.172-2.912 1.027 0 1.52.77 1.52 1.688 0 1.027-.65 2.567-.996 3.998-.287 1.195.602 2.172 1.777 2.172 2.132 0 3.771-2.25 3.771-5.489 0-2.873-2.063-4.877-5.015-4.877-3.416 0-5.42 2.557-5.42 5.203 0 1.027.395 2.132.888 2.735a.36.36 0 0 1 .08.345c-.09.375-.297 1.195-.336 1.363-.05.217-.178.266-.405.158-1.481-.711-2.409-2.903-2.409-4.66 0-3.781 2.745-7.257 7.928-7.257 4.156 0 7.394 2.962 7.394 6.931 0 4.137-2.606 7.464-6.22 7.464-1.214 0-2.36-.632-2.744-1.383l-.75 2.854c-.267 1.046-.998 2.35-1.491 3.149a12 12 0 0 0 3.554.533C22.629 28 28 22.63 28 16.005 27.99 9.37 22.62 4 15.995 4"
                  ></path>
                </svg>
              </a>
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm bg-[#12af0a]"
              >
                <svg
                  className="h-8"
                  focusable="false"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="#FFF"
                    fill-rule="evenodd"
                    d="M16.21 4.41C9.973 4.41 4.917 9.465 4.917 15.7c0 2.134.592 4.13 1.62 5.832L4.5 27.59l6.25-2.002a11.24 11.24 0 0 0 5.46 1.404c6.234 0 11.29-5.055 11.29-11.29 0-6.237-5.056-11.292-11.29-11.292m0 20.69c-1.91 0-3.69-.57-5.173-1.553l-3.61 1.156 1.173-3.49a9.35 9.35 0 0 1-1.79-5.512c0-5.18 4.217-9.4 9.4-9.4s9.397 4.22 9.397 9.4c0 5.188-4.214 9.4-9.398 9.4zm5.293-6.832c-.284-.155-1.673-.906-1.934-1.012-.265-.106-.455-.16-.658.12s-.78.91-.954 1.096c-.176.186-.345.203-.628.048-.282-.154-1.2-.494-2.264-1.517-.83-.795-1.373-1.76-1.53-2.055s0-.445.15-.584c.134-.124.3-.326.45-.488.15-.163.203-.28.306-.47.104-.19.06-.36-.005-.506-.066-.147-.59-1.587-.81-2.173-.218-.586-.46-.498-.63-.505-.168-.007-.358-.038-.55-.045-.19-.007-.51.054-.78.332-.277.274-1.05.943-1.1 2.362-.055 1.418.926 2.826 1.064 3.023.137.2 1.874 3.272 4.76 4.537 2.888 1.264 2.9.878 3.43.85.53-.027 1.734-.633 2-1.297s.287-1.24.22-1.363c-.07-.123-.26-.203-.54-.357z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>

            <div className="my-5">
              <div className="text-white py-3">
                <b>{movieData?.description}</b>
              </div>
              <div>
                {movieData?.images?.map((data, index) => (
                  <div
                    className="h-auto w-full object-contain mb-2 sm:mb-4 overflow-hidden"
                    key={index}
                  >
                    <img
                      src={`https://backend.videosroom.com/public/images/${data?.url}`}
                      alt={index}
                    />
                  </div>
                ))}
              </div>

              <div className="[&>div]:mb-10 my-3">
                <div className={`${movieData?.iframeMobile1 ? "block" : "hidden"} sm:block`}>
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
                
                <div className={`${movieData?.iframeMobile2 ? "block" : "hidden"} sm:block`}>
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
                           
                <div className={`${movieData?.iframeMobile3 ? "block" : "hidden"} sm:block`}>
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
               
                <div className={`${movieData?.iframeMobile4 ? "block" : "hidden"} sm:block`}>
                  {movieData?.iframe_link4 ? (
                    <>
                      <h4 className="text-white text-xl">
                        {movieData?.title} Player 4
                      </h4>
                      <iframe
                        className="w-full h-96"
                        src={movieData?.iframe_link4}
                        allow="autoplay"
                        allowFullScreen
                      ></iframe>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className={`${movieData?.iframeMobile5 ? "block" : "hidden"} sm:block`}>
                  {movieData?.iframe_link5 ? (
                    <>
                      <h4 className="text-white text-xl">
                        {movieData?.title} Player 5
                      </h4>
                      <iframe
                        className="w-full h-96"
                        src={movieData?.iframe_link5}
                        allow="autoplay"
                        allowFullScreen
                      ></iframe>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className={`${movieData?.iframeMobile6 ? "block" : "hidden"} sm:block`}>
                  {movieData?.iframe_link6 ? (
                    <>
                      <h4 className="text-white text-xl">
                        {movieData?.title} Player 6
                      </h4>
                      <iframe
                        className="w-full h-96"
                        src={movieData?.iframe_link6}
                        allow="autoplay"
                        allowFullScreen
                      ></iframe>
                    </>
                  ) : (
                    ""
                  )}
                </div>             

                <div className={`${movieData?.iframeMobile7 ? "block" : "hidden"} sm:block`}>
                  {movieData?.iframe_link7 ? (
                    <>
                      <h4 className="text-white text-xl">
                        {movieData?.title} Player 7
                      </h4>
                      <iframe
                        className="w-full h-96"
                        src={movieData?.iframe_link7}
                        allow="autoplay"
                        allowFullScreen
                      ></iframe>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                
                <div className={`${movieData?.iframeMobile8 ? "block" : "hidden"} sm:block`}>
                  {movieData?.iframe_link8 ? (
                    <>
                      <h4 className="text-white text-xl">
                        {movieData?.title} Player 8
                      </h4>
                      <iframe
                        className="w-full h-96"
                        src={movieData?.iframe_link8}
                        allow="autoplay"
                        allowFullScreen
                      ></iframe>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                
                <div className={`${movieData?.iframeMobile9 ? "block" : "hidden"} sm:block`}>
                  {movieData?.iframe_link9 ? (
                    <>
                      <h4 className="text-white text-xl">
                        {movieData?.title} Player 9
                      </h4>
                      <iframe
                        className="w-full h-96"
                        src={movieData?.iframe_link9}
                        allow="autoplay"
                        allowFullScreen
                      ></iframe>
                    </>
                  ) : (
                    ""
                  )}
                </div>
               
               
                <div className={`${movieData?.iframeMobile10 ? "block" : "hidden"} sm:block`}>
                  {movieData?.iframe_link10 ? (
                    <>
                      <h4 className="text-white text-xl">
                        {movieData?.title} Player 10
                      </h4>
                      <iframe
                        className="w-full h-96"
                        src={movieData?.iframe_link10}
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
                  className="rounded-sm bg-[#0866ff]"
                >
                  <svg
                    className="h-8"
                    focusable="false"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="#fff"
                      d="M28 16c0-6.627-5.373-12-12-12S4 9.373 4 16c0 5.628 3.875 10.35 9.101 11.647v-7.98h-2.474V16H13.1v-1.58c0-4.085 1.849-5.978 5.859-5.978.76 0 2.072.15 2.608.298v3.325c-.283-.03-.775-.045-1.386-.045-1.967 0-2.728.745-2.728 2.683V16h3.92l-.673 3.667h-3.247v8.245C23.395 27.195 28 22.135 28 16"
                    ></path>
                  </svg>
                </a>
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm bg-[#1d9bf0]"
                >
                  <svg
                    className="h-8"
                    focusable="false"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="#FFF"
                      d="M28 8.557a10 10 0 0 1-2.828.775 4.93 4.93 0 0 0 2.166-2.725 9.7 9.7 0 0 1-3.13 1.194 4.92 4.92 0 0 0-3.593-1.55 4.924 4.924 0 0 0-4.794 6.049c-4.09-.21-7.72-2.17-10.15-5.15a4.94 4.94 0 0 0-.665 2.477c0 1.71.87 3.214 2.19 4.1a5 5 0 0 1-2.23-.616v.06c0 2.39 1.7 4.38 3.952 4.83-.414.115-.85.174-1.297.174q-.476-.001-.928-.086a4.935 4.935 0 0 0 4.6 3.42 9.9 9.9 0 0 1-6.114 2.107q-.597 0-1.175-.068a13.95 13.95 0 0 0 7.55 2.213c9.056 0 14.01-7.507 14.01-14.013q0-.32-.015-.637c.96-.695 1.795-1.56 2.455-2.55z"
                    ></path>
                  </svg>
                </a>
                <a
                  href={shareLinks.pinterestUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm bg-[#e60023]"
                >
                  <svg
                    className="h-8"
                    focusable="false"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="#fff"
                      d="M15.995 4C9.361 4 4 9.37 4 15.995c0 5.084 3.16 9.428 7.622 11.176-.109-.948-.198-2.41.039-3.446.217-.938 1.402-5.963 1.402-5.963s-.356-.72-.356-1.777c0-1.668.968-2.912 2.172-2.912 1.027 0 1.52.77 1.52 1.688 0 1.027-.65 2.567-.996 3.998-.287 1.195.602 2.172 1.777 2.172 2.132 0 3.771-2.25 3.771-5.489 0-2.873-2.063-4.877-5.015-4.877-3.416 0-5.42 2.557-5.42 5.203 0 1.027.395 2.132.888 2.735a.36.36 0 0 1 .08.345c-.09.375-.297 1.195-.336 1.363-.05.217-.178.266-.405.158-1.481-.711-2.409-2.903-2.409-4.66 0-3.781 2.745-7.257 7.928-7.257 4.156 0 7.394 2.962 7.394 6.931 0 4.137-2.606 7.464-6.22 7.464-1.214 0-2.36-.632-2.744-1.383l-.75 2.854c-.267 1.046-.998 2.35-1.491 3.149a12 12 0 0 0 3.554.533C22.629 28 28 22.63 28 16.005 27.99 9.37 22.62 4 15.995 4"
                    ></path>
                  </svg>
                </a>
                <a
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm bg-[#12af0a]"
                >
                  <svg
                    className="h-8"
                    focusable="false"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="#FFF"
                      fill-rule="evenodd"
                      d="M16.21 4.41C9.973 4.41 4.917 9.465 4.917 15.7c0 2.134.592 4.13 1.62 5.832L4.5 27.59l6.25-2.002a11.24 11.24 0 0 0 5.46 1.404c6.234 0 11.29-5.055 11.29-11.29 0-6.237-5.056-11.292-11.29-11.292m0 20.69c-1.91 0-3.69-.57-5.173-1.553l-3.61 1.156 1.173-3.49a9.35 9.35 0 0 1-1.79-5.512c0-5.18 4.217-9.4 9.4-9.4s9.397 4.22 9.397 9.4c0 5.188-4.214 9.4-9.398 9.4zm5.293-6.832c-.284-.155-1.673-.906-1.934-1.012-.265-.106-.455-.16-.658.12s-.78.91-.954 1.096c-.176.186-.345.203-.628.048-.282-.154-1.2-.494-2.264-1.517-.83-.795-1.373-1.76-1.53-2.055s0-.445.15-.584c.134-.124.3-.326.45-.488.15-.163.203-.28.306-.47.104-.19.06-.36-.005-.506-.066-.147-.59-1.587-.81-2.173-.218-.586-.46-.498-.63-.505-.168-.007-.358-.038-.55-.045-.19-.007-.51.054-.78.332-.277.274-1.05.943-1.1 2.362-.055 1.418.926 2.826 1.064 3.023.137.2 1.874 3.272 4.76 4.537 2.888 1.264 2.9.878 3.43.85.53-.027 1.734-.633 2-1.297s.287-1.24.22-1.363c-.07-.123-.26-.203-.54-.357z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
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
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Select an option
                        </label>
                        <select
                          value={complain.issue}
                          onChange={onChange}
                          name="issue"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option>Choose Issue</option>
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
                            value={complain.name}
                            onChange={onChange}
                            name="name"
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your Email
                          </label>
                          <input
                            value={complain.email}
                            onChange={onChange}
                            name="email"
                            type="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Details
                        </label>
                        <textarea
                          value={complain.detail}
                          onChange={onChange}
                          name="detail"
                          rows="8"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                      </div>
                    </div>
                    <div className="bg-red-600 p-2 text-center text-white mt-5">
                      <button className="w-full" type="submit">
                        Submit Report
                      </button>
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
                {movieData?.download_link4 && (
                  <div className="text-center underline text-lg font-semibold bg-white text-red-500 p-2">
                    <a href={movieData?.download_link4} target="_blank">
                      Click Here To Download From Link 4
                    </a>
                  </div>
                )}
                {movieData?.download_link5 && (
                  <div className="text-center underline text-lg font-semibold bg-white text-red-500 p-2">
                    <a href={movieData?.download_link5} target="_blank">
                      Click Here To Download From Link 5
                    </a>
                  </div>
                )}
                {movieData?.download_link6 && (
                  <div className="text-center underline text-lg font-semibold bg-white text-red-500 p-2">
                    <a href={movieData?.download_link6} target="_blank">
                      Click Here To Download From Link 6
                    </a>
                  </div>
                )}
                {movieData?.download_link7 && (
                  <div className="text-center underline text-lg font-semibold bg-white text-red-500 p-2">
                    <a href={movieData?.download_link7} target="_blank">
                      Click Here To Download From Link 7
                    </a>
                  </div>
                )}
                {movieData?.download_link8 && (
                  <div className="text-center underline text-lg font-semibold bg-white text-red-500 p-2">
                    <a href={movieData?.download_link8} target="_blank">
                      Click Here To Download From Link 8
                    </a>
                  </div>
                )}
                {movieData?.download_link9 && (
                  <div className="text-center underline text-lg font-semibold bg-white text-red-500 p-2">
                    <a href={movieData?.download_link9} target="_blank">
                      Click Here To Download From Link 9
                    </a>
                  </div>
                )}
                {movieData?.download_link10 && (
                  <div className="text-center underline text-lg font-semibold bg-white text-red-500 p-2">
                    <a href={movieData?.download_link10} target="_blank">
                      Click Here To Download From Link 10
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
