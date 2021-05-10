import React, { ReactElement } from 'react';
import { Doughnut } from 'react-chartjs-2';

interface IInputDoughnutChart {
  data: number[];
  color: string[];
  title: string;
}

const DoughnutChart: React.FC<IInputDoughnutChart> = ({
  data,
  color,
  title = '',
}: IInputDoughnutChart): ReactElement => {
  const chartData = {
    datasets: [
      {
        data: data,
        backgroundColor: color,
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    tooltips: { enabled: false },
    legend: {
      display: false,
    },
    responsive: true,
    title: { text: title, display: true, padding: 15, fontSize: 14 },
  };

  return <Doughnut data={chartData} options={chartOptions} />;
};

export default DoughnutChart;
