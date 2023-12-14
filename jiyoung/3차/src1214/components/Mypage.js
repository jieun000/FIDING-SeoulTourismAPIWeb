import React, { useState, useEffect } from 'react';
import axios from "axios";
import { hangjungdong } from './hangjungdong';
import './signup.css';

const Mypage = ({login}) => {
  
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vGroups, setvGroups] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [workPlace1, setWorkPlace1] = useState('');
  const [workPlace2, setWorkPlace2] = useState('');
  const [workPlace3, setWorkPlace3] = useState('');
  const [workPlaceYN, setWorkPlaceYN] = useState('');

  const [checkid, setCheckid] = useState();
  const [sessionData, setSessionData] = useState();

  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const [val4, setVal4] = useState("");
  const [val5, setVal5] = useState("");
  const [val6, setVal6] = useState("");
  const { gu, ro, da } = hangjungdong;

  useEffect(() => {
    // 세션 정보를 가져오기 위한 API 요청
    axios.get('/LoginMain')
      .then(response => {
        console.log("서버로 온 데이터 ", response.data);
        if(response!=null) login(true)
        setSessionData(response.data);
      })
      .catch(error => {
        console.error('세션 정보 가져오기 실패:', error);
      });
  }, []); // 빈 배열은 컴포넌트가 처음 로드될 때만 실행하도록 함
  
  const formatPhoneNumber = (value) => {
    var phoneNumber = value.replace(/\D/g, '');
    phoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    return phoneNumber;
  };

  

  const handleUpdate = async () => {
    try {
      const response = await axios.put('/mypage', {
        pw,
        username,
        nickname,
        phone,
        email,
        vGroups,
        address1,
        address2,
        address3,
        workPlace1,
        workPlace2,
        workPlace3,
        workPlaceYN
      });
  
      console.log('Update successful:', response.data);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  

  return (
    <>
    <div className="limiter">
        <div className="container-login100" style={{ backgroundColor: '#e8f5e9' }}>
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form className="was-validated login100-form validate-form" action="/mypage" method="post" onSubmit={handleUpdate}>
              <span className="login100-form-title p-b-49">
                <img src="./logo.png" width="170"></img>
              </span>

              <div className="wrap-input100 validate-input m-b-23" >
                <span className="label-input100">아이디</span>
                <input
                  className="input100"
                  type="text"
                  name="id"
                  autoComplete="current-id"
                  value={sessionData?.id || ''}
                  readOnly={true}
                />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

    


            <div className="wrap-input100 validate-input m-b-23" >
              <span className="label-input100">비밀번호</span>
              <input className="input100" type="password" name="pw" 
              autoComplete="current-password" value={sessionData?.pw || ''}/>
              <span className="focus-input100" data-symbol="&#xf190;"></span>
            </div>
               
            <div className="wrap-input100 validate-input m-b-23" >
              <span className="label-input100">이름</span>
              <input className="input100" type="text" name="username" value={sessionData?.username || ''} 
              onChange={(e) => setUsername(e.target.value)} readOnly={true}/>
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
               
            <div className="wrap-input100 validate-input m-b-23">
              <span className="label-input100">닉네임</span>
              <input className="input100" type="text" name="nickname" placeholder={sessionData?.nickname || ''} 
              onChange={(e) => setNickname(e.target.value)}/>
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
               
            <div className="wrap-input100 validate-input m-b-23" >
                <span className="label-input100">휴대폰 번호</span>
                <input className="input100" type="text" name="phone" value={sessionData?.phone || ''} 
                onChange={(e) => setPhone(e.target.value)} onInput={(e) => e.target.value = formatPhoneNumber(e.target.value)}/>
                <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
               
            <div className="wrap-input100 validate-input m-b-23" >
              <span className="label-input100">이메일</span>
              <input className="input100" type="text" name="email" placeholder={sessionData?.email || ''}
              onChange={(e) => setEmail(e.target.value)}/>
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>
               <br/>
               
               <div className="wrap-input100 validate-input m-b-23" >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <span className="label-input100">거주지</span>
                <select className="input100" type="text" name="address1" onChange={(e) => setVal1(e.target.value)}>
                  <option value="">선택</option>
                  {gu.map((el) => (
                  <option key={el.codeNm} value={el.gu}>
                    {el.gu}
                  </option>
                  ))}
                </select>
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div>
                <span className="label-input100"></span>
                <select className="input100" type="text" name="address2" onChange={(e) => setVal2(e.target.value)}>
                <option value="">선택</option>
                {ro
                .filter((el) => el.gu === val1)
                .map((el) => (
                  <option key={el.codeNm} value={el.ro}>
                    {el.ro}
                  </option>
                  ))}
                </select>
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>
              <div>
                <span className="label-input100"></span>
                <select className="input100" type="text" name="address3" onChange={(e) => setVal3(e.target.value)}>
                <option value="">선택</option>
                {da
                .filter((el) => el.gu === val1 && el.ro === val2)
                .map((el) => (
                  <option key={el.codeNm} value={el.da}>
                    {el.da}
                  </option>
                  ))}
                </select>
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>
            </div>
          </div>
              <br/>
          

            <div className="wrap-input100 validate-input m-b-23" >
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              <div>
                <span className="label-input100">출근지</span>
                <select className="input100" type="text" name="workPlace1" onChange={(e) => setVal4(e.target.value)}>
                <option value="">선택</option>
                  {gu.map((el) => (
                  <option key={el.codeNm} value={el.gu}>
                    {el.gu}
                  </option>
                  ))}
                </select>
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div>
                <span className="label-input100" ></span>
                <select className="input100" type="text" name="workPlace2" onChange={(e) => setVal5(e.target.value)}>
                <option value="">선택</option>
                {ro
                .filter((el) => el.gu === val4)
                .map((el) => (
                  <option key={el.codeNm} value={el.ro}>
                    {el.ro}
                  </option>
                  ))}
                </select>
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>
              <div>
                <span className="label-input100"></span>
                <select className="input100" type="text" name="workPlace3" onChange={(e) => setVal6(e.target.value)}>
                <option value="">선택</option>
                {da
                .filter((el) => el.gu === val4 && el.ro === val5)
                .map((el) => (
                  <option key={el.codeNm} value={el.da}>
                    {el.da}
                  </option>
                  ))}
                </select>
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>
            </div>
          </div>
              <br/>

              <div className="wrap-input100 validate-input m-b-23" >
                <span className="label-input100">취약계층에 해당되십니까?</span><br/> 
                <span className="focus-input100" data-symbol="&#xf206;"></span>
                <br/>
                <div style={{ marginLeft: '40px', fontSize: '14px', paddingBottom: '10px'}}>
                <label>
                    <input type="radio" name="vGroups" value="어린이"/> 어린이
                </label>  
                <label>
                    <input type="radio" name="vGroups" value="노인" style={{ marginLeft: '10px'}}/> 노인 
                </label>
                <label>
                    <input type="radio" name="vGroups" value="임산부" style={{ marginLeft: '10px'}}/> 임산부 
                </label>
                <label>
                    <input type="radio" name="vGroups" value="기저질환자" style={{ marginLeft: '10px'}}/> 기저질환자 
                </label>
                <label>
                    <input type="radio" name="vGroups" value="해당없음" style={{ marginLeft: '10px'}} /> 해당없음 
                </label> 
            </div>
            </div>
              <br/>


              <div className="wrap-input100 validate-input m-b-23" >
          <span className="label-input100">근무지가 취약환경이십니까? 
            <br/> (공장, 지하, 사막, 화재현장, 탄광구, 서울역)
          </span><br/> 
          <span className="focus-input100" style={{ marginTop: '10px' }} data-symbol="&#xf206;"></span>
          <br/>
          <div style={{ marginLeft: '40px', paddingBottom: '10px' }}>
            <label>
              <input type="radio" name="workPlaceYN" value="1" /> 예
            </label>  
            <label>
              <input type="radio" name="workPlaceYN" value="0" style={{ marginLeft: '10px'}}/> 아니오
            </label>
          </div>
        </div>
               
          <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button type="submit" className="login100-form-btn">
                    회원정보 수정하기
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

export default Mypage;