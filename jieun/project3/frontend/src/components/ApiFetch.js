import React, { useEffect, useCallback } from 'react';
import axios from 'axios';

const ApiFetch = React.memo(({ obj }) => {
  console.log("ApiFetch 실행")
  var { sessionAddress, sessionLocCode, 
    setTemperature, setHumidity, setFinedust,setUltrafinedust,
    setAllAirQualityData, setNewAirQualityData,
    setDataPost
  }  = obj;

  // api로 정보를 가져오는 함수
  const fetchData = useCallback(async () => {
    console.log("ApiFetch의 fetchData 실행");
    console.log('DB 주소: ', sessionAddress, 'DB locCode: ', sessionLocCode);
    try {
      const response = await axios.post('http://localhost:8080/api/api-fetch', {
        sessionAddress, 
        sessionLocCode 
      });
      const data = response.data;
      // console.log(data);
      if (data && !data.error) {
        const newWeatherData = data.newWeatherData; 
        const newAirQualityData = data.newAirQualityData; 
        const AllAirQualityData = data.AllAirQualityData; 
        const trafficData = data.trafficData; 
        const spdValue = data.spdValue; 
        const momentDateValue = data.momentDateValue; 
        // console.log("기상청:", newWeatherData);
        // console.log("대기오염도:", newAirQualityData);
        // console.log("서울시 대기오염도:", AllAirQualityData);
        // console.log('교통량:', trafficData);
        // console.log("교통 속도:", spdValue);
        // console.log("현재 시간:", momentDateValue);

        setTemperature(newWeatherData.T1H);
        setHumidity(newWeatherData.REH);
        setAllAirQualityData(AllAirQualityData);
        setNewAirQualityData(newAirQualityData);
        setFinedust(newAirQualityData.PM10);
        setUltrafinedust(newAirQualityData.PM25);
        setDataPost({ ...newWeatherData, ...newAirQualityData, trafficData, spdValue, momentDateValue });
        // console.log("포장:", { ...newWeatherData, ...newAirQualityData, trafficData, spdValue, momentDateValue });
      }
    } catch (error) {
      console.error(error);
    }
  }, [obj]);

  useEffect(() => {
    fetchData(); 
  }, [sessionAddress, sessionLocCode]);

  return (
    <></>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.obj.sessionAddress === nextProps.obj.sessionAddress &&
    prevProps.obj.sessionLocCode === nextProps.obj.sessionLocCode
  );
});

export default React.memo(ApiFetch);