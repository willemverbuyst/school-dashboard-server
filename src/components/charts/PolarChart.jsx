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
  }, []);

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
          display: false,
        },
      }}
    />
  );
}
