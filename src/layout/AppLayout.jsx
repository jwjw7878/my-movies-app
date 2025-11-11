import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import "./AppLayout.style.css";
import MobileNav from "./MobileNav";

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const navigate = useNavigate();
  const buttonHandler = () => {
    setShowInput(!showInput);
    if (showInput) {
      navigate(`/movies?q=${keyword}`);
      setKeyword("");
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (showInput) {
      navigate(`/movies?q=${keyword}`);
      setKeyword("");
      setShowInput(!showInput);
    }
  };

  return (
    <>
      <header>
        <div className="logo-menu">
          <Link to="/">
            <p className="logo-title">NETFLIX</p>
          </Link>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
          </nav>
        </div>
        <form className="search-area" onSubmit={submitHandler}>
          <input
            className={showInput ? "input active" : "input"}
            type="text"
            placeholder="찾으시는 컨텐츠를 입력하세요"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          <GrSearch
            className="search-icon"
            type="submit"
            onClick={() => buttonHandler()}
          />
          <div
            className="profile-icon"
            onClick={() => {
              setShowMobileNav(!showMobileNav);
            }}
          ></div>
        </form>
      </header>
      {showMobileNav && (
        <MobileNav
          showInput={showInput}
          submitHandler={submitHandler}
          setKeyword={setKeyword}
          keyword={keyword}
        />
      )}
      <Outlet />
    </>
  );
};

export default AppLayout;
