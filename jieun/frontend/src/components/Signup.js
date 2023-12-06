import React from 'react';

const Signup = () => {
  const formatPhoneNumber = (input) => {
    // Your formatPhoneNumber logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };
  
  return (
    <>
    <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form className="was-validated login100-form validate-form" action="/trip/signup" method="post" onSubmit={handleSubmit}>
              <span className="login100-form-title p-b-49">
                Seoul Trip
              </span>

              <div className="wrap-input100 validate-input m-b-23" data-validate="id is required">
                <span className="label-input100">아이디</span>
                <input className="input100" type="text" name="id" placeholder="아이디를 입력하세요" />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

            <div class="wrap-input100 validate-input m-b-23" data-validate="Password is required">
              <span class="label-input100">패스워드</span>
              <input class="input100" type="password" name="pw" placeholder="비밀번호는 입력해주세요"/>
              <span class="focus-input100" data-symbol="&#xf190;"></span>
            </div>
					
            <div class="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
              <span class="label-input100">이름</span>
              <input class="input100" type="text" name="username" placeholder="이름을 입력하세요"/>
              <span class="focus-input100" data-symbol="&#xf206;"></span>
            </div>
					
            <div class="wrap-input100 validate-input m-b-23" data-validate = "nickname is reauired">
              <span class="label-input100">닉네임</span>
              <input class="input100" type="text" name="nickname" placeholder="닉네임을 입력하세요"/>
              <span class="focus-input100" data-symbol="&#xf206;"></span>
            </div>
					
            <div class="wrap-input100 validate-input m-b-23" data-validate="phonenumber is reauired">
                <span class="label-input100">휴대폰 번호</span>
                <input class="input100" type="text" name="phone" placeholder="010-0000-0000" oninput="formatPhoneNumber(this)"/>
                <span class="focus-input100" data-symbol="&#xf206;"></span>
            </div>
					
            <div class="wrap-input100 validate-input m-b-23" data-validate = "email is reauired">
              <span class="label-input100">이메일</span>
              <input class="input100" type="text" name="email" placeholder="이메일을 입력하세요"/>
              <span class="focus-input100" data-symbol="&#xf206;"></span>
            </div>
					
					
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

export default Signup;