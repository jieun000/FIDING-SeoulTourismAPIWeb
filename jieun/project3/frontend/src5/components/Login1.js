import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post('/login', {
        id:username,
        pw:password,
      });

      console.log(response.data); 
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100" style={{ backgroundColor: '#e8f5e9' }}>
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form className="login100-form validate-form" action="/login" method="post" onSubmit={handleSubmit}>
            <span className="login100-form-title p-b-49">
              <img src="./logo.png" width="170"></img>
            </span>

            <div className="wrap-input100 validate-input m-b-23" data-validate="Username is required">
              <span className="label-input100">아이디</span>
              <input
                className="input100"
                type="text"
                name="id"
                placeholder="아이디를 입력하세요"
                autoComplete="current-password"
                value={username}
                onChange={handleUsernameChange}
              />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <span className="label-input100">패스워드</span>
              <input
                className="input100"
                type="password"
                name="pw"
                placeholder="패스워드를 입력하세요"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
              />
              <span className="focus-input100" data-symbol="&#xf190;"></span>
            </div>

            <br />
            <br />

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button type="submit" className="login100-form-btn">
                  로그인
                </button>
              </div>
            </div>

            <div className="flex-col-c p-t-50">
              <a href="" className="txt2" style={{textDecoration: "none"}}>
                😀 얼굴인식 로그인
              </a>
            </div>

            
            <div className="flex-col-c p-t-50">
              <a href="signup" className="txt2" style={{textDecoration: "none", fontWeight: "bold"}}>
                회원가입
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
}

export default Login;