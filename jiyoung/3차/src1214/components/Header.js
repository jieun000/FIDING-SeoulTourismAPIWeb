import React ,{useState,useEffect} from 'react';
import './util.css';
import './login.css';
import Navigation from './Navigation';
//import { NavItemLogin, NavItemLogout } from './NavItem';

/// Header 컴포넌트
const Header = ({ isLoggedIn }) => {
  return (
    <div>
      <header>
        <Navigation isLoggedIn={isLoggedIn} />
      </header>
    </div>
  );
};


export default Header;
