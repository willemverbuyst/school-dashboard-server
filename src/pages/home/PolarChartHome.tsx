import React, { ReactElement } from 'react';
import { Polar } from 'react-chartjs-2';

const PolarChartHome = (): ReactElement => {
  const chartData = {
    labels: ['Please', 'log', 'in'],
    datasets: [
      {
        label: '',
        data: [80, 56, 67],
        backgroundColor: ['#B81D9D', '#D222E1', '#8F1CB8'],
        borderWidth: 4,
      },
    ],
  };

  return (
    <Polar
      data={chartData}
      options={{
        tooltips: { enabled: false },
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
};

export default PolarChartHome;
