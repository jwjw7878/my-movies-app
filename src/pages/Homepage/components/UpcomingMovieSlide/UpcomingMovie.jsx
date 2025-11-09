import React from "react";
import "./UpcomingMovie.style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import MovieCard from "../MovieCard/MovieCard";
import { useUpcomingMovies } from "../../../../hooks/useUpcomingMovie";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const UpcomingMovie = () => {
  const { data, isError, error, isLoading } = useUpcomingMovies();
  console.log(data);
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
      <h3 className="popular-title">Upcoming Movies</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {data.results.map((movie, idx) => (
          <MovieCard movie={movie} key={idx} />
        ))}
      </Carousel>
    </div>
  );
};

export default UpcomingMovie;
