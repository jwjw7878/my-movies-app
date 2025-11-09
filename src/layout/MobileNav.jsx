import React from "react";
import "./MobileNav.style.css";
import { GrSearch } from "react-icons/gr";

const MobileNav = () => {
  return (
    <div className="mobile-nav">
      <div className="mobile-input-area">
        <input
          className="mobile-input"
          type="text"
          placeholder="찾으시는 컨텐츠를 입력하세요"
        />
        <GrSearch className="search-icon" />
      </div>
    </div>
  );
};

export default MobileNav;
