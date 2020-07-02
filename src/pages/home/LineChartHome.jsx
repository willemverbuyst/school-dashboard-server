import React from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChartHome({ labels, color, data }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: { display: false },
        data: data,
        backgroundColor: color,
        borderWidth: 3,
      },
    ],
  };

  return (
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
