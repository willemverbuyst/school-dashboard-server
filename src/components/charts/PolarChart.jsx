import React from 'react';
// import { Polar } from 'react-chartjs-2';

export default function PolarChart({ labels, color, data, title }) {
  // const chartData = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       label: { display: false },
  //       data: data,
  //       backgroundColor: color,
  //       borderWidth: 4,
  //     },
  //   ],
  // };

  return (
    <p>polar chart</p>
    // <Polar
    //   data={chartData}
    //   options={{
    //     tooltips: false,
    //     legend: {
    //       display: true,
    //       position: 'bottom',
    //       labels: { fontSize: 12 },
    //     },
    //     responsive: true,
    //     title: { text: title, display: true, padding: 15, fontSize: 14 },
    //     scale: {
    //       display: false,
    //     },
    //   }}
    // />
  );
}
