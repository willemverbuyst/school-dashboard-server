import { Col } from "antd";
import { PieChart } from "../../../components/charts";

interface Test {
  subjectId: number;
  scores: number;
  at: string;
}

interface Props {
  tests: Test[];
}

export function PieChartMain({ tests }: Props): JSX.Element {
  const reducedTests: number[] = tests.map((test) => test.scores);
  const counts: { [key: string]: number } = {
    "0/3": 0,
    "1/3": 0,
    "2/3": 0,
    "3/3": 0,
  };
  reducedTests.forEach((num) => {
    counts[`${num}/3`] += 1;
  });

  return (
    <Col style={{ width: 450, paddingBottom: 80 }}>
      {tests.length ? (
        <PieChart
          data={Object.values(counts)}
          color={["#EEE", "#B81D9D", "#D222E1", "#8F1CB8"]}
          title={"TESTS"}
          labels={Object.keys(counts)}
        />
      ) : (
        <p>THERE IS NOT ENOUGH DATA YET TO DISPLAY PIE CHART</p>
      )}
    </Col>
  );
}
