import React from 'react';
import { Polar } from 'react-chartjs-2';

export default function PolarChartHome() {
  const chartData = {
    labels: ['Please', 'log', 'in'],
    datasets: [
      {
        label: { display: false },
        data: [80, 56, 67],
        backgroundColor: ['#B81D9D', '#D222E1', '#8F1CB8'],
        borderWidth: 4,
      },
    ],
  };
  const chartOptions ={
    tooltips: false,
    legend: {
      display: true,
      position: 'bottom',
      labels: { fontSize: 18 },
    },
    responsive: true,
    title: { display: false },
    scale: {
      display: false,
    },
  }
  

  return (
    <Polar
      data={chartData}
      options={chartOptions}
    />
  );
}
