import React, { useState } from "react"
import DefaultLayout from "../Layout/DefaultLayout"
import { PostAPI } from "../utilities/PostAPI"
import { info_toaster, success_toaster } from "../utilities/Toaster"

export default function RequestMovie() {
  const [request, setRequest] = useState({
    name: "",
    email: "",
    movieTitle: "",
  })

  const onChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value })
  }

  const handleRequestMovie = async (e) => {
    e.preventDefault()
    const { name, email, movieTitle } = request
    if (name === "") {
      info_toaster("Please Enter Name")
    } else {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("movieTitle", movieTitle)
      try {
        let res = await PostAPI(
          "movie-requests",
          {
            name: name,
            email: email,
            movieTitle: movieTitle,
          }
          // formData
        )
        if (res?.data?.status === true) {
          success_toaster(res?.data?.message)
          setRequest({
            name: "",
            email: "",
            movieTitle: "",
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

  return (
    <>
      <DefaultLayout>
        <main className="md:col-span-8 p-4 bg-[#373737]">
          <h2 className="text-2xl font-bold text-white mb-4">Request Movie</h2>
          <form onSubmit={handleRequestMovie}>
            <div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                  Your Name
                </label>
                <input
                  value={request.name}
                  onChange={onChange}
                  name="name"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="my-5">
                <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                  Your Email
                </label>
                <input
                  value={request.email}
                  onChange={onChange}
                  name="email"
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="my-5">
                <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                  Movie Name
                </label>
                <input
                  value={request.movieTitle}
                  onChange={onChange}
                  name="movieTitle"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            </div>

            <div className="">
              <button
                className="w-full bg-red-600 p-2 text-center text-white mt-5"
                type="submit"
              >
                Request Movie
              </button>
            </div>
          </form>
        </main>
      </DefaultLayout>
    </>
  )
}
