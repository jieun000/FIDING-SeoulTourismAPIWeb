/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const MyChart = ({ airQualityData2 }) => {
  const chartRef = useRef(null);
  console.log("111",airQualityData2);
  useEffect(() => {
    
    var districtData=airQualityData2
    var districtName = districtData.MSRSTE_NM;
    var pm10Value = districtData.PM10;
    var pm25Value = districtData.PM25;
    var o3Value = districtData.O3;
    console.log(pm10Value, pm25Value, o3Value);

    var context = chartRef.current.getContext('2d');
    const myChart = new Chart(context, {
      type: 'bar',
      data: {
        labels: ['미세먼지', '초미세먼지', '오존'],
        datasets: [
          {
            label: '구',
            data: [pm10Value, pm25Value, o3Value],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
          },
          {
            label: '도로',
            data: [21, 19, 25],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)'
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
  }, [airQualityData2]);

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
