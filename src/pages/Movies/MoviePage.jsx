import React, { useEffect, useState } from "react";
import "./MoviePage.style.css";
import { useSearchParams } from "react-router-dom";
import { useSearchMovies } from "../../hooks/useSearchMovies";
import { Alert, CircularProgress } from "@mui/material";
import NotFoundpage from "../NotFoundpage/NotFoundpage";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import NotFoundMoviesPage from "../NotFoundpage/NotFoundMoviesPage";

const MoviePage = () => {
  const [page, setPage] = useState(1);
  const [query] = useSearchParams();
  const keyword = query.get("q");

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };
  console.log(page);
  const { data, isLoading, error, isError } = useSearchMovies({
    keyword,
    page,
  });
  // 키워드 변경 시 페이지네이션 초기화
  useEffect(() => {
    setPage(1);
  }, [keyword]);
  console.log(data);

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
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <>
      {data.results.length > 0 ? (
        <div className="movies-page">
          <h1>Moives</h1>
          <h2>
            <span>{data.total_results}</span>개의 영화가 존재합니다.
          </h2>
          <div className="container">
            {data.results.map((movie, idx) => (
              <MovieCard movie={movie} key={idx} />
            ))}
          </div>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data.total_pages}
            forcePage={page - 1}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      ) : (
        <NotFoundMoviesPage />
      )}
    </>
  );
};

export default MoviePage;
