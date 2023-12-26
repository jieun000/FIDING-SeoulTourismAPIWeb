import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import './login.css'
import Chart from './Chart';
import SeoulMap from './SeoulMap';
import { hangjungdong } from './hangjungdong';
import ApiFetch from './ApiFetch';
const { gu, ro, da } = hangjungdong;

const LoginMain = ({ login }) => {
  // 데이터를 저장하는 상태
  const [data, setData] = useState(null);
  // 로딩 상태를 추적하는 상태
  const [isLoading, setIsLoading] = useState(true);
  // 오류를 추적하는 상태
  const [error, setError] = useState(null);
  const [sessionData, setSessionData] = useState();
  const [newWeatherData, setNewWeatherData] = useState();
  // apiFetch를 위해 설정
  const apiFetchRef = useRef(null);

  const [pyCharmData, setPyCharmData] = useState(null);
  
  const [loadKey, setLoadKey] = useState({});

  const [districtKey, setDistrictKey] = useState("강동구");
  const [AllAirQualityData, setAllAirQualityData] = useState({});
  const [newAirQualityData, setNewAirQualityData] = useState({});
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  const [dataPost, setDataPost] = useState({});
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");

  var obj = { 
    sessionAddress : '강동구', 
    sessionAddress3 : '천호사거리',  
    sessionLocCode :'1080012200', 
    districtKey,
    setDistrictKey, 
    AllAirQualityData,
    setAllAirQualityData,
    newAirQualityData,
    setNewAirQualityData,
    setTemperature,
    setHumidity,
    setDataPost,
    setVal1
  } 

  useEffect(() => {
    // 세션 정보를 가져오기 위한 API 요청
    axios.get('/LoginMain')
      .then(response => {
        // 세션 데이터를 React state에 저장
        // console.log("서버로 온 데이터 ", response.data);
        if (response.data != null) {
          login(true);
          obj.sessionAddress = response.data.address1;
          obj.sessionLocCode = response.data.addLoccode;
          obj.sessionAddress3 = response.data.address3;
          console.log('DB 주소: ', obj.sessionAddress, 'DB locCode: ', obj.sessionLocCode);
        }

        setLoadKey(obj.sessionAddress3)
        setSessionData(response.data);
        // console.log(apiFetchRef, "는 무엇")
        // 자식 컴포넌트인 ApiFetch의 ref를 설정합니다.
        if (apiFetchRef.current) {
          console.log("실행되는가?")
          apiFetchRef.current.fetchData();
        }
        // fetchData()
      })
      .catch(error => {
        console.error('세션 정보 가져오기 실패:', error);
      });
  }, []);


  const checkWorkPlace = (workPlaceYN) => {
    return workPlaceYN === 1 ? '예' : '아니오';
  };

  var first = gu.map((el,idx) => (
    <option key={idx} value={el.gu}>
      {el.gu}
    </option>
  ))
  var addList = []
  var second = ro
  .filter((el) => el.gu === val1)
  .map((el,idx) => (
    <option key={idx} value={el.ro}>
      {el.ro}
    </option>
    ))
  var third = da.filter((el) => el.gu === val1 && el.ro === val2)
  .map((el) => {addList.push(el)
    return el
  })
  .map((el,idx) => (
    <option key={idx} value={el.da}>
      {el.da}
    </option>
  ))

  return (
    <>
    <ApiFetch obj={obj} ref={apiFetchRef} />
      <div className='gridContainer' style={{ margin: '30px 50px' }}>
        <div id='gridItem1' style={{ border: '5px solid rgba(100, 149, 237, 0.7)',  borderRadius: '15px', textAlign:'center'}}>
          <p style={{fontSize: '48px', textAlign:'center',color:'black'}}>서울시 전체 미세먼지 현황</p>
          {sessionData ? (
            <div style={{fontSize: '20px'}}> 
              <span style={{color: 'blue'}}> 좋음 😍 </span> <span style={{color: 'green'}}> 보통 😀 </span> <span style={{color: 'orange'}}> 나쁨 😒 </span> <span style={{color: 'red'}}> 아주 나쁨 😫</span>
              
              <div className="validate-input m-b-23" style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', padding: '20px 0px 0px 0px', marginBottom: '0px'}}>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px'}}>
                  <div>
                    <span className="label-input100" ></span>
                    <span>도로를 선택하세요.</span>
                    <select className="input100" type="text" name="address2" onChange={(e) => setVal2(e.target.value)}>
                    <option value="">선택</option>
                    {second}
                    </select>
                    <span className="focus-input100_2" data-symbol="&#xf206;"></span>
                  </div>
              </div>
              <div>
                  <span className="label-input100"></span>
                  <select className="input100" type="text" name="address3" onChange={(e) => setLoadKey(e.target.value)}>
                  <option value="">선택</option>
                    {third}
                  </select>
                  <span className="focus-input100_2" data-symbol="&#xf206;"></span>
                </div>
            </div>
            <br/>
            </div>
          ) : (
            <p>로딩 중...</p>
          )}
          <SeoulMap airQualityData1={apiFetchRef.AllAirQualityData} setDistrictKey={(i)=> apiFetchRef.setDistrictKey(i)} />
        </div>
        <div id='gridItem2' style={{ border: '5px solid rgba(167, 212, 131, 0.7)',  borderRadius: '15px' , fontSize: '48px', textAlign:'center'}}><p style={{fontSize: '48px', textAlign:'center',color:'black'}}>나의 동네 대기 정보</p>
          {sessionData ? (
            <div> 
              <p style={{fontSize:'24px'}}> 🖐️ {sessionData.username}님</p>
              <p style={{fontSize:'16px'}}>거주지 : {sessionData.address1} {sessionData.address2} / 출근지 : {sessionData.workPlace1} {sessionData.workPlace2} <br></br> 취약계층 : {sessionData.vgroups} / 취약환경여부 : {checkWorkPlace(sessionData.workPlaceYN)}</p> 
            </div>
          ) : (
            <p>로딩 중...</p>
          )}
          <Chart airQualityData2={apiFetchRef.newAirQualityData} pyCharmData={pyCharmData} />
          <div style={{ border: '#DCEDC8',borderRadius: '15px', margin:'30px 50px' ,background:'#DCEDC8'}}><p style={{fontSize:'18px'}}> 기온: {apiFetchRef.temperature}℃ / 습도: {apiFetchRef.humidity}% </p></div>
            <div style={{ border: '#DCEDC8',borderRadius: '15px', margin:'30px 50px' ,background:'#DCEDC8'}}><p style={{fontSize:'18px'}}> 사용자에 따라 달라지는 안내 </p></div>
          </div>
        </div>
      </>
  );
}

export default LoginMain;