import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import "./AppLayout.style.css";
import MobileNav from "./MobileNav";

const AppLayout = () => {
  const [showInput, setShowInput] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const buttonHandler = () => {
    setShowInput(!showInput);
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
        <div className="search-area">
          <input
            className={showInput ? "input active" : "input"}
            type="text"
            placeholder="찾으시는 컨텐츠를 입력하세요"
          />
          <GrSearch className="search-icon" onClick={buttonHandler} />
          <div
            className="profile-icon"
            onClick={() => {
              setShowMobileNav(!showMobileNav);
            }}
          ></div>
        </div>
      </header>
      {showMobileNav && (
        <MobileNav showInput={showInput} buttonHandler={buttonHandler} />
      )}
      <Outlet />
    </>
  );
};

export default AppLayout;
