/* eslint-disable */ 
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {Doughnut} from 'react-chartjs-2'

const MyChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const context = chartRef.current.getContext('2d');
    const myChart = new Chart(context, {
      type: 'pie',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            label: 'test1',
            data: [21, 19, 25, 20, 23, 26, 25],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false, 
      },
    });

    return () => {
      myChart.destroy(); // 컴포넌트가 언마운트될 때 차트 정리
    };
  }, []); // 빈 종속성 배열은 useEffect가 초기 렌더링 후 한 번 실행되도록합니다.

  return (
    <div>
      <canvas id='myChart' ref={chartRef} style={{ padding: '80px 100px 0px', width: '80vh', display: 'block' }}></canvas>
    </div>
  );
};

export default MyChart;