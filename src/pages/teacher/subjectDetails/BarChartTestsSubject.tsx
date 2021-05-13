import React, { ReactElement, useState } from 'react';
import { Col, Row } from 'antd';
import BarChartTest from '../../../components/charts/BarChartTest';
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

const BarChartTestsSubject: React.FC<IProps> = ({
  results,
}: IProps): ReactElement => {
  const [selectionTests, setSelectionTests] = useState('name');
  const [selectStudentTests, setSelectStudentTests] = useState('');

  const sortedResults =
    selectionTests === 'name'
      ? [...results].sort((a, b) => a.name.localeCompare(b.name))
      : [...results].sort((a, b) => b.tests - a.tests);

  const filteredResults = selectStudentTests
    ? sortedResults.filter((result) => result.name === selectStudentTests)
    : sortedResults;

  return (
    <>
      <SortAndSelect
        title="TESTS DONE"
        radio1="Name"
        radio2="Amount"
        onChangeRadio={setSelectionTests}
        value={selectStudentTests || undefined}
        onChangeSelection={setSelectStudentTests}
        results={results}
        selectStudentData={selectStudentTests}
        onClick={() => setSelectStudentTests('')}
        placeholder="Select a student"
        textBtn="All students"
      />
      <Row justify={'space-around'}>
        {filteredResults.map(({ tests, name }, i) => (
          <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
            <BarChartTest
              data={[tests]}
              color={['#008080']}
              labels={[`${name}: ${tests} tests`]}
              title={''}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default BarChartTestsSubject;
