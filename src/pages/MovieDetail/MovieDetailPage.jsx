import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetail } from "../../hooks/useMovieDetail";
import "./MovieDetailPage.style.css";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import { ratingGraph } from "../../constants/ratingGraph";
import { MdStarRate } from "react-icons/md";
import { FaPlus, FaMinus, FaClock } from "react-icons/fa6";
import { HiOutlineFilm } from "react-icons/hi";
import { FaCalendarAlt } from "react-icons/fa";
import MovieReview from "./MovieReview/MovieReview";
import MovieRecommend from "./MovieRecommend/MovieRecommend";
import MoviePreview from "./MoviePreview/MoviePreview";
const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useMovieDetail(id);
  const [toggle, setToggle] = useState("review");
  const [popup, setPopup] = useState(false);

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
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <>
      {popup && <MoviePreview id={id} setPopup={setPopup} />}
      <div className="detail-container">
        <div className="detail-poster">
          <div
            className="detail-img"
            style={{
              backgroundImage: `${
                data?.poster_path
                  ? "url(" +
                    `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}` +
                    ")"
                  : `url("https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682465_CBq4AWAFmFT1otwioF5X327rCjkVICyH.jpg")`
              }`,
            }}
          ></div>
          <p className="detail-preview" onClick={() => setPopup(true)}>
            <HiOutlineFilm /> 예고편 보기
          </p>
        </div>
        <div className="detail-info">
          <h2 className="detail-title">
            {data.title}{" "}
            <span
              className={
                data.adult ? "detail-adult true" : "detail-adult false"
              }
            >
              {data.adult ? "18" : "all"}
            </span>
          </h2>
          <p className="detail-overview">{data.overview}</p>
          <ul className="detail-genres">
            {data.genres.map((g) => (
              <li className="detail-genre">{g.name}</li>
            ))}
          </ul>
          <div className="detail-rating">
            <div className="graph">
              <div
                className={`${ratingGraph(
                  Number(data.vote_average).toFixed(1)
                )}`}
                style={{
                  width: `${Number(data.vote_average).toFixed(1) * 10}%`,
                  height: "100%",
                }}
              ></div>
            </div>
            <p className="rated-score">
              <MdStarRate />
              {Number(data.vote_average).toFixed(1)}
            </p>
          </div>
          <div className="detail budget">
            <p className="detail-red">
              <FaMinus /> Budget
            </p>
            <p>${data.budget.toLocaleString()}</p>
          </div>
          <div className="detail revenue">
            <p className="detail-red">
              <FaPlus /> Revenue
            </p>
            <p>${data.revenue.toLocaleString()}</p>
          </div>
          <div className="detail date">
            <p className="detail-red">
              <FaCalendarAlt /> Release Date
            </p>
            <p>{data.release_date}</p>
          </div>
          <div className="detail runtime">
            <p className="detail-red">
              <FaClock /> Run Time
            </p>
            <p>{data.runtime} min</p>
          </div>
        </div>
      </div>
      <div className="menu-toggle">
        <p
          className={toggle === "review" ? "menu-review active" : "menu-review"}
          onClick={() => setToggle("review")}
        >
          Reviews
        </p>
        <p
          className={
            toggle !== "review" ? "menu-recommend active" : "menu-recommend"
          }
          onClick={() => setToggle("recommend")}
        >
          Recommend Movies
        </p>
      </div>
      {toggle === "review" ? (
        <MovieReview id={id} />
      ) : (
        <MovieRecommend id={id} />
      )}
    </>
  );
};

export default MovieDetailPage;
