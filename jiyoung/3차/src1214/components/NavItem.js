import React from 'react';
import { Link } from 'react-router-dom';

// NavItemLogin 컴포넌트
const NavItemLogin = ({ isLoggedIn }) => {
    return (
      <>
          <>
            <Link to="/login">
              <span style={{ margin: "10px" }}>로그인</span>
            </Link>
            <Link to="/signup">
              <span style={{ margin: "10px" }}>회원가입</span>
            </Link>
          </>
        
      </>
    );
  };
  
  // NavItemLogout 컴포넌트
  const NavItemLogout = ({ isLoggedIn }) => {
    return (
      <>
       
          <>
            <Link to="/logout">
              <span style={{ margin: "10px" }}>로그아웃</span>
            </Link>
            <Link to="/mypage">
              <span style={{ margin: "10px" }}>마이페이지</span>
            </Link>
          </>
        
      </>
    );
  };

export { NavItemLogin, NavItemLogout };
