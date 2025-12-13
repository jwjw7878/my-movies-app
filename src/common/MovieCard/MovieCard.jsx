import "./MovieCard.style.css";
import { useGenreforIds } from "../../hooks/useGenreIds";
import { IoIosPeople } from "react-icons/io";
import { FaArrowDown, FaArrowUp, FaCalendarAlt } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ratingGraph } from "../../constants/ratingGraph";

const MovieCard = ({ movie, num }) => {
  const { data, isLoading } = useGenreforIds();
  const navigate = useNavigate();

  const moveToDetail = (id) => {
    navigate(`/movies/${id}`);
  };

  if (isLoading) return <p>...Loading</p>;

  const genreIdforName = (genre_ids) => {
    const genreName = genre_ids.map((g) => {
      return data.find((genre) => genre.id === g);
    });
    return genreName;
  };

  return (
    <div
      key={movie.id}
      onClick={() => moveToDetail(movie.id)}
      className="movie-card"
      style={{
        backgroundImage: `${
          movie.poster_path
            ? "url(" +
              `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
              ")"
            : `url("https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682465_CBq4AWAFmFT1otwioF5X327rCjkVICyH.jpg")`
        }`,
      }}
    >
      <p className="num">{Number(num + 1)}</p>
      <div className="overlay">
        {movie.adult ? (
          <div className="adult true">
            <FaArrowUp /> 18
          </div>
        ) : (
          <div className="adult false">
            <FaArrowDown /> 18
          </div>
        )}
        <p className="overlay-release">
          <FaCalendarAlt /> {movie.release_date}
        </p>
        <h1 className="overlay-title">{movie.title}</h1>
        <ul className="overlay-genre">
          {genreIdforName(movie.genre_ids).map((genre, i) => (
            <li key={i}>{genre.name}</li>
          ))}
        </ul>
        <div className="overlay-rating">
          <div className="graph">
            <div
              className={`${ratingGraph(
                Number(movie.vote_average).toFixed(1)
              )}`}
              style={{
                width: `${Number(movie.vote_average).toFixed(1) * 10}%`,
                height: "100%",
              }}
            ></div>
          </div>
          <p className="rated-score">
            <MdStarRate />
            {Number(movie.vote_average).toFixed(1)}
          </p>
        </div>
        <div>
          <IoIosPeople />
          {movie.popularity}
        </div>
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
