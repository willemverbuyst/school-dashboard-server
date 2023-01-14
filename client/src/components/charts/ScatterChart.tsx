import * as chartjs from "chart.js";
import { ChartData, Scatter } from "react-chartjs-2";

interface Coordinates {
  x: string;
  y: number;
}

interface Props {
  data: Coordinates[];
  color: string[];
  title: string;
}

export function ScatterChart({ data, color, title }: Props): JSX.Element {
  const chartData: ChartData<chartjs.ChartData> = {
    datasets: [
      {
        data: data,
        backgroundColor: color,
        borderWidth: 0,
        pointRadius: 5,
      },
    ],
  };
  const chartOptions: chartjs.ChartOptions = {
    tooltips: { enabled: false },
    legend: {
      display: false,
    },
    responsive: true,
    title: { text: title, display: true, padding: 15, fontSize: 14 },
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
          type: "time",
          time: { parser: "YYYY/MM/DD HH:mm:ss" },
        },
      ],
    },
  };

  return <Scatter data={chartData} options={chartOptions} />;
}
