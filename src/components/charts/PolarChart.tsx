import React, { ReactElement } from 'react';
import * as chartjs from 'chart.js';
import { ChartData, Polar } from 'react-chartjs-2';

interface IInputPolarChart {
  labels: string[];
  data: number[];
  color: string[];
  title: string;
}

const PolarChart: React.FC<IInputPolarChart> = ({
  labels,
  color,
  data,
  title,
}: IInputPolarChart): ReactElement => {
  const chartData: ChartData<chartjs.ChartData> = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: color,
        borderWidth: 4,
      },
    ],
  };
  const chartOptions: chartjs.ChartOptions = {
    tooltips: { enabled: false },
    legend: {
      display: true,
      position: 'bottom',
      labels: { fontSize: 12 },
    },
    responsive: true,
    title: { text: title, display: true, padding: 15, fontSize: 14 },
    scale: {
      display: false,
    },
  };

  return <Polar data={chartData} options={chartOptions} />;
};

export default PolarChart;
