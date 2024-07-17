import { useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"
import { IoIosSearch, IoMdMenu } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react"
import { IoClose } from "react-icons/io5"
import axios from "axios"

export default function Header({categories}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            query: searchTerm,
            language: "en-US",
          },
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWQyYTUwNDE2Y2M5ZWQyMzRkMmFjOTdhODhhNjU5NyIsIm5iZiI6MTcxOTczNzE1MC41NjAyMzUsInN1YiI6IjY2ODExYTQxYWQ5YTE0MjlkYTE4YTg4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MrzJJrxqs6FQdsv7rC0Qc4CYl4EL70F3ckZj9ajkh-c",
            accept: "application/json",
          },
        }
      )
      localStorage.setItem(
        "searchResults",
        JSON.stringify(response?.data?.results)
      )
      navigate("/search")
    } catch (error) {
      console.error("Error searching movies:", error)
    }
  }

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <div className="text-white bg-[#0a76b6] hover:bg-[#0098ff] ">
              <nav className="flex flex-col [&>a]:border-b-[1px] [&>a]:border-white [&>a]:p-2">
                <Link to={"/"} className="relative">
                  Home
                </Link>
                {categories?.data?.data?.map((data, index) => (
                  <Link onClick={onClose} key={index} to={`/categories/${data?.id}`}>
                    {data?.name}
                  </Link>
                ))}
              </nav>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <div className="text-white bg-white w-full">
        <div className="flex justify-between items-center gap-2 px-3 py-1">
          <Link to={"/"}>
            <img
              className="w-60 rounded"
              src="https://www.watch-movies.com.pk/wp-content/uploads/2022/05/logo.png"
              alt="logo"
            />
          </Link>
          <div className="w-80">
            <form className="relative" onSubmit={handleSearch}>
              <input
                type="search"
                name="search"
                id="Search"
                placeholder="Search Movie"
                className="w-full mx-auto h-10 bg-[#082835] rounded-full pl-6 outline-none border-none text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full text-black text-sm bg-white h-6 absolute top-2 right-2 hover:text-[#fe8133] duration-200 px-3"
              >
                <IoIosSearch />
                <span className="hidden md:block">Search</span>
              </button>
            </form>
          </div>
        </div>
        {isOpen ? (
          <div
            className="fixed md:hidden right-0 h-14 z-[9999] bg-blue-400 flex items-center justify-center flex-col p-2"
            ref={btnRef}
            onClick={onClose}
          >
            Menu
            <IoClose size={32} />
          </div>
        ) : (
          <div
            className="fixed md:hidden right-0 h-14 z-[9999] bg-blue-400 flex items-center justify-center flex-col p-2"
            ref={btnRef}
            onClick={onOpen}
          >
            Menu
            <IoMdMenu size={32} />
          </div>
        )}
        <div className="bg-[#082835] hidden md:block">
          <nav className="flex flex-wrap items-center [&>a]:border-r [&>a]:p-3 ">
            <Link to={"/"} className="relative">
              Home
            </Link>
            {categories?.data?.data?.map((data, index) => (
              <Link key={index} to={`/categories/${data?.id}`}>
                {data?.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
