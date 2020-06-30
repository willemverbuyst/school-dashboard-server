import React, { useState, useEffect } from 'react';
import { Polar } from 'react-chartjs-2';

export default function ChartHomePage() {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      datasets: [
        {
          label: { display: false },
          data: [80, 56, 67],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(2, 99, 132, 1)',
            'rgba(200, 190, 50, 1)',
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
            display: false,
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
