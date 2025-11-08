import React from "react";
import "./MovieCard.style.css";
import { useGenreforIds } from "../../../../hooks/useGenreIds";
const MovieCard = ({ movie }) => {
  const { data, isLoading } = useGenreforIds();

  if (isLoading) return <p>...Loading</p>;

  const genreName = Object.fromEntries(data?.map((g) => [g.id, g.name]));

  return (
    <div
      className="movie-card"
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
    >
      <div className="overlay">
        <h1 className="overlay-title">{movie.title}</h1>
        <ul className="overlay-genre">
          {movie.genre_ids.map((id) => (
            <li>{genreName[id]}</li>
          ))}
        </ul>
        <div>{movie.vote_average}</div>
        <div>{movie.popularity}</div>
        <div>{movie.adult ? "18" : ""}</div>
        <div className="top-banner">
          <h3>Top</h3>
          <p>20</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
