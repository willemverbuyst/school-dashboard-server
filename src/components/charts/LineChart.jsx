import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

export default function BarChart() {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: ['to', 'see', 'your', 'progress'],
      datasets: [
        {
          label: { display: false },
          data: [80, 56, 67, 45],
          backgroundColor: ['rgba(75, 192, 192, .6)'],
          borderWidth: 3,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div style={{ width: '30vw', height: '30vh' }}>
      <Line
        data={chartData}
        options={{
          legend: {
            display: false,
          },
          responsive: true,
          title: { display: true },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}
