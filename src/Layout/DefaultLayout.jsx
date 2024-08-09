import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import { useDataContext } from "../context/DataContext";

const DefaultLayout = React.memo(({ children }) => {
  console.log('DefaultLayout rendered');
  const location = useLocation();
  const { categories, actors, actresses, southActors, mostViewedThisWeek, mostViewedLast24Hours, allTimeHighViews, latestMovies, loading } = useDataContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  return (
    <div className="sm:w-[95%] xl:w-[82%] mx-auto">
      <Header categories={categories} />
      <div className="sm:grid md:grid-cols-12 gap-4 md:gap-0">
        {children}
        <Sidebar
          categories={categories}
          actors={actors}
          actresses={actresses}
          southActors={southActors}
          mostViewedThisWeek={mostViewedThisWeek}
          mostViewedLast24Hours={mostViewedLast24Hours}
          allTimeHighViews={allTimeHighViews}
          latestMovies={latestMovies}
          loading={loading}
        />
      </div>
      <Footer />
    </div>
  );
});

export default DefaultLayout;
