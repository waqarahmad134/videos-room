import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utilities/URL";

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const [actors, setActors] = useState(null);
  const [actresses, setActresses] = useState(null);
  const [southActors, setSouthActors] = useState(null);
  const [mostViewedThisWeek, setMostViewedThisWeek] = useState(null);
  const [mostViewedLast24Hours, setMostViewedLast24Hours] = useState(null);
  const [allTimeHighViews, setAllTimeHighViews] = useState(null);
  const [latestMovies, setLatestMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, actorsRes, actressesRes, southActorsRes, mostViewedRes , mostViewedLast24Hours , allTimeHighViews , latestMovies] = await Promise.all([
          axios.get(`${BASE_URL}categories`),
          axios.get(`${BASE_URL}actors`),
          axios.get(`${BASE_URL}actress`),
          axios.get(`${BASE_URL}southactor`),
          axios.get(`${BASE_URL}mostViewedThisWeek`),
          axios.get(`${BASE_URL}mostViewedLast24Hours`),
          axios.get(`${BASE_URL}allTimeHighViews`),
          axios.get(`${BASE_URL}latestMovies`),
        ]);

        setCategories(categoriesRes.data);
        setActors(actorsRes.data);
        setActresses(actressesRes.data);
        setSouthActors(southActorsRes.data);
        setMostViewedThisWeek(mostViewedRes.data);
        setMostViewedLast24Hours(mostViewedLast24Hours.data);
        setAllTimeHighViews(allTimeHighViews.data);
        setLatestMovies(latestMovies.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        categories,
        actors,
        actresses,
        southActors,
        mostViewedThisWeek,
        mostViewedLast24Hours,
        allTimeHighViews,
        latestMovies,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
