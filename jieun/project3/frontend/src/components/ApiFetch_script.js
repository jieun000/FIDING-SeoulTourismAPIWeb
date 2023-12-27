import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { weather } from './Weather';
import { traffic_volume, road_dict } from './Traffic';

const ApiFetch = React.memo(({ obj }) => {
  console.log("ApiFetch 실행")
  var { sessionAddress, sessionAddress3, sessionLocCode, 
    setTemperature, setHumidity, setFinedust,setUltrafinedust,
    setAllAirQualityData, setNewAirQualityData,
    setDataPost
  }  = obj;


  // 오늘 날짜를 가져오는 함수
  const getFormattedDate = () => {
    const nowTime = new Date();
    const year = nowTime.getFullYear();
    const month = (nowTime.getMonth() + 1).toString().padStart(2, '0');
    const day = nowTime.getDate().toString().padStart(2, '0');
    const hours = nowTime.getHours().toString().padStart(2, '0');
    const minutes = nowTime.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // api로 정보를 가져오는 함수
  const fetchData = useCallback(async () => {
    console.log("ApiFetch의 fetchData 실행")
    try {
      console.log('DB 주소: ', sessionAddress, 'DB locCode: ', sessionLocCode);
      const currentDateTime = new Date();
      const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
      const dayOfWeek = daysOfWeek[currentDateTime.getDay()]; // today 요일 (교통량에 사용)
      const year = currentDateTime.getFullYear();
      const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDateTime.getDate().toString().padStart(2, '0');
      var formattedCurrentDate = `${year}${month}${day}`;
      const currentHour = currentDateTime.getHours();
      const adjustedHour = (currentHour - 1 + 24) % 24;
      const formattedCurrentHour = adjustedHour.toString().padStart(2, '0');
      if(formattedCurrentHour == 23) formattedCurrentDate = formattedCurrentDate - 1; // 24시에 날짜가 넘어가며 당일 23시를 조회하는 걸 방지
      const formattedCurrentTime = `${formattedCurrentHour}00`;
      var [weatherX, weatherY] = weather[sessionAddress];
      
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
      // console.log("기상청:", newWeatherData);

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
      setNewAirQualityData(newAirQualityData);
      setFinedust(newAirQualityData.PM10);
      setUltrafinedust(newAirQualityData.PM25);
      // console.log("대기오염도:", newAirQualityData);

      // 교통량
      const trafficData = traffic_volume[road_dict[sessionLocCode].load_type][dayOfWeek]
      // console.log('교통량:', trafficData);

      // 서울시 실시간 도로 소통 정보(교통 속도)
      const trafficResponse = await axios.get(
        `http://openapi.seoul.go.kr:8088/7262614b76776c64363379726a594b/xml/TrafficInfo/1/10/${sessionLocCode}`
      );
      const trafficSpdData = trafficResponse.data;
      const xmlString = trafficSpdData;
      const match = xmlString.match(/<prcs_spd>([\d.]+)<\/prcs_spd>/);
      const spdValue = match ? match[1] : null;
      // console.log("교통 속도:", spdValue);

      const momentDateValue = getFormattedDate();
      
      
      setDataPost({ ...newWeatherData, ...newAirQualityData, trafficData, spdValue, momentDateValue });
      // console.log("포장:", { ...newWeatherData, ...newAirQualityData, spdValue, momentDateValue });
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