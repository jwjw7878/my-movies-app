import React from "react";
import "./Banner.style.css";
import { CircularProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import { usePopularMovies } from "../../../hooks/usePopularMovies";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMovies();
  console.log(data);
  if (isLoading)
    return (
      <CircularProgress
        size={100}
        style={{
          color: "red",
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-30%, -50%)",
        }}
      />
    );
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <div
      className="banner"
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].poster_path}` +
          ")",
      }}
    >
      <div className="text-area">
        <h1>{data?.results[0].original_title}</h1>
        <p>{data?.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
