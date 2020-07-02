import React from 'react';
import { Polar } from 'react-chartjs-2';

export default function PolarChart({ labels, color, data }) {
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
    <Polar
      data={chartData}
      options={{
        tooltips: false,
        legend: {
          display: true,
          position: 'bottom',
          labels: { fontSize: 18 },
        },
        responsive: true,
        title: { display: false },
        scale: {
          lineArc: true,
          angleLines: {
            color: 'rgba(204, 255, 51, 0.5)',
          },
          pointLabels: {
            fontColor: 'ff6666',
          },
          gridLines: {
            color: 'pink',
          },
          ticks: {
            min: 0,
          },
        },
      }}
    />
  );
}
