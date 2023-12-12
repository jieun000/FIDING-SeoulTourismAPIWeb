import React from 'react';
import './util.css';
import './login.css';
import Navigation from './Navigation';


function Header({isLoggedIn,setIsLoggedIn}) {
  return (
    <div>
        <header>
          <nav>
            <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </nav>
        </header>
    </div>
  );
}

export default Header;