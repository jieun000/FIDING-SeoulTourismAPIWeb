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
  const handleLoginLogout = async () => {
    try {
      if (isLoggedIn === true) {
        // 서버에 로그아웃 요청 보내기
        console.log("로그아웃 가능")
        const response = await fetch('/logout', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          
        });
        onLogout();
      
        if (response.ok) {
          console.log('로그아웃 성공');
        } else {
          console.error('로그아웃 실패');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('로그인 또는 로그아웃 실패:', error);
    }
  };

      // 서버의 /logout 엔드포인트에 GET 요청을 보냅니다.
      

      
  //  const nameLogin=(isLoggedIn)=>{
  //   if(isLoggedIn){
  //     return "로그아웃"

  //   } else{
  //     return "로그인"
  //   }
  //  }
  const menu = [
    { address: isLoggedIn ? "/LoginMain" : "/", src:"logo.png" },
    { name: "로그아웃", address: "/logout", onClick: handleLoginLogout},
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