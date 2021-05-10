import React, { ReactElement } from 'react';
import { Pie } from 'react-chartjs-2';

interface IInputPieChart {
  labels: string[];
  data: number[];
  color: string[];
  title: string;
}

const PieChart: React.FC<IInputPieChart> = ({
  labels,
  data,
  color,
  title = '',
}: IInputPieChart): ReactElement => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: color,
        borderWidth: 0,
      },
    ],
  };

  return (
    <Pie
      data={chartData}
      options={{
        tooltips: { enabled: false },
        legend: {
          display: true,
          position: 'bottom',
          labels: { fontSize: 12 },
        },
        responsive: true,
        title: { text: title, display: true, padding: 15, fontSize: 14 },
      }}
    />
  );
};

export default PieChart;
