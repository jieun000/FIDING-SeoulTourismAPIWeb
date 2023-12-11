import React from 'react';
import './util.css';
import './login.css';
import Navigation from './Navigation';


function Header({isLoggedIn}) {
  return (
    <div>
        <header>
          <nav>
            <Navigation isLoggedIn={isLoggedIn} />
          </nav>
        </header>
    </div>
  );
}

export default Header;