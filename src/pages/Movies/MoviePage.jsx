import React, { useEffect, useState } from "react";
import "./MoviePage.style.css";
import { useSearchParams } from "react-router-dom";
import { useSearchMovies } from "../../hooks/useSearchMovies";
import { Alert, CircularProgress } from "@mui/material";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import NotFoundMoviesPage from "../NotFoundpage/NotFoundMoviesPage";
import { useGenreforIds } from "../../hooks/useGenreIds";

const MoviePage = () => {
  const [page, setPage] = useState(1);
  const [query] = useSearchParams();
  const keyword = query.get("q");
  const [renderData, setRenderData] = useState([]);
  const [inputPage, setInputPage] = useState(1);
  const [selectMovie, setSelectMovie] = useState("basic");
  const [selectGenre, setSelectGenre] = useState("");

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };
  const { data: genre } = useGenreforIds();

  const { data, isLoading, error, isError } = useSearchMovies({
    keyword,
    page,
    selectMovie,
    selectGenre,
  });

  useEffect(() => {
    if (data?.results) {
      setRenderData(data.results);
    }
  }, [data]);

  const filterData = () => {
    if (!data?.results) return;

    let filtered = [...data.results];
    if (selectGenre) {
      const genreId = Number(selectGenre);
      filtered = filtered.filter((movie) => movie.genre_ids.includes(genreId));
    }
    if (selectMovie === "popularity-high") {
      filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (selectMovie === "popularity-low") {
      filtered.sort((a, b) => a.popularity - b.popularity);
    } else if (selectMovie === "top_rated") {
      filtered.sort((a, b) => b.vote_average - a.vote_average);
    }

    setRenderData(filtered);
  };
  useEffect(() => {
    filterData();
  }, [selectGenre, selectMovie, data]);

  // 키워드 변경 시 페이지네이션 초기화
  useEffect(() => {
    setPage(1);
    setSelectGenre("");
    setSelectMovie("basic");
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
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <>
      {renderData?.length > 0 ? (
        <div className="movies-page">
          <h1>Moives</h1>
          <div className="select-bar">
            <select onChange={(e) => setSelectMovie(e.target.value)}>
              <option value="basic">정렬</option>
              <option value="popularity-high">인기 높은순</option>
              <option value="popularity-low">인기 낮은순</option>
              <option value="top_rated">평점순</option>
            </select>
            <select
              onChange={(e) => {
                setSelectGenre(e.target.value);
              }}
            >
              <option value="">장르별 목록</option>
              {genre.map((g, i) => (
                <option key={i} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
          <h2>
            <span>
              {selectGenre !== "" ? renderData.length : data?.total_results}
            </span>
            개의 영화가 존재합니다.
          </h2>
          <div className="container">
            {renderData?.map((movie, idx) => (
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
