import React, { useState, useEffect } from 'react';
import { Polar } from 'react-chartjs-2';

export default function ChartHomePage() {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: ['Please', 'log', 'in'],
      datasets: [
        {
          label: { display: false },
          data: [80, 56, 67],
          backgroundColor: [
            'rgba(55, 99, 1, 1)',
            'rgba(2, 99, 132, 1)',
            'rgba(20, 200, 0, 1)',
          ],
          borderWidth: 0,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div style={{ width: '30vw', height: '30vh' }}>
      <Polar
        data={chartData}
        options={{
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
