import { BarChart } from "../../../components/charts";

interface Subject {
  name: string;
  id: number;
}

interface Props {
  averages: number[];
  subjects: Subject[];
}

export function BarChartMain({ averages, subjects }: Props): JSX.Element {
  const subjectLabel = subjects.map((subject) => subject.name);
  const color: string[] = [];
  for (let i = 0; i < averages.length; i++) color.push("#008080");

  return (
    <BarChart
      data={averages}
      labels={subjectLabel}
      color={color}
      title={"AVERAGE SCORE PER SUBJECT"}
      max={100}
    />
  );
}
