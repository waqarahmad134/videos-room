import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utilities/URL";

// Create the context
const DataContext = createContext();

// Custom hook to use the data context
export const useDataContext = () => {
  return useContext(DataContext);
};

// Create a provider component
export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  const [actors, setActors] = useState(null);
  const [actresses, setActresses] = useState(null);
  const [southActors, setSouthActors] = useState(null);
  const [mostViewedThisWeek, setMostViewedThisWeek] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, actorsRes, actressesRes, southActorsRes, mostViewedRes] = await Promise.all([
          axios.get(`${BASE_URL}categories`),
          axios.get(`${BASE_URL}actors`),
          axios.get(`${BASE_URL}actress`),
          axios.get(`${BASE_URL}southactor`),
          axios.get(`${BASE_URL}mostViewedThisWeek`),
        ]);

       
        setCategories(categoriesRes.data);
        setActors(actorsRes.data);
        setActresses(actressesRes.data);
        setSouthActors(southActorsRes.data);
        setMostViewedThisWeek(mostViewedRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false); // Ensure loading is set to false on error
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
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
