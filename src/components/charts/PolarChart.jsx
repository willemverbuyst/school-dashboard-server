import React, { useState, useEffect } from 'react';
import { Polar } from 'react-chartjs-2';

export default function ChartHomePage({ labels, color, data }) {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: { display: false },
          data: data,
          backgroundColor: color,
          borderWidth: 0,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  });

  return (
    <div style={{ width: '30vw', height: '30vh' }}>
      <Polar
        data={chartData}
        options={{
          tooltips: false,
          legend: {
            display: true,
            position: 'bottom',
          },
          responsive: true,
          title: { display: false },
          scale: {
            ticks: {
              min: 0,
              max: 100,
            },
          },
        }}
      />
    </div>
  );
}
