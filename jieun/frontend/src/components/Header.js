import React from 'react';
import './util.css';
import './login.css';

function Header() {
  return (
    <div>
        <header>
            <h1 style={{textAlign: 'center'}}>로고?</h1>
        </header>
        <nav>
            <span style={{fontSize: '30px'}}>네비게이션 영역</span>
            <span style={{float: 'right'}}>
                <a href="login" style={{fontSize: '30px', textDecoration: 'none', margin: '0px 50px'}}>로그인</a>
                <a href="signup" style={{fontSize: '30px', textDecoration: 'none', margin: '0px 50px'}}>회원가입</a>
            </span>
        </nav>
    </div>
  );
}

export default Header;