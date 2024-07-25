import React from "react"
import {
  Link,
  useLocation,
  useNavigationType,
  useParams,
} from "react-router-dom"
import DefaultLayout from "../Layout/DefaultLayout"

export default function About() {
  const action = useNavigationType()
  const location = useLocation()
  const pathname = location.pathname
  const { slug } = useParams()

  return (
    <>
      <DefaultLayout>
        <main className="md:col-span-8 p-4 bg-[#373737] text-white">About US</main>
      </DefaultLayout>
    </>
  )
}
