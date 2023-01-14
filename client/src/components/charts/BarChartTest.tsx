import * as chartjs from "chart.js";
import { Bar, ChartData } from "react-chartjs-2";

interface Props {
  labels: string[];
  data: number[];
  color: string[];
  title: string;
}

export function BarChartTest({
  labels,
  data,
  color,
  title,
}: Props): JSX.Element {
  const chartData: ChartData<chartjs.ChartData> = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: color,
        borderWidth: 0,
      },
    ],
  };

  const chartOptions: chartjs.ChartOptions = {
    tooltips: { enabled: false },
    legend: {
      display: false,
      labels: { fontSize: 16 },
    },
    responsive: true,
    title: { text: title, display: true, padding: 15, fontSize: 14 },
    scales: {
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            beginAtZero: true,
            display: false,
            suggestedMax: 20,
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
        },
      ],
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}
