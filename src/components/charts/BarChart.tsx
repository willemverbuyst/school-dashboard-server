import { ReactElement } from 'react'
import * as chartjs from 'chart.js'
import { Bar, ChartData } from 'react-chartjs-2'

interface IInputBarChart {
  labels: string[]
  data: number[]
  color: string[]
  title: string
  max: number
}

export default function BarChart({
  labels,
  data,
  color,
  title,
  max,
}: IInputBarChart): ReactElement {
  const chartData: ChartData<chartjs.ChartData> = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: color,
        borderWidth: 0,
      },
    ],
  }
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
            maxTicksLimit: 10,
            beginAtZero: true,
            stepSize: 1,
            suggestedMax: max,
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
  }

  return <Bar data={chartData} options={chartOptions} />
}
