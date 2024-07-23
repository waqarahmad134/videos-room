import React from "react"
import Card4 from "../components/cards/Card4"
import DefaultLayout from "../Layout/DefaultLayout"

export default function Search() {
  const searchResults = JSON.parse(localStorage.getItem("searchResults")) || [];

  return (
    <>
      <DefaultLayout>
        <main className="md:col-span-8 p-4 bg-[#373737]">
          <h2 className="text-2xl font-bold text-white mb-4">
            Searched Movies
          </h2>
          <ul></ul>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {searchResults.length > 0 ? (
              searchResults?.map((item, index) => (
                <Card4
                  key={index}
                  slug={item?.slug}
                  title={item?.title}
                  img={item?.thumbnail}
                  duration={item?.duration}
                  views={item?.views}
                />
              ))
            ) : (
              <p className="text-white">No Data Available</p>
            )}
          </div>
        </main>
      </DefaultLayout>
    </>
  )
}
