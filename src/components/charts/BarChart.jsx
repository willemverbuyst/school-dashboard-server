import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarChart({ labels, data, color, title, max }) {
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
        title: { text: title, display: true, padding: 15, fontSize: 14 },
        scales: {
          yAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
                beginAtZero: true,
                stepSize: 1,
                suggestedMax: max,
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
  );
}
