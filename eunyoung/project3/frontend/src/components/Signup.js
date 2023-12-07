/*eslint-disable*/ 
import React, { useState } from 'react';
import axios from "axios";

const Signup1 = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const formatPhoneNumber = (value) => {
    var phoneNumber = value.replace(/\D/g, '');
    phoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    return phoneNumber;
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post('/trip/signup', {
        username,
        password,
      });

      console.log(response.data); 
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
    <div className="limiter">
        <div className="container-login100" style={{ backgroundColor: '#e8f5e9' }}>
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form className="was-validated login100-form validate-form" action="/trip/signup" method="post" onSubmit={handleSubmit}>
              <span className="login100-form-title p-b-49">
                <img src="./logo.png" width="170"></img>
              </span>

              <div className="wrap-input100 validate-input m-b-23" data-validate="id is required">
                <span className="label-input100">아이디</span>
                <input className="input100" type="text" name="id" placeholder="아이디를 입력하세요" autoComplete="current-password" />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

            <div className="wrap-input100 validate-input m-b-23" data-validate="Password is required">
              <span className="label-input100">패스워드</span>
              <input className="input100" type="password" name="pw" placeholder="비밀번호는 입력해주세요" autoComplete="current-password"/>
              <span className="focus-input100" data-symbol="&#xf190;"></span>
            </div>
               
            <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
              <span className="label-input100">이름</span>
              <input className="input100" type="text" name="username" placeholder="이름을 입력하세요"/>
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
               
            <div className="wrap-input100 validate-input m-b-23" data-validate = "nickname is reauired">
              <span className="label-input100">닉네임</span>
              <input className="input100" type="text" name="nickname" placeholder="닉네임을 입력하세요"/>
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
               
            <div className="wrap-input100 validate-input m-b-23" data-validate="phonenumber is reauired">
                <span className="label-input100">휴대폰 번호</span>
                <input className="input100" type="text" name="phone" placeholder="010-0000-0000" onInput={(e) => e.target.value = formatPhoneNumber(e.target.value)}/>
                <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
               
            <div className="wrap-input100 validate-input m-b-23" data-validate = "email is reauired">
              <span className="label-input100">이메일</span>
              <input className="input100" type="text" name="email" placeholder="이메일을 입력하세요"/>
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
               <br/>
               
          <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button type="submit" className="login100-form-btn">
                    가입하기
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup1;