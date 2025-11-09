import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovie from "./components/PopularMovieSlide/PopularMovie";
import TopRatedMovie from "./components/TopRatedMovieSlide/TopRatedMovie";
import UpcomingMovie from "./components/UpcomingMovieSlide/UpcomingMovie";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovie />
      <TopRatedMovie />
      <UpcomingMovie />
    </div>
  );
};

export default Homepage;
