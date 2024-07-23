import React from "react"
import Card4 from "../components/cards/Card4"
import GetAPI from "../utilities/GetAPI"
import DefaultLayout from "../Layout/DefaultLayout"

export default function Home() {
  const { data } = GetAPI("movies")

  return (
    <>
      <DefaultLayout>
        <main className="md:col-span-8 p-1 sm:p-4 bg-[#373737]">
          <h2 className="text-2xl font-bold text-white mb-4">Popular Movies</h2>
          <ul></ul>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
            {data?.data?.data?.map((item, index) => (
              <Card4
                key={index}
                slug={item?.slug}
                title={item?.title}
                img={item?.thumbnail}
                duration={item?.duration}
                views={item?.views}
              />
            ))}
          </div>
          <div className="hidden sm:block my-5">
            <div className="text-white">
              <b>Watch Online Movies Purpose / Idea</b> <br /> Watch Online
              Movies in HD Print Quality Free Download,Watch Full Movies Online
              Bollywood Movies Download Latest Hollywood Movies in DVD Print
              Quality Free. Watch Online Movies is my hobby and i daily watch 1
              or 2 movies online and specially the indian movies on their
              release day i'm always watch on different websites in cam print
              but i always use google search to find the movies,then i decide
              that i make a platform for users where they can see HD/DVD Print
              Quality movies and i listed all latest movies. I also capture the
              different categories of movies like if you want to see Hollywood
              movies, or you want to see punjabi movies or you are interested in
              Bollywood movies then i have all these type of categories in my
              website. I also focus on categories of movies based on actress and
              actors , like a person want to see all movies of Amir khan from My
              website there he select category Amir Khan Movis list then All
              movies of amir khan Will be displayed. so we provide the list of
              movies from all actress and actors so you can find any movie and
              watch in High Print quality. So i try my best to understand the
              needs of users who want to watch a movie,but still if you have any
              suggestion for me or you want to give me any advice you are always
              welcome.make comment on video i will surely reply you. i provide
              online Full movies to watch and Free Download so always stay
              connected with our website to enjoy the latest movies and if you
              dont have time to watch just make that movie on download and when
              will you free then you will watch that movie in best print.
            </div>
          </div>
        </main>
      </DefaultLayout>
    </>
  )
}
