import React from "react";
import Carousel from "react-multi-carousel";
import "../../../common/MoviesSlider/MoviesSlider.style.css";
import { responsive } from "../../../constants/responsive";
import "./MovieRecommend.style.css";
import { useMoviesRecommend } from "../../../hooks/useMovieRecommend";
import MovieCard from "../../../common/MovieCard/MovieCard";

const MovieRecommend = ({ id }) => {
  const { data } = useMoviesRecommend(id);
  console.log(data);
  return (
    <div className="recommend-container">
      <h2 className="recommend-title">Recommend Movies</h2>
      {data.length > 0 ? (
        <Carousel
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3500}
          centerMode={false}
          itemClass="movie-slider p-1"
          containerClass="carousel-container"
          responsive={responsive}
        >
          {data?.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </Carousel>
      ) : (
        <p>추천 영화가 존재하지 않습니다.</p>
      )}
    </div>
  );
};

export default MovieRecommend;
