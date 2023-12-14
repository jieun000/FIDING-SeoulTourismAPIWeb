import React from 'react';
import "./navigation.css";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { NavItemLogin, NavItemLogout } from './NavItem';


function Navigation({isLoggedIn}) {
  console.log('Navigation:',isLoggedIn)
  const [menuToggle, setMenuToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const menu = [
    { address: isLoggedIn ? "/LoginMain" : "/", src:"logo.png" },
    { name: isLoggedIn ? "로그아웃" : "로그인", address: isLoggedIn ? "/logout" : "/login" },
    { name: isLoggedIn ? "마이페이지" : "회원가입", address: isLoggedIn ? "/mypage" : "/signup" },
    <br/>
  ];
 

  const navigate = useNavigate();

  const redirectToMain = () => {
    // React Router의 navigate 함수를 사용하여 이동
    navigate('/');
  }
  

  useEffect(() => {
    const handleScroll = () => {
      const menuVisible = document.querySelector('.menu__box__visible');
      if (menuVisible) {
        if (window.scrollY > 76) {
          setScrolled(true);
          menuVisible.style.top = '0';
        } else {
          setScrolled(false);
          menuVisible.style.top = '76px';
        }
      }
    };
    //setIsLoggedIn(!isLoggedIn)
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 
  
    return ( 
      <nav className={`navigation__wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div
        className={!menuToggle ? "burger__menu" : "x__menu"}
        onClick={() =>
          menuToggle ? setMenuToggle(false) : setMenuToggle(true)
        }
      >
        <div className="burger_line1"></div>
        <div className="burger_line2"></div>
        <div className="burger_line3"></div>
      </div>

      <div
        className={[
          "menu__box",
          !menuToggle ? "menu__box__hidden" : "menu__box__visible",
        ].join(" ")}
      >
        <div className="menu__list">
        <nav>
          {isLoggedIn ?   <NavItemLogout isLoggedIn={false} />
             : (
              <NavItemLogin isLoggedIn={true}  />
            )
           }
        </nav>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;