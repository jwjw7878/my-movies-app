import React from "react";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import { usePopularMovies } from "../../../../hooks/usePopularMovies";
import MoviesSlider from "../../../../common/MoviesSlider/MoviesSlider";

const PopularMovie = () => {
  const { data, isError, error, isLoading } = usePopularMovies();

  if (isError) return <Alert severity="error">{error.message}</Alert>;
  if (isLoading)
    return (
      <CircularProgress
        size={100}
        style={{
          color: "red",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  return (
    <div>
      <MoviesSlider data={data} title="Popular Movies" />
    </div>
  );
};

export default PopularMovie;
