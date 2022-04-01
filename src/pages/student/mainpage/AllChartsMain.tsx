import DoughnutChartMain from './DoughnutChartMain';
import BarChartMain from './BarChartMain';
import PolarChartMain from './PolarChartMain';
import { Row, Col } from 'antd';
import { ReactElement } from 'react';

const AllCharts: React.FC<any> = ({ subjects, results }: any): ReactElement => {
  const subjectIds: number[] = subjects.map((subject) => subject.id);

  const subjectSorted = subjectIds.map((id) =>
    results.filter((result) => result.subject.id === id)
  );

  const averages: number[] = subjectSorted.map((subject) =>
    Math.round(
      (subject.reduce((a, b) => a + b.score * 1, 0) / (subject.length * 3)) *
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
