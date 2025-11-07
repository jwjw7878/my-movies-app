import React from "react";
import { usePopularMovies } from "../../../hooks/usePopularMovies";

const Banner = () => {
  const { data } = usePopularMovies();
  console.log(data);
  return <div>Banner</div>;
};

export default Banner;
