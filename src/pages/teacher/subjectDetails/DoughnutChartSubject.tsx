import { ReactElement, useState } from 'react';
import { Col, Row } from 'antd';
import DoughnutChart from '../../../components/charts/DoughnutChart';
import SortAndSelect from '../../../components/SortAndSelect';

interface ISubject {
  name: string;
  score: number;
  subjectId: number;
  tests: number;
}

interface IProps {
  results: ISubject[];
}

const DoughnutChartSubject = ({ results }: IProps): ReactElement => {
  const [selectionAverage, setSelectionAverage] = useState('name');
  const [selectStudentAverage, setSelectStudentAverage] = useState('');

  const sortedResults =
    selectionAverage === 'name'
      ? [...results].sort((a, b) => a.name.localeCompare(b.name))
      : [...results].sort((a, b) => b.score - a.score);

  const filteredResults = selectStudentAverage
    ? sortedResults.filter((result) => result.name === selectStudentAverage)
    : sortedResults;

  return (
    <>
      <SortAndSelect
        title="AVERAGE GRADES"
        radio1="Name"
        radio2="Average"
        onChangeRadio={setSelectionAverage}
        value={selectStudentAverage || undefined}
        onChangeSelection={setSelectStudentAverage}
        results={results}
        selectStudentData={selectStudentAverage}
        onClick={() => setSelectStudentAverage('')}
        placeholder="Select a student"
        textBtn="All students"
      />
      <Row justify={'space-around'}>
        {filteredResults.map(({ score, name }, i) => (
          <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
            <DoughnutChart
              data={[score, 100 - score]}
              color={['#008080', '#eee']}
              title={`${name} ${score}%`}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default DoughnutChartSubject;
