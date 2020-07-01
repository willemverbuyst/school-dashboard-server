import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarChart({ labels, color, data }) {
  const [chartData, setChartData] = useState({});
  const bgColor = [];
  for (let i = 0; i < labels.length; i++) bgColor.push(color);

  const chart = () => {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: { display: false },
          data: data,
          backgroundColor: bgColor,
          borderWidth: 0,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <Bar
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
                display: false,
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
              ticks: {
                fontSize: 18,
                padding: 0,
                fontColor: '#000',
              },
            },
          ],
        },
      }}
    />
  );
}
