import React from 'react';
import { Link } from 'react-router-dom';
import "./navigation.css";

// NavItemLogin 컴포넌트
const NavItemLogin = ({ isLoggedIn }) => {
    return (
       <>
          <div style={{ marginTop: "18px" }}>
            <Link to={'/'} className="menu__item">
              <img src='logo.png' width="80" />
            </Link>
            <Link to="/login">
              <span style={{ margin: "10px"}}>로그인</span>
            </Link>
            <Link to="/signup">
              <span style={{ marginRight: "30px" }}>회원가입</span>
            </Link>
          </div>   
 
      </>
    );
  };
  
   //NavItemLogout 컴포넌트 
    const NavItemLogout = ({ isLoggedIn }) => {
    return (
      <>
       
          <>
          <div style={{ marginTop: "18px" }}>
            <Link to={'/main'} className="menu__item">
              <img src='logo.png' width="80" />
            </Link>
            <Link to="/logout">
              <span style={{ margin: "10px" }}>로그아웃</span>
            </Link>
            <Link to="/mypage">
              <span style={{ marginRight: "30px" }}>마이페이지</span>
            </Link>
          </div>  
        </>
        
      </>
    );
  };

export { NavItemLogin, NavItemLogout };
