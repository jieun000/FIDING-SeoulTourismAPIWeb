/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const MyChart = ({ airQualityData2, pyCharmData }) => {
  const chartRef = useRef(null);
  console.log("Chart에서 받는 airQualityData2 데이터:", airQualityData2);
  console.log("Chart에서 받는 loadData 데이터:", pyCharmData);
  useEffect(() => {
    if(airQualityData2!=null){
      var districtName = airQualityData2.MSRSTE_NM;
      var pm10Value = airQualityData2.PM10;
      var pm25Value = airQualityData2.PM25;
      var o3Value = airQualityData2.O3;
      var no2Value = airQualityData2.NO2;
      var coValue = airQualityData2.CO;
      
      console.log(`Chart.js ${districtName}의 오존: ${o3Value}, 이산화질소: ${no2Value}, 일산화탄소: ${coValue}`);
    } else {
      console.log("district Null")
    }
    if(pyCharmData!=null){
      var pm10LoadValue = pyCharmData.PM10;
      var pm25LoadValue = pyCharmData.PM25;
      var o3LoadValue = pyCharmData.O3;
      var no2LoadValue = pyCharmData.NO2;
      var coLoadValue = pyCharmData.CO;
      console.log(`Chart.js 도로의 오존: ${o3LoadValue}, 이산화질소: ${no2LoadValue}, 일산화탄소: ${coLoadValue}`);
    } else {
      console.log("load Null")
    }
    var context = chartRef.current.getContext('2d');
    const myChart = new Chart(context, {
      type: 'bar',
      data: {
        labels: ['오존', '이산화질소', '일산화탄소'],
        datasets: [
          {
            label: '구',
            data: [o3Value, no2Value, coValue],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              // 'rgba(75, 192, 192, 1)',
              // 'rgba(153, 102, 255, 1)',
              // 'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
          {
            label: '도로',
            data: [o3LoadValue, no2LoadValue, coLoadValue],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              // 'rgba(75, 192, 192, 1)',
              // 'rgba(153, 102, 255, 1)',
              // 'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
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
      myChart.destroy();
    };
  }, [airQualityData2, pyCharmData]);

  return (
    <div>
      <canvas
        id='myChart'
        ref={chartRef}
        style={{ padding: '15px 20px 15px', width: '80vh', display: 'block' }}
      ></canvas>
    </div>
  );
};

export default MyChart;