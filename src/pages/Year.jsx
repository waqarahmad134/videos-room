import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Card4 from "../components/cards/Card4";
import LoadingBar from 'react-top-loading-bar';

export default function Year() {
  const navigate = useNavigate();
  const location = useLocation();
  const { year } = useParams();
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingBarRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  const fetchMoviesByYear = async () => {
    setLoading(true);
    loadingBarRef.current.continuousStart();
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            primary_release_year: year,
            language: "en-US",
            sort_by: "popularity.desc",
            include_adult: true,
            include_video: false,
            page: 1,
          },
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWQyYTUwNDE2Y2M5ZWQyMzRkMmFjOTdhODhhNjU5NyIsIm5iZiI6MTcxOTczNzE1MC41NjAyMzUsInN1YiI6IjY2ODExYTQxYWQ5YTE0MjlkYTE4YTg4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MrzJJrxqs6FQdsv7rC0Qc4CYl4EL70F3ckZj9ajkh-c",
            accept: "application/json",
          },
        }
      );
      setMovies(response?.data?.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
      loadingBarRef.current.complete();
    }
  };

  useEffect(() => {
    fetchMoviesByYear();
  }, [year]);

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
          params: {
            language: "en-US",
          },
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWQyYTUwNDE2Y2M5ZWQyMzRkMmFjOTdhODhhNjU5NyIsIm5iZiI6MTcxOTczNzE1MC41NjAyMzUsInN1YiI6IjY2ODExYTQxYWQ5YTE0MjlkYTE4YTg4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MrzJJrxqs6FQdsv7rC0Qc4CYl4EL70F3ckZj9ajkh-c",
            accept: "application/json",
          },
        }
      );
      setGenres(response?.data?.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  

  return (
    <div className="sm:w-11/12 md:w-[82%] mx-auto">
      <LoadingBar color="#f11946" ref={loadingBarRef} />
      <Header />
      <div className="grid md:grid-cols-4 gap-4 md:gap-0">
        <main className="md:col-span-3 p-4 bg-[#373737]">
          <h2 className="text-2xl font-bold text-white mb-4">
            Movies Released in {year}
          </h2>
          <ul></ul>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {movies.map((movie, index) => (
              <Card4
                key={index}
                id={movie.id}
                title={movie.title}
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
  );
}
