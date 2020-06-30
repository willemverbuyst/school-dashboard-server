import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

export default function BarChart({ labels, color, data }) {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: { display: false },
          data: data,
          backgroundColor: color,
          borderWidth: 3,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  });

  return (
    <div style={{ width: '30vw', height: '30vh' }}>
      <Line
        data={chartData}
        options={{
          tooltips: false,
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
