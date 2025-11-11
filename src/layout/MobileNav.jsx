import React from "react";
import "./MobileNav.style.css";
import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const MobileNav = ({ setKeyword, keyword }) => {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };
  return (
    <form className="mobile-nav" onSubmit={submitHandler}>
      <div className="mobile-input-area">
        <input
          className="mobile-input"
          type="text"
          value={keyword}
          placeholder="찾으시는 컨텐츠를 입력하세요"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <GrSearch
          className="search-icon"
          type="submit"
          onClick={submitHandler}
        />
      </div>
    </form>
  );
};

export default MobileNav;
