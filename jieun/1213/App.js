import React, { useState, useEffect } from 'react';
import axios from 'axios';

// local time 정보
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

function App() {
  const [data, setData] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('Gangdong-gu');
  const [dataPost, setDataPost] = useState({});
  var temp = '강동구'; // 임시 (db에서 가져올 예정)
  var weather = {'종로구': [60, 127],
 '중구': [60, 127],
 '용산구': [60, 126],
 '성동구': [61, 127],
 '광진구': [62, 126],
 '동대문구': [61, 127],
 '중랑구': [62, 128],
 '성북구': [61, 127],
 '강북구': [61, 128],
 '도봉구': [61, 129],
 '노원구': [61, 129],
 '은평구': [59, 127],
 '서대문구': [59, 127],
 '마포구': [59, 127],
 '양천구': [58, 126],
 '강서구': [58, 126],
 '구로구': [58, 125],
 '금천구': [59, 124],
 '영등포구': [58, 126],
 '동작구': [59, 125],
 '관악구': [59, 125],
 '서초구': [61, 125],
 '강남구': [61, 126],
 '송파구': [62, 126],
 '강동구': [62, 126]
  };
  var [weatherX, weatherY] = weather[temp];
  console.log(`weatherX: ${weatherX}, weatherY: ${weatherY}`);
  const fetchData = async () => {
    try {
      // PTY: 강수형태, REH: 습도(%), RN1: 1시간 강수량(mm), T1H: 기온(℃),  UUU: 동서바람성분(m/s): , VEC: 풍향(deg), VVV: 남북바람성분(m/s), 
      // WSD: 풍속(m/s), PM10: 미세먼지(㎍/㎥), PM25: 초미세먼지(㎍/㎥) , spdValue: 교통 속도 , momentDateValue: localTime
      
      const currentDateTime = new Date(); // 현재 날짜를 사용
      const year = currentDateTime.getFullYear();
      const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDateTime.getDate().toString().padStart(2, '0');
      const formattedCurrentDate = `${year}${month}${day}`;
      const currentHour = currentDateTime.getHours();
      const adjustedHour = (currentHour - 1 + 24) % 24; // 1을 뺀 후 음수 방지 및 24 시간 주기 설정
      const formattedCurrentHour = adjustedHour.toString().padStart(2, '0');
      const formattedCurrentTime = `${formattedCurrentHour}00`;
      console.log('api 조회 날짜(YYYYMMDD): ', formattedCurrentDate);
      console.log('api 조회 시간(시00): ', formattedCurrentTime);
      
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

      // 서울시 시간 평균 대기오염도 정보(구별 미세먼지, 초미세먼지)
      const airQualityResponse = await axios.get(
        `http://openAPI.seoul.go.kr:8088/7262614b76776c64363379726a594b/json/TimeAverageAirQuality/1/5/${formattedCurrentDate}/${temp}`
      );
      const airQualityData = airQualityResponse.data.TimeAverageAirQuality.row[0];
      newWeatherData.PM10 = airQualityData.PM10;
      newWeatherData.PM25 = airQualityData.PM25;

      // 서울시 실시간 도로 소통 정보(교통 속도)
      const trafficResponse = await axios.get(
        `http://openapi.seoul.go.kr:8088/7262614b76776c64363379726a594b/xml/TrafficInfo/1/10/1080012200`
      );
      const trafficData = trafficResponse.data;
      const xmlString = trafficData;
      const match = xmlString.match(/<prcs_spd>([\d.]+)<\/prcs_spd>/);
      const spdValue = match ? match[1] : null;

      // local time 가져오기
      const momentDateValue = getFormattedDate();

      setDataPost({ ...newWeatherData, spdValue, momentDateValue });

      console.log('기상 정보:', newWeatherData);
      console.log('대기 오염도:', airQualityData);
      console.log('교통 속도:', spdValue);
      console.log('local time:', momentDateValue);

      // const response2 = await axios.post('/server', dataPost);
      // const responseData = response2.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDistrict]);

  const onDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <div>
      <div>
        <select name="haengjeongdong" onChange={onDistrictChange} value={selectedDistrict}>
          <option value="Gangdong-gu">강동구</option>
          <option value="Songpa-gu">송파구</option>
        </select>
      </div>
      {data && <textarea rows={30} cols={80} value={JSON.stringify(data, null, 2)} readOnly={true} />}
      <div>
        <p>Data Post: {getFormattedDate()}</p>
        <pre>{JSON.stringify(dataPost, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
