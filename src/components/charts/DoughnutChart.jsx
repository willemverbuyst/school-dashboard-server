import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function DoughnutChart({ data, color, title }) {
  const chartData = {
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
    <Doughnut
      data={chartData}
      options={{
        tooltips: false,
        legend: {
          display: false,
          labels: { fontSize: 16 },
        },
        responsive: true,
        title: { text: title, display: true, padding: 15, fontSize: 14 },
      }}
    />
  );
}
