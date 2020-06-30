// TUTORIAL ON CHART.JS
// https://www.youtube.com/watch?v=A5KaLpqzRi4&t=286s

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

export default function DynamicChart() {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: ['geography', 'history', 'math'],
      datasets: [
        {
          label: { display: false },
          data: [80, 56, 67],
          backgroundColor: [
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
  });

  return (
    <div style={{ width: '60vw', height: '30vh' }}>
      <Bar
        data={chartData}
        options={{
          tooltips: false,
          legend: {
            display: false,
          },
          responsive: true,
          title: { text: 'AVERAGE PER SUBJECT', display: true },
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
