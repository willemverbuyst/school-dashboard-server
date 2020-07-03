import React from 'react';
import { Scatter } from 'react-chartjs-2';

export default function ScatterChart({ data, color, title }) {
  const chartData = {
    labels: { display: false },
    datasets: [
      {
        label: { display: false },
        data: data,
        backgroundColor: color,
        borderWidth: 0,
        pointRadius: 5,
      },
    ],
  };

  return (
    <div style={{ width: '60vw', height: '30vh' }}>
      <Scatter
        data={chartData}
        options={{
          tooltips: false,
          legend: {
            display: false,
            labels: { fontSize: 16 },
          },
          responsive: true,
          title: { text: title, display: true },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  beginAtZero: true,
                  stepSize: 1,
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
                type: 'time',
                time: { parser: 'YYYY/MM/DD HH:mm:ss' },
              },
            ],
          },
        }}
      />
    </div>
  );
}
