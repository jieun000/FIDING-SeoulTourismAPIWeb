import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './login.css'
import Chart from './Chart';
import SeoulMap from './SeoulMap';
import { weather } from './Weather';
import { fetchWeatherData } from './ApiFetch';

const Main = ({ logout }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('Gangdong-gu');
  const [dataPost, setDataPost] = useState({});
  const [red, setRed] = useState('')

  const [AllAirQualityData, setAllAirQualityData] = useState({});
  const [newWeatherData, setNewWeatherData] = useState({});
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  
const getFormattedDate = () => {
  const nowTime = Date.now();
  const date = new Date(nowTime);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate;
};

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

  // 데이터를 아직 가져오고 있는 경우 로딩 상태를 렌더링
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // 오류가 발생한 경우 오류 상태를 렌더링
  if (error) {
    return <p>Error: {error.message}</p>;
  }





  // 실제로 렌더링될 컴포넌트 내용 및 가져온 데이터를 렌더링
  return (
    <>
    <div className='gridContainer' style={{ margin: '30px 50px' }}>
        <div id='gridItem1' style={{ border: '5px solid rgba(100, 149, 237, 0.7)',  borderRadius: '15px', textAlign:'center'}}><p style={{fontSize: '48px', textAlign:'center',color:'black'}}>서울시 전체 미세먼지 현황</p>
                <div style={{fontSize: '20px'}}> 
                  <span style={{color: 'blue'}}> 좋음 😍 </span> <span style={{color: 'green'}}> 보통 😀 </span> <span style={{color: 'orange'}}> 나쁨 😒 </span> <span style={{color: 'red'}}> 아주 나쁨 😫</span>
                </div>         
          <SeoulMap airQualityData={AllAirQualityData}/>
        </div>
        <div id='gridItem2' style={{ border: '5px solid rgba(167, 212, 131, 0.7)',  borderRadius: '15px' , fontSize: '48px', textAlign:'center'}}><p style={{fontSize: '48px', textAlign:'center',color:'black'}}>동네 대기 정보</p>
          <Chart f={(i)=>setRed(i)} />
          <div><div style={{ border: '#DCEDC8',borderRadius: '15px', margin:'30px 50px' ,background:'#DCEDC8'}}><p style={{fontSize:'18px'}}> 기온: {temperature}℃ / 습도: {humidity}% </p></div></div>
        </div>
        
      </div>
    </>
  );
  }

export default Main;
