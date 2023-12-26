/* eslint-disable */ 
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {Doughnut} from 'react-chartjs-2'

const MyChart = ({ airQualityData,  pyCharmData, loadName }) => {

  const chartRef = useRef(null);

  useEffect(() => {
    if(airQualityData!=null){
        console.log("Chart에서 받는 airQualityData 데이터:", airQualityData, "\nChart에서 받는 loadData 데이터:", pyCharmData, "\n도로명:",loadName);
        var districtName = airQualityData.MSRSTE_NM;
        var O3Value = airQualityData.O3;
        var NO2Value = airQualityData.NO2;
        var COValue = airQualityData.CO;
        // console.log(`Chart.js ${districtName}의 오존: ${O3Value}, 이산화질소: ${NO2Value}, 일산화탄소: ${COValue}`);
      } else {
        // console.log("district Null")
      }
      if(pyCharmData!=null) {
        var O3LoadValue = pyCharmData.O3;
        var NO2LoadValue = pyCharmData.NO2;
        var COLoadValue = pyCharmData.CO;
        // console.log(`Chart.js 도로의 오존: ${O3LoadValue}, 이산화질소: ${NO2LoadValue}, 일산화탄소: ${COLoadValue}`);
      } else {
        // console.log("load Null")
      }
    const context = chartRef.current.getContext('2d');
    const myChart = new Chart(context, {
        type: 'bar',
        data: {
          labels: ['오존', '이산화질소', '일산화탄소'],
          datasets: [
            {
              label: districtName,
              data: [O3Value, NO2Value, COValue],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1,
            },
            {
              label: loadName,
              data: [O3LoadValue, NO2LoadValue, COLoadValue],
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1,
            },
          ],
        },options: {
          scales: {
            x: {
              display: true
            },
            y: {
              display: true,
              type: "logarithmic"
            },
          },
          responsive: false,
          maintainAspectRatio: false, 
        },
      });

    return () => {
      myChart.destroy(); // 컴포넌트가 언마운트될 때 차트 정리
    };
  }, [pyCharmData]); // 빈 종속성 배열은 useEffect가 초기 렌더링 후 한 번 실행되도록합니다.

  return (
    <div>
      <canvas id='myChart' ref={chartRef} 
        style={{ padding: '15px 20px 15px', width: '80vh', display: 'block' }}>
      </canvas>
    </div>
  );
};
export default MyChart;