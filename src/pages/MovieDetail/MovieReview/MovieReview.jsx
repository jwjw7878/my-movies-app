import React, { useState } from "react";
import "./MovieReview.style.css";
import { useMovieReviews } from "../../../hooks/useMovieReviews";

const MovieReview = ({ id }) => {
  const { data } = useMovieReviews(id);
  const [openContents, setOpenContents] = useState({});
  const toggleContent = (idx) => {
    setOpenContents((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };
  return (
    <div className="reviews-container">
      {data?.length > 0 ? (
        <>
          <h2>Reviews: {data?.length}</h2>
          <ul className="reviews-list-container">
            {data?.map((list, i) => {
              const open = openContents[i] || false;
              const long = list.content.length > 330;
              return (
                <li>
                  <h4>{list.author}</h4>
                  <p>{list.created_at.slice(0, 10)}</p>

                  {long ? (
                    <p>
                      {open ? list.content : list.content.slice(0, 330)}
                      <span
                        style={{
                          marginLeft: "20px",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleContent(i)}
                      >
                        {open ? "접기" : "더보기..."}
                      </span>
                    </p>
                  ) : (
                    <p>{list.content}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <h2>Reviews: {data?.length}</h2>
      )}
    </div>
  );
};

export default MovieReview;
