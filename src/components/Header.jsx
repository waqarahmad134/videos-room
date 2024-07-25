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
import { BASE_URL } from "../utilities/URL"

export default function Header({ categories }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const getCategoryLimit = () => {
    if (window.innerWidth >= 1024) {
      return 8
    } else if (window.innerWidth >= 768) {
      return 7
    }
    return categories.length
  }
  const categoryLimit = getCategoryLimit()
  console.log("🚀 ~ Header ~ categoryLimit:", categoryLimit)

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`${BASE_URL}search`, {
        params: {
          title: searchTerm,
        },
      })
      localStorage.setItem("searchResults", JSON.stringify(response.data.data))

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
            <div className="text-white bg-[#3D52A0] [&>a]:hover:bg-[#0098ff] ">
              <nav className="flex flex-col [&>a]:border-b-[1px] [&>nav>a]:border-white [&>a]:p-2">
                <Link to={"/"} className="relative">
                  Home
                </Link>
                {categories?.data?.map((data, index) => (
                  <Link
                    onClick={onClose}
                    key={index}
                    to={`/categories/${data?.id}`}
                  >
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
            <img className="w-52 rounded" src="/logo.png" alt="logo" />
          </Link>
          <div className="w-80">
            <form
              className="relative flex items-center justify-between gap-3"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                name="search"
                id="Search"
                placeholder="Search Movie"
                className="w-full mx-auto h-10 bg-[#d5d5d5] pl-3 outline-none border border-[#3D52A0] text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 text-white text-lg h-10 bg-[#3D52A0] px-3"
              >
                <IoIosSearch />
                <span className="hidden md:block">Search</span>
              </button>
            </form>
          </div>
        </div>
        {isOpen ? (
          <div
            className="fixed md:hidden right-0 h-14 z-[9999] bg-[#3D52A0] flex items-center justify-center flex-col p-2"
            ref={btnRef}
            onClick={onClose}
          >
            Menu
            <IoClose size={32} />
          </div>
        ) : (
          <div
            className="fixed md:hidden right-0 h-14 z-[9999] bg-[#3D52A0] flex items-center justify-center flex-col p-2"
            ref={btnRef}
            onClick={onOpen}
          >
            Menu
            <IoMdMenu size={32} />
          </div>
        )}
        <div className="bg-[#3D52A0] hidden md:block">
          <nav className="flex flex-wrap items-center [&>a]:border-r md:[&>a]:p-1 lg:[&>a]:p-2">
            <Link to={"/"} className="relative">
              Home
            </Link>
            {categories?.data?.slice(0, categoryLimit).map((data, index) => (
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
