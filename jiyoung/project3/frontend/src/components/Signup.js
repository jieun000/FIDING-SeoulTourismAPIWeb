import React, { useState } from 'react';
import axios from "axios";
import { hangjungdong } from './hangjungdong';

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const { gu: sigugun } = hangjungdong; 

  const formatPhoneNumber = (value) => {
    var phoneNumber = value.replace(/\D/g, '');
    phoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    return phoneNumber;
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post('/signup', {
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
            <form className="was-validated login100-form validate-form" action="/signup" method="post" onSubmit={handleSubmit}>
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
               
            <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is required">
              <span className="label-input100">이름</span>
              <input className="input100" type="text" name="username" placeholder="이름을 입력하세요"/>
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
               
            <div className="wrap-input100 validate-input m-b-23" data-validate = "nickname is required">
              <span className="label-input100">닉네임</span>
              <input className="input100" type="text" name="nickname" placeholder="닉네임을 입력하세요"/>
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
               
            <div className="wrap-input100 validate-input m-b-23" data-validate="phonenumber is required">
                <span className="label-input100">휴대폰 번호</span>
                <input className="input100" type="text" name="phone" placeholder="010-0000-0000" onInput={(e) => e.target.value = formatPhoneNumber(e.target.value)}/>
                <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
               
            <div className="wrap-input100 validate-input m-b-23" data-validate = "email is required">
              <span className="label-input100">이메일</span>
              <input className="input100" type="text" name="email" placeholder="이메일을 입력하세요"/>
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
               <br/>
               
            <div className="wrap-input100 validate-input m-b-23" data-validate="select is required">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginRight: '50px' }}>
                <span className="label-input100">거주지</span>
                <select className="input100" onChange={(e) => setVal1(e.target.value)}>
                  <option value="">선택</option>
                  {sigugun.map((el) => (
                    <option key={el.gu} value={el.gu}>
                      {el.codeNm}
                    </option>
                  ))}
                </select>
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div>
                <span className="label-input100"></span>
                <select className="input100" onChange={(e) => setVal2(e.target.value)}>
                  <option value="" >선택</option>
                  {sigugun.map((el) => (
                    <option key={el.gu} value={el.gu}>
                      {el.codeNm}
                    </option>
                  ))}
                </select>
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>
            </div>
          </div>
              <br/>
          

            <div className="wrap-input100 validate-input m-b-23" data-validate="select is required">
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              <div style={{ marginRight: '50px'}}>
                <span className="label-input100">출근지</span>
                <select className="input100" onChange={(e) => setVal1(e.target.value)}>
                  <option value="" >선택</option>
                  {sigugun.map((el) => (
                    <option key={el.gu} value={el.gu}>
                      {el.codeNm}
                    </option>
                  ))}
                </select>
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div>
                <span className="label-input100" ></span>
                <select className="input100" onChange={(e) => setVal2(e.target.value)}>
                  <option value="">선택</option>
                  {sigugun.map((el) => (
                    <option key={el.gu} value={el.gu}>
                      {el.codeNm}
                    </option>
                  ))}
                </select>
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>
            </div>
          </div>
              <br/>

              <div className="wrap-input100 validate-input m-b-23" data-validate="check plese">
                <span className="label-input100">취약계층에 해당되십니까?</span><br/> 
                <span className="focus-input100" data-symbol="&#xf206;"></span>
                <br/>
                <div style={{ marginLeft: '40px', fontSize: '14px', paddingBottom: '10px'}}>
                <label>
                    <input type="checkbox" name="vulnerableGroup" value="어린이"/> 어린이
                </label>  
                <label>
                    <input type="checkbox" name="vulnerableGroup" value="노인" style={{ marginLeft: '10px'}}/> 노인 
                </label>
                <label>
                    <input type="checkbox" name="vulnerableGroup" value="임산부" style={{ marginLeft: '10px'}}/> 임산부 
                </label>
                <label>
                    <input type="checkbox" name="vulnerableGroup" value="기저질환자" style={{ marginLeft: '10px'}}/> 기저질환자 
                </label>
                <label>
                    <input type="checkbox" name="vulnerableGroup" value="해당없음" style={{ marginLeft: '10px'}} /> 해당없음 
                </label> 
            </div>
            </div>
              <br/>


              <div className="wrap-input100 validate-input m-b-23" data-validate="yes or no">
          <span className="label-input100">근무지가 취약환경이십니까? 
            <br/> (공장, 지하, 사막, 화재현장, 탄광구, 서울역)
          </span><br/> 
          <span className="focus-input100" style={{ marginTop: '10px' }} data-symbol="&#xf206;"></span>
          <br/>
          <div style={{ marginLeft: '40px', paddingBottom: '10px' }}>
            <label>
              <input type="checkbox" name="vulnerableGroup" value="예" /> 예
            </label>  
            <label>
              <input type="checkbox" name="vulnerableGroup" value="아니오" style={{ marginLeft: '10px'}}/> 아니오
            </label>
          </div>
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