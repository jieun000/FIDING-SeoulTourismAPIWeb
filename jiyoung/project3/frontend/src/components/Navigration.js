import React from 'react';
import "./navigation.css";
import { useState } from "react";
import NavItem from "./NavItem";
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const [menuToggle, setMenuToggle] = useState(false);
  const menu = [
    { address: "/", src:"logo.png" },
    { name: "로그인", address: "/login" },
    { name: "회원가입", address: "/signup" },
  ];

    const navigate = useNavigate();
    
    const redirectToMain = () => {
      // React Router의 navigate 함수를 사용하여 이동
      navigate('/');
    }

  return (
    <nav className="navigation__wrapper">
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
          {menu.map((data) => (
            <NavItem
              data={data}
              key={data.address}
              src={data.src}
              offNav={() => setMenuToggle(false)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;