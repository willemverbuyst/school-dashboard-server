import PolarChart from '../../../components/charts/PolarChart';

interface IResult {
  at: string;
  result: number;
  subject: number;
}

interface ISubject {
  name: string;
  id: number;
}

interface IProps {
  subjectSorted: IResult[][];
  subjects: ISubject[];
}

const PolarChartMain = ({ subjectSorted, subjects }: IProps) => {
  const data: number[] = [];
  subjectSorted.forEach((subject) => data.push(subject.length));
  const labels = subjects.map((subject) => subject.name);
  // https://stackoverflow.com/questions/1152024/best-way-to-generate-a-random-color-in-javascript/1152508
  const color: string[] = [];
  subjectSorted.forEach((subject) =>
    color.push(
      '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    )
  );
  return (
    <PolarChart
      data={data}
      labels={labels}
      color={color}
      title={`You have done a total of ${
        subjectSorted.flat().length
      } tests so far`.toUpperCase()}
    />
  );
};

export default PolarChartMain;
