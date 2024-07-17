import { Routes, Route, BrowserRouter } from "react-router-dom"
import About from "./pages/About"
import Post from "./pages/Post"
import Home from "./pages/Home"
import ErrorPage from "./errors/error-page"
import { ToastContainer } from "react-toastify"
import { ChakraProvider } from "@chakra-ui/react"
import Genre from "./pages/Genre"
import Year from "./pages/Year"
import Search from "./pages/Search"

function App() {
  return (
    <div>
      <ToastContainer />
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:slug" element={<Post />} />
            <Route path="/:categories/:Id" element={<Genre />} />
            <Route path="/year/:year" element={<Year />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  )
}

export default App
