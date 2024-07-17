import React from "react"
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import Card4 from "../components/cards/Card4"

export default function Search() {
  const searchResults = JSON.parse(localStorage.getItem("searchResults"))
  return (
    <section>
      <div className="sm:w-11/12 md:w-[82%] mx-auto">
        <Header />
        <div className="grid md:grid-cols-4 gap-4 md:gap-0">
          <main className="md:col-span-3 p-4 bg-[#373737]">
            <h2 className="text-2xl font-bold text-white mb-4">
              Searched Movies
            </h2>
            <ul></ul>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {searchResults?.map((movie, index) => (
                <Card4
                  key={index}
                  id={movie?.id}
                  title={movie?.original_title}
                  release_date={movie?.release_date}
                  img={movie?.poster_path}
                />
              ))}
            </div>
          </main>
          <Sidebar />
        </div>
        <Footer />
      </div>
    </section>
  )
}
