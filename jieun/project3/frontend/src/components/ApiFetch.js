import React, { useEffect, useState, useImperativeHandle } from 'react';
import axios from 'axios';
import { weather } from './Weather';

const ApiFetch = React.forwardRef(({obj}, ref) => {
  console.log("ApiFetch 기동")
  var { sessionAddress, sessionLocCode, districtKey, setDistrictKey, AllAirQualityData, 
    setAllAirQualityData, newAirQualityData, setNewAirQualityData, setTemperature, setHumidity, 
    dataPost, setDataPost, setVal1, loadKey, setLoadKey, loadData, setLoadData
  }  = obj;
  // console.log("districtKey는?", districtKey)
  // console.log('ApiFetch에서 사용할 주소: ', sessionAddress, 'locCode: ', sessionLocCode)

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

  const getDistrictKey = (districtKey, airQualityData) => {
    let result = null;
    Object.keys(airQualityData).forEach((key) => {
      if (airQualityData[key]['MSRSTE_NM'] === districtKey) {
        result = airQualityData[key];
      }
    });
    return result;
  };
  const districtClick = (districtKey, airQualityData) => {
    const selectedData = getDistrictKey(districtKey, airQualityData);
    setNewAirQualityData(selectedData);
  };

  // const getLoadKey = (loadKey, airQualityData) =>{
  //   console.log('getLoadKey?', loadKey, airQualityData)
  //   var getLoadKeyResult = null
  //   Object.keys(airQualityData).forEach((key)=>{
  //     if(airQualityData[key]['load']===loadKey){
  //       getLoadKeyResult = airQualityData[key];
  //       console.log(getLoadKeyResult)
  //     } 
  //   })
  //   return getLoadKeyResult
  // }
  // const loadClick = (loadKey, pyCharmData) => {
  //   if(pyCharmData!=null) {
  //     console.log("loadClick 함수", loadKey, pyCharmData) 
  //     // const matchingObject = pyCharmData.find(obj => obj.load === loadKey);
  //     const selectedData = getLoadKey(loadKey, pyCharmData);
  //     setLoadData(selectedData);
  //   } else {
  //       console.log("pyCharmData Null")
  //   }
  //   // const selectedData = getLoadKey(loadKey, pyCharmData)
  //   // setNewAirQualityData(selectedData);
  //   // console.log("차트", newAirQualityData)
  // };


  const fetchData = async (loadKey) => {
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
      // console.log(`세션 주소의 weatherX: ${weatherX}, weatherY: ${weatherY}`);

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

      const airQualityResponse = await axios.get(
        `http://openAPI.seoul.go.kr:8088/7262614b76776c64363379726a594b/json/TimeAverageAirQuality/1/25/${formattedCurrentDate}/`
      );

      const airQualityData = airQualityResponse.data.TimeAverageAirQuality.row;
      const AllAirQualityData = {};
      let newAirQualityData = {};

      for (const key in airQualityData) {
        AllAirQualityData[key] = airQualityData[key];
        if (airQualityData[key].MSRSTE_NM === sessionAddress) {
          newAirQualityData = airQualityData[key];
        }
      }
      setAllAirQualityData(AllAirQualityData);
      setNewAirQualityData(newAirQualityData);
      
      // console.log("333333333333333333333333 loadKey?", loadKey)
      // console.log("44444444444444", typeof(sessionLocCode),sessionLocCode, typeof(loadKey), loadKey);
      const trafficResponse = await axios.get(
        `http://openapi.seoul.go.kr:8088/7262614b76776c64363379726a594b/xml/TrafficInfo/1/10/${sessionLocCode}`
      );

      const trafficData = trafficResponse.data;
      const xmlString = trafficData;
      const match = xmlString.match(/<prcs_spd>([\d.]+)<\/prcs_spd>/);
      const spdValue = match ? match[1] : null;
      // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!spdValue: ", spdValue)

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
    fetchData(loadKey);
    districtClick(districtKey, AllAirQualityData);
    // loadClick(loadKey, AllAirQualityData);
    setVal1(districtKey);
  }, [districtKey]);

  return <></>;
});

export default ApiFetch;
