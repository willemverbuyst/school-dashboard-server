import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarChartHome({ labels, data, color }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: { display: false },
        data: data,
        backgroundColor: color,
        borderWidth: 0,
      },
    ],
  };

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
