import DoughnutChartMain from './DoughnutChartMain';
import BarChartMain from './BarChartMain';
import PolarChartMain from './PolarChartMain';
import { Row, Col } from 'antd';
import { ReactElement } from 'react';

interface ISubject {
  name: string;
  id: number;
}

interface IResult {
  at: string;
  result: number;
  subject: number;
}

interface IProps {
  subjects: ISubject[];
  results: IResult[];
}

const AllCharts: React.FC<IProps> = ({
  subjects,
  results,
}: IProps): ReactElement => {
  const subjectIds: number[] = subjects.map((subject: ISubject) => subject.id);
  const subjectSorted: IResult[][] = subjectIds.map((id) =>
    results.filter((result: IResult) => result.subject === id)
  );
  const averages: number[] = subjectSorted.map((subject) =>
    Math.round(
      (subject.reduce((a, b) => a + b.result * 1, 0) / (subject.length * 3)) *
        100
    )
  );

  return (
    <>
      <Row justify="space-around">
        <Col style={{ width: 450, paddingBottom: 80 }}>
          <DoughnutChartMain averages={averages} />
        </Col>
        <Col style={{ width: 450, paddingBottom: 80 }}>
          <BarChartMain averages={averages} subjects={subjects} />
        </Col>
      </Row>
      <Row justify="center">
        <Col style={{ width: 650 }}>
          <PolarChartMain subjectSorted={subjectSorted} subjects={subjects} />
        </Col>
      </Row>
    </>
  );
};

export default AllCharts;
