import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundMoviesPage.style.css";

const NotFoundMoviesPage = () => {
  return (
    <div className="not-found-banner">
      <h1>찾으시는 검색 결과가 존재하지 않습니다.</h1>
    </div>
  );
};

export default NotFoundMoviesPage;
