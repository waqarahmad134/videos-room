import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Home from "./pages/Home";
import ErrorPage from "./errors/error-page";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { DataProvider } from "./context/DataContext";

// Lazy load the other components
const About = lazy(() => import("./pages/About"));
const Post = lazy(() => import("./pages/Post"));
const Genre = lazy(() => import("./pages/Genre"));
const Year = lazy(() => import("./pages/Year"));
const Search = lazy(() => import("./pages/Search"));
const RequestMovie = lazy(() => import("./pages/RequestMovie"));

function App() {
  return (
    <div>
      <ToastContainer />
      <HelmetProvider>
        <ChakraProvider>
          <BrowserRouter>
            <DataProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/about"
                  element={
                    <Suspense fallback={<div></div>}>
                      <About />
                    </Suspense>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <Suspense fallback={<div></div>}>
                      <Search />
                    </Suspense>
                  }
                />
                <Route
                  path="/request-movie"
                  element={
                    <Suspense fallback={<div></div>}>
                      <RequestMovie />
                    </Suspense>
                  }
                />
                <Route
                  path="/movie/:slug"
                  element={
                    <Suspense fallback={<div></div>}>
                      <Post />
                    </Suspense>
                  }
                />
                <Route
                  path="/:categories/:Id"
                  element={
                    <Suspense fallback={<div></div>}>
                      <Genre />
                    </Suspense>
                  }
                />
                <Route
                  path="/year/:year"
                  element={
                    <Suspense fallback={<div></div>}>
                      <Year />
                    </Suspense>
                  }
                />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </DataProvider>
          </BrowserRouter>
        </ChakraProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
