import React from "react";
import "react-multi-carousel/lib/styles.css";
import Alert from "@mui/material/Alert";
import MoviesSlider from "../../../../common/MoviesSlider/MoviesSlider";
import { CircularProgress } from "@mui/material";
import { useUpcomingMovies } from "../../../../hooks/useUpcomingMovie";

const UpcomingMovie = () => {
  const { data, isError, error, isLoading } = useUpcomingMovies();

  if (isError) return <Alert severity="error">{error.message}</Alert>;
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
  return (
    <div>
      <MoviesSlider data={data} title="Upcoming Movies" />
    </div>
  );
};

export default UpcomingMovie;
