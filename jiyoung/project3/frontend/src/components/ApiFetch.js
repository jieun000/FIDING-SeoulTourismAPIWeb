import React, { useEffect, useState, useImperativeHandle } from 'react';
import axios from 'axios';
import { weather } from './Weather';

const ApiFetch = React.forwardRef(({obj}, ref) => {
  console.log("ApiFetch 기동")
  var { sessionAddress, sessionAddress3, sessionLocCode, districtKey, setDistrictKey, AllAirQualityData, 
    setAllAirQualityData, newAirQualityData, setNewAirQualityData, setTemperature, setHumidity, setFinedust, setUltrafinedust,
    setDataPost, setVal1, loadKey
  }  = obj;


  const getDistrictKey = (districtKey, airQualityData) => {
    let result = null;
    Object.keys(airQualityData).forEach((key) => {
      if (airQualityData[key]['MSRSTE_NM'] === districtKey) {
        result = airQualityData[key];
      }
    });
    return result;
  };

  const getFormattedDate = () => {
    const nowTime = Date.now();
    const date = new Date(nowTime);
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const districtClick = (districtKey, airQualityData) => {
    const selectedData = getDistrictKey(districtKey, airQualityData);
    setNewAirQualityData(selectedData);
  };

  const fetchData = async () => {
    console.log("fetchData 기동")
    try {
      const currentDateTime = new Date();
      const year = currentDateTime.getFullYear();
      const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDateTime.getDate().toString().padStart(2, '0');
      const formattedCurrentDate = `${year}${month}${day}`;
      const currentHour = currentDateTime.getHours();
      const adjustedHour = (currentHour - 1 + 24) % 24;
      const formattedCurrentHour = adjustedHour.toString().padStart(2, '0');
      const formattedCurrentTime = `${formattedCurrentHour}00`;
      var [weatherX, weatherY] = weather[sessionAddress];
      console.log(`세션 주소의 weatherX: ${weatherX}, weatherY: ${weatherY}`);

      // PTY: 강수형태, REH: 습도(%), RN1: 1시간 강수량(mm), T1H: 기온(℃),  
      // UUU: 동서바람성분(m/s): , VEC: 풍향(deg), VVV: 남북바람성분(m/s), WSD: 풍속(m/s),
      // NO2: 이산화질소농도(ppm), O3: 오존농도(ppm), CO	일산화탄소농도(ppm), SO2: 아황산가스(ppm), PM10: 미세먼지(㎍/㎥), PM25: 초미세먼지(㎍/㎥)
      // spdValue: 교통 속도 , momentDateValue: localTime


      // 기상청_단기예보 조회서비스(구별 기온, 풍속 강수량, 습도)
      const weatherResponse = await axios.get(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=MObf6y97lMfmWcjlKFdFnrmxqkpSUCTZS3Ej%2B9qyj74L%2FOomLk2EM3TMX%2FrTLgYvzxyAVrgRMmLfNZDgAwT%2BEA%3D%3D&numOfRows=10&dataType=json&pageNo=1&base_date=${formattedCurrentDate}&base_time=${formattedCurrentTime}&nx=${weatherX}&ny=${weatherY}`
      );

      const weatherData = weatherResponse.data;
      const newWeatherData = {};

      if (weatherData && weatherData.response.body.items.item) {
        weatherData.response.body.items.item.forEach(item => {
          newWeatherData[item.category] = item.obsrValue;
        });
      }

      setTemperature(newWeatherData.T1H);
      setHumidity(newWeatherData.REH);

      // 서울시 시간 평균 대기오염도 정보(구별 미세먼지, 초미세먼지, 오존, 무슨 공기 등)  
      const airQualityResponse = await axios.get(
        `http://openAPI.seoul.go.kr:8088/7262614b76776c64363379726a594b/json/TimeAverageAirQuality/1/25/${formattedCurrentDate}/`
      );

      const airQualityData = airQualityResponse.data.TimeAverageAirQuality.row;
      const AllAirQualityData = {}; // 서울시 전체 대기오염도
      let newAirQualityData = {}; // 사용자 맞춤 주소 대기오염도

      for (const key in airQualityData) {
        AllAirQualityData[key] = airQualityData[key];
        if (airQualityData[key].MSRSTE_NM === sessionAddress) {
          newAirQualityData = airQualityData[key];
        }
      }
      setAllAirQualityData(AllAirQualityData);
      console.log("AllAirQualityData: ", AllAirQualityData)
      setNewAirQualityData(newAirQualityData);

      setFinedust(newAirQualityData.PM10);
      setUltrafinedust(newAirQualityData.PM25);

      
      // 서울시 실시간 도로 소통 정보(교통 속도)
      const trafficResponse = await axios.get(
        `http://openapi.seoul.go.kr:8088/7262614b76776c64363379726a594b/xml/TrafficInfo/1/10/${sessionLocCode}`
      );

      const trafficData = trafficResponse.data;
      const xmlString = trafficData;
      const match = xmlString.match(/<prcs_spd>([\d.]+)<\/prcs_spd>/);
      const spdValue = match ? match[1] : null;
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!spdValue: ", spdValue)

      const momentDateValue = getFormattedDate();

      setDataPost({ ...newWeatherData, ...newAirQualityData, spdValue, momentDateValue });
    } catch (error) {
      console.error(error);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchData
  }));

  useEffect(() => {
    sessionAddress = districtKey;
    fetchData();
    districtClick(districtKey, AllAirQualityData);
    setVal1(districtKey);
  }, [districtKey,]);

  return <></>;
});

export default ApiFetch;
