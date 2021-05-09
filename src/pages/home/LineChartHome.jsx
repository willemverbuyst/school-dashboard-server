import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChartHome = () => {
  const chartData = {
    labels: ['to', 'see', 'your', 'progress'],
    datasets: [
      {
        label: { display: false },
        data: [45, 67, 56, 80],
        backgroundColor: ['#A026FF'],
        borderWidth: 3,
      },
    ],
  };
  const chartOptions = {
    tooltips: false,
    legend: {
      display: false,
    },
    responsive: true,
    title: { display: false },
    scales: {
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            beginAtZero: true,
            display: false,
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
          ticks: {
            fontSize: 18,
            padding: 0,
            fontColor: '#000',
          },
        },
      ],
    },
  }

  return (
    <Line
      data={chartData}
      options={chartOptions}
    />
  );
}

export default LineChartHome