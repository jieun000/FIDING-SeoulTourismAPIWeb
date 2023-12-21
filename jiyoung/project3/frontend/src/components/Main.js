import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import './login.css'
import Chart from './Chart';
import SeoulMap from './SeoulMap';
import { hangjungdong } from './hangjungdong';
import ApiFetch from './ApiFetch';
import AiFetch from './AiFetch';
const { gu, ro, da } = hangjungdong;


const Main = ({ logout }) => {

    // 데이터를 저장하는 상태
    const [data, setData] = useState(null);
    // 로딩 상태를 추적하는 상태
    const [isLoading, setIsLoading] = useState(true);
    // 오류를 추적하는 상태
    const [error, setError] = useState(null);
    const [sessionData, setSessionData] = useState();
    const [sessionAddress, setSessionAddress] = useState("강동구");
    const [sessionAddress3, setSessionAddress3] = useState("1080012200");
    const [sessionLocCode, setSessionLocCode] = useState("1080012200");
    const [newWeatherData, setNewWeatherData] = useState();

    const apiFetchRef = useRef(null);
    const aiFetchRef = useRef(null);
  
    const [pyCharmData, setPyCharmData] = useState(null);
    
    const [loadKey, setLoadKey] = useState("");
  
    const [districtKey, setDistrictKey] = useState("강동구");
    const [AllAirQualityData, setAllAirQualityData] = useState({});
    const [newAirQualityData, setNewAirQualityData] = useState({});
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [finedust, setFinedust] = useState(null);
    const [ultrafinedust, setUltrafinedust] = useState(null);
  
    const [dataPost, setDataPost] = useState({});
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const [val3, setVal3] = useState("");

    var obj = { 
      sessionAddress, 
      sessionAddress3, 
      sessionLocCode, 
      districtKey,
      setDistrictKey, 
      AllAirQualityData,
      setAllAirQualityData,
      newAirQualityData,
      setNewAirQualityData,
      setTemperature,
      setHumidity,
      setFinedust,
      setUltrafinedust,
      setDataPost,
      setVal1,
      loadKey
    }
    var aiObj = {
      dataPost,
      setPyCharmData, 
      loadKey
    }

  useEffect(() => {
    const loginData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/');
        console.log(response);
        const result = await response.json();
        console.log(result);
        setData(result);

        if (typeof logout === 'function') {
          logout(false);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loginData();
  }, [logout]); // logout이 바뀔 때마다 useEffect를 다시 실행

  
  return (
    <>
    <ApiFetch obj={obj} ref={apiFetchRef} />
    <AiFetch obj={aiObj} ref={aiFetchRef} />
    <div className='gridContainer' style={{ margin: '30px 50px' }}>
        <div id='gridItem1' style={{ border: '5px solid rgba(100, 149, 237, 0.7)',  borderRadius: '15px', textAlign:'center'}}><p style={{fontSize: '48px', textAlign:'center',color:'black'}}>서울시 전체 미세먼지 현황</p>
                <div style={{fontSize: '20px'}}> 
                  <span style={{color: 'blue'}}> 좋음 😍 </span> <span style={{color: 'green'}}> 보통 😀 </span> <span style={{color: 'orange'}}> 나쁨 😒 </span> <span style={{color: 'red'}}> 아주 나쁨 😫</span>
                </div>         
          <SeoulMap airQualityData={AllAirQualityData}/>
        </div>
        <div id='gridItem2' style={{ border: '5px solid rgba(167, 212, 131, 0.7)',  borderRadius: '15px' , fontSize: '48px', textAlign:'center'}}><p style={{fontSize: '48px', textAlign:'center',color:'black'}}>동네 대기 정보</p>
        <div style={{ border: '#DCEDC8', borderRadius: '15px', margin:'30px 50px', background:'#fff9c4'}}><p style={{fontSize:'18px'}}>기온 {temperature}℃ / 습도 {humidity}% </p></div>
          <div style={{ border: '#DCEDC8', borderRadius: '15px', margin:'30px 50px', background:'#fff9c4'}}><p style={{fontSize:'18px'}}> 
          <img src="./finedust.png" width="175"></img> <img src="./ultrafinedust.png" width="160"></img><br></br>
          {finedust}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ultrafinedust} </p></div>
          <Chart airQualityData2={newAirQualityData} pyCharmData={pyCharmData} />
          </div>
        </div>
      </>
  );
}

export default Main;
