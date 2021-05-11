import { ReactElement } from 'react';
import DoughnutChart from '../../../components/charts/DoughnutChart';

interface IResult {
  at: string;
  result: number;
  subject: number;
}

interface IProps {
  results: IResult[];
}

const DoughnutChartDetails: React.FC<IProps> = ({
  results,
}: IProps): ReactElement => {
  const data = results.map(({ result }) => result);
  const average = Math.round(
    (data.reduce((a, b) => a + b, 0) / (data.length * 3)) * 100
  );
  const color = ['#A026FF', '#eee'];

  return (
    <DoughnutChart
      color={color}
      data={[average, 100 - average]}
      title={`YOUR AVERAGE IS ${average}%`}
    />
  );
};

export default DoughnutChartDetails;
