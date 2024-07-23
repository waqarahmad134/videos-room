import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar"
import GetAPI from "../utilities/GetAPI"
import { useLocation } from "react-router-dom"
import { BASE_URL } from "../utilities/URL"
import axios from "axios"

export default function DefaultLayout({ children }) {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState(null)
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location?.pathname])

  const actors = GetAPI("actors")
  const actress = GetAPI("actress")
  const southActors = GetAPI("southactor")
  const mostViewedThisWeek = GetAPI("mostViewedThisWeek")

  const fetchData = () => {
    axios.get(BASE_URL + "categories").then((dat) => {
      setCategories(dat)
      setLoading(false)
      console.log("sa")
    })
  }
  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <>
        <div className="bg-black h-screen w-screen overflow-auto">
          <div className="banter-loader">
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
          </div>
        </div>
      </>
    )
  }
  return (
    <div className="sm:w-11/12 md:w-[82%] mx-auto">
      <Header categories={categories} />
      <div className="grid md:grid-cols-12 gap-4 md:gap-0">
        {children}
        <Sidebar
          categories={categories}
          actors={actors}
          actress={actress}
          southActors={southActors}
          mostViewedThisWeek={mostViewedThisWeek}
        />
      </div>
      <Footer />
    </div>
  )
}
