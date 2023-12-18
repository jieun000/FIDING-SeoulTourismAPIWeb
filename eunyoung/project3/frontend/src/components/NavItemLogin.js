import React from 'react';
import "./navigation.css";
import { Link } from "react-router-dom";

const NavItemLogin = ({ address, isLoggedIn, offNav }) => {
  return (
    <>
      <Link to={'/login'} className="menu__item" onClick={offNav}>
        <span style={{ margin: "10px" }}>로그인</span>
      </Link>
      {address === 'login' && !isLoggedIn && (
        <Link to={`/signup`} className="menu__item">
          <span style={{ margin: "10px" }}>회원가입</span>
        </Link>
      )}
    </>
  );
};

export default NavItemLogin;