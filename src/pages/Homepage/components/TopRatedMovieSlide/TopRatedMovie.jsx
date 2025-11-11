import React from "react";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import { useTopRatedMovie } from "../../../../hooks/useTopRatedMovie";
import MoviesSlider from "../../../../common/MoviesSlider/MoviesSlider";

const TopRatedMovie = () => {
  const { data, isError, error, isLoading } = useTopRatedMovie();

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
      <MoviesSlider data={data} title="Top Rated Movies" />
    </div>
  );
};

export default TopRatedMovie;
