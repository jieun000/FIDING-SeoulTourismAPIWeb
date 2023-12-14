import React from 'react';
import "./navigation.css";
import { Link } from "react-router-dom";

const NavItemLogout = ({ isLoggedIn, offNav }) => {

  return (
    <>
      <Link to={'/logout'} className="menu__item" onClick={() => offNav()}>
        <span style={{ margin: "10px" }}>로그아웃</span>
      </Link>
      {isLoggedIn && (
        <Link to={`/mypage`} className="menu__item">
          <span style={{ margin: "10px" }}>마이페이지</span>
        </Link>
      )}
    </>
  );
};


export default NavItemLogout;