import React from 'react'

const ApiFetch = () => {
    var sessionLocCode = '1080012200'; // 기본 locCode (세션 조회하며 DB addLoccode로 바뀜)
    var sessionAddress = '강동구'; // 기본 주소 (세션 조회하며 DB address1로 바뀜)
    var [weatherX, weatherY] = weather[sessionAddress];
    console.log(`weatherX: ${weatherX}, weatherY: ${weatherY}`);
    const fetchData = async () => {
      try {
        // PTY: 강수형태, REH: 습도(%), RN1: 1시간 강수량(mm), T1H: 기온(℃),  
        // UUU: 동서바람성분(m/s): , VEC: 풍향(deg), VVV: 남북바람성분(m/s), WSD: 풍속(m/s),
        // NO2: 이산화질소농도(ppm), O3: 오존농도(ppm), CO	일산화탄소농도(ppm), SO2: 아황산가스(ppm), PM10: 미세먼지(㎍/㎥), PM25: 초미세먼지(㎍/㎥)
        // spdValue: 교통 속도 , momentDateValue: localTime
  
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
        setWeatherResponse(...weatherData,newWeatherData);
  
        console.log('날씨 정보:', weatherResponse);
  
        // 서울시 시간 평균 대기오염도 정보(구별 미세먼지, 초미세먼지, 오존, 무슨 공기 등)
       const airQualityResponse = await axios.get(
          `http://openAPI.seoul.go.kr:8088/7262614b76776c64363379726a594b/json/TimeAverageAirQuality/1/25/${formattedCurrentDate}/`
        );
        const airQualityData = airQualityResponse.data.TimeAverageAirQuality.row;
        const AllAirQualityData = {}; // 서울시 전체 대기오염도
        const newAirQualityData = {}; // 사용자 맞춤 주소 대기오염도
        for (const key in airQualityData) {
          AllAirQualityData[key] = airQualityData[key];
          if(airQualityData[key].MSRSTE_NM == sessionAddress) {
            newAirQualityData[key] = airQualityData[key];
          }
        }
        setAllAirQualityData({...AllAirQualityData});
        console.log('서울시 전체 대기 오염도:', AllAirQualityData);
  
  
        // 서울시 실시간 도로 소통 정보(교통 속도)
        const trafficResponse = await axios.get(
          `http://openapi.seoul.go.kr:8088/7262614b76776c64363379726a594b/xml/TrafficInfo/1/10/${sessionLocCode}`
        );
        console.log('!!! 조회한 locCode !!!: ', sessionLocCode);
        const trafficData = trafficResponse.data;
        const xmlString = trafficData;
        const match = xmlString.match(/<prcs_spd>([\d.]+)<\/prcs_spd>/);
        const spdValue = match ? match[1] : null;
  
        // getFormattedDate 함수로 local time 가져오기
        const momentDateValue = getFormattedDate();
  
        setDataPost({ ...newWeatherData, spdValue, momentDateValue });
        console.log('Server로 보낼 데이터: ', { ...newWeatherData, ...newAirQualityData, spdValue, momentDateValue });
  
        console.log('기상 정보:', newWeatherData);
        console.log('대기 오염도:', newAirQualityData);
        console.log('교통 속도:', spdValue);
        console.log('local time:', momentDateValue);
    
  } catch (error) {
    console.error(error);
  }
    }//fetchData
    fetchData()
     
   
  return (
    <div>ApiFetch</div>
  )
}

export default ApiFetch