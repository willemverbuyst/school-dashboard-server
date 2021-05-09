import React from 'react';
// import { Polar } from 'react-chartjs-2';

export default function PolarChartHome({ labels, color, data }) {
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
    //       labels: { fontSize: 18 },
    //     },
    //     responsive: true,
    //     title: { display: false },
    //     scale: {
    //       display: false,
    //     },
    //   }}
    // />
  );
}
