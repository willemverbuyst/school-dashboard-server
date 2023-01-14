import { DoughnutChart } from "../../../components/charts";

interface Props {
  averages: number[];
}

export function DoughnutChartMain({ averages }: Props): JSX.Element {
  const generalScore = Math.round(
    averages.reduce((a, b) => a + b * 1, 0) / averages.length
  );
  return generalScore ? (
    <DoughnutChart
      data={[generalScore, 100 - generalScore]}
      color={["#8F1CB8", "#eee"]}
      title={`YOUR HAVE A GENERAL SCORE OF ${generalScore}%`}
    />
  ) : (
    <p>YOU DON'T HAVE ENOUGH DATA YET TO DISPLAY AVERAGE</p>
  );
}
