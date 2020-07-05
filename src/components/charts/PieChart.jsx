import React from 'react';
import { Pie } from 'react-chartjs-2';

export default function PieChart({ labels, data, color, title = '' }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: color,
        borderWidth: 0,
      },
    ],
  };

  return (
    <Pie
      data={chartData}
      options={{
        tooltips: false,
        legend: {
          display: true,
          position: 'bottom',
          labels: { fontSize: 14 },
        },
        responsive: true,
        title: { text: title, display: true, padding: 15, fontSize: 14 },
      }}
    />
  );
}
