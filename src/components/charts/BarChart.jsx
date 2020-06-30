import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarChart() {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: ['Welcome', 'to', 'your', 'dashboard'],
      datasets: [
        {
          label: { display: false },
          data: [80, 56, 67, 45],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 0,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div style={{ width: '30vw', height: '30vh' }}>
      <Bar
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
