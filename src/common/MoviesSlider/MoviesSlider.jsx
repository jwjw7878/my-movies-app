import React from "react";
import Carousel from "react-multi-carousel";
import "./MoviesSlider.style.css";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../constants/responsive";
import MovieCard from "../MovieCard/MovieCard";

const MoviesSlider = ({ data, title }) => {
  return (
    <div>
      <h3 className="popular-title">{title}</h3>
      <Carousel
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3500}
        centerMode={false}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {data.results.map((movie, idx) => (
          <MovieCard movie={movie} num={idx} />
        ))}
      </Carousel>
    </div>
  );
};

export default MoviesSlider;
