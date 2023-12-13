import React from 'react';
import "./navigation.css";
import axios from 'axios';
import { useState, useEffect } from "react";
import NavItem from "./NavItem";
import { useNavigate } from 'react-router-dom';

function Navigation({isLoggedIn, onLogout }) {
  console.log('Navigation:',isLoggedIn)
  const [menuToggle, setMenuToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const handleLoginLogout = async () => {
  //   try {
  //     if (isLoggedIn === true) {
  //       // 서버에 로그아웃 요청 보내기
  //       await axios.post('/logout'); 
        
  //       // 클라이언트 측에서 세션 데이터 지우기
  //       onLogout();
  //     } else {
  //       navigate('/login');
  //     }
  //   } catch (error) {
  //     console.error('로그인 또는 로그아웃 실패:', error);
  //   }
  // };
  //  const nameLogin=(isLoggedIn)=>{
  //   if(isLoggedIn){
  //     return "로그아웃"

  //   } else{
  //     return "로그인"
  //   }
  //  }
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
          {menu.map(({name, address, src} ,idx) => (
            <NavItem
              name={name}
              address={address}
              key={idx}
              src={src}
              offNav={() => setMenuToggle(false)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;