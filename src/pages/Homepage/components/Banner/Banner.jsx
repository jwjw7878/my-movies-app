import React from "react";
import "./Banner.style.css";
import { CircularProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { usePopularMovies } from "../../../../hooks/usePopularMovies";
import { useGenreforIds } from "../../../../hooks/useGenreIds";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMovies();
  const { data: genres, isLoading: isGenreLoading } = useGenreforIds();

  const genreName =
    genres && Array.isArray(genres)
      ? Object.fromEntries(genres.map((g) => [g.id, g.name]))
      : {};

  if (isLoading || isGenreLoading)
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
        <h1>
          {data?.results[0].original_title}{" "}
          {data?.results[0].adult ? (
            <div className="adult true">
              <FaArrowUp /> 18
            </div>
          ) : (
            <div className="adult false">
              <FaArrowDown /> 18
            </div>
          )}
        </h1>
        <p>{data?.results[0].overview}</p>
        <ul className="banner-genre">
          {data?.results[0].genre_ids.map((g) => (
            <li>{genreName[g]}</li>
          ))}
        </ul>
      </div>

      <div className="top-banner">
        <h3>Top</h3>
        <p>20</p>
      </div>
    </div>
  );
};

export default Banner;
