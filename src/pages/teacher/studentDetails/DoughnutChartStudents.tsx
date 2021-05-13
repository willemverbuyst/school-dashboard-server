import React, { ReactElement, useState } from 'react';
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

const DoughnutChartStudent: React.FC<IProps> = ({
  results,
}: IProps): ReactElement => {
  const [selectionAverage, setSelectionAverage] = useState('name');
  const [selectSubjectAverage, setSelectSubjectAverage] = useState('');

  const sortedResults =
    selectionAverage === 'name'
      ? [...results].sort((a, b) => a.name.localeCompare(b.name))
      : [...results].sort((a, b) => b.score - a.score);

  const filteredResults = selectSubjectAverage
    ? sortedResults.filter((result) => result.name === selectSubjectAverage)
    : sortedResults;

  return (
    <>
      <SortAndSelect
        title="AVERAGE GRADES"
        radio1="Name"
        radio2="Average"
        onChangeRadio={setSelectionAverage}
        value={selectSubjectAverage || undefined}
        onChangeSelection={setSelectSubjectAverage}
        results={results}
        selectStudentData={selectSubjectAverage}
        onClick={() => setSelectSubjectAverage('')}
        placeholder="Select a subject"
        textBtn="All subjects"
      />
      <Row justify={'space-around'}>
        {filteredResults.map(({ score, name }, i) => (
          <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
            <DoughnutChart
              data={[score, 100 - score]}
              color={['#8F1CB8', '#eee']}
              title={`${name} ${score}%`}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default DoughnutChartStudent;
