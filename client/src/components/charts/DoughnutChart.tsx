import * as chartjs from "chart.js";
import { ChartData, Doughnut } from "react-chartjs-2";

interface Props {
  data: number[];
  color: string[];
  title: string;
}

export function DoughnutChart({ data, color, title = "" }: Props): JSX.Element {
  const chartData: ChartData<chartjs.ChartData> = {
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
    },
    responsive: true,
    title: { text: title, display: true, padding: 15, fontSize: 14 },
  };

  return <Doughnut data={chartData} options={chartOptions} />;
}
