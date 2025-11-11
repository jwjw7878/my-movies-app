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
  const [inputPage, setInputPage] = useState(1);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const { data, isLoading, error, isError } = useSearchMovies({
    keyword,
    page,
  });
  // 키워드 변경 시 페이지네이션 초기화
  useEffect(() => {
    setPage(1);
  }, [keyword]);

  // 페이지 검색
  const submitPage = () => {
    if (inputPage > Math.min(data.total_pages, 500)) {
      return alert("정해진 범위 내 숫자를 입력해주세요");
    } else if (typeof inputPage !== "number") {
      return alert("숫자 이외에 문자를 입력할 수 없습니다.");
    }
    setPage(inputPage);
  };
  useEffect(() => {
    setInputPage(page);
  }, [page]);

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
            {data?.results?.map((movie, idx) => (
              <MovieCard movie={movie} key={idx} />
            ))}
          </div>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={false}
            pageCount={Math.min(data.total_pages, 500)}
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
          <div className="page-input">
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitPage();
                }
              }}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (isNaN(val)) {
                  setInputPage(1);
                } else {
                  setInputPage(val);
                }
              }}
              placeholder={page}
              value={inputPage}
            />
            <p className="total-pages">/{Math.min(data.total_pages, 500)}</p>
            <button onClick={submitPage}>페이지 검색</button>
          </div>
        </div>
      ) : (
        <NotFoundMoviesPage />
      )}
    </>
  );
};

export default MoviePage;
