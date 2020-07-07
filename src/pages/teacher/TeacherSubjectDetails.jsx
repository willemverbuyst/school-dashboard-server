import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DoughnutChart from '../../components/charts/DoughnutChart';
import BarChartTest from '../../components/charts/BarChartTest';
import SortAndSelect from '../../components/SortAndSelect';
import { getSubjectForOverview } from '../../store/overviewTeacher/actions';
import { selectSubjectOverview } from '../../store/overviewTeacher/selectors';
import {
  selectTeacherStudents,
  selectTeacherToken,
} from '../../store/teacher/selectors';

import { Layout, Row, Col, Radio } from 'antd';

const { Content } = Layout;

export default function TeacherSubjectDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectTeacherToken);
  const { subjectid } = useParams();
  const results = useSelector(selectSubjectOverview);
  const students = useSelector(selectTeacherStudents);
  const [selectionAverage, setSelectionAverage] = useState('name');
  const [selectionTests, setSelectionTests] = useState('name');
  const [selectStudentAverage, setSelectStudentAverage] = useState('');
  const [selectStudentTests, setSelectStudentTests] = useState('');

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getSubjectForOverview(subjectid));
  }, [dispatch, subjectid]);

  const renderCharts = () => {
    const sortedResults =
      selectionAverage === 'name'
        ? [...results].sort((a, b) => a.name.localeCompare(b.name))
        : [...results].sort((a, b) => b.score - a.score);

    const filteredResults = selectStudentAverage
      ? sortedResults.filter((result) => result.name === selectStudentAverage)
      : sortedResults;

    return filteredResults.map(({ score, name }, i) => (
      <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
        <DoughnutChart
          data={[score, 100 - score]}
          color={['#008080', '#eee']}
          title={`${name} ${score}%`}
        />
      </Col>
    ));
  };

  const renderTestsBar = () => {
    const sortedResults =
      selectionTests === 'name'
        ? [...results].sort((a, b) => a.name.localeCompare(b.name))
        : [...results].sort((a, b) => b.tests - a.tests);

    const filteredResults = selectStudentTests
      ? sortedResults.filter((result) => result.name === selectStudentTests)
      : sortedResults;

    return filteredResults.map(({ tests, name }, i) => (
      <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
        <BarChartTest
          data={[tests]}
          color={['#008080']}
          labels={[`${name}: ${tests} tests`]}
          title={''}
          max={20}
        />
      </Col>
    ));
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          {results ? (
            <SortAndSelect
              title="AVERAGE GRADES"
              radio1="Name"
              radio2="Average"
              onChangeRadio={setSelectionAverage}
              value={selectStudentAverage || undefined}
              onChangeSelection={setSelectStudentAverage}
              results={results}
              selectStudentAverage={selectStudentAverage}
              onClick={() => setSelectStudentAverage('')}
            />
          ) : null}
          <Row justify={'space-around'}>
            {results && students ? renderCharts() : null}
          </Row>
          {results ? (
            <SortAndSelect
              title="TESTS DONE"
              radio1="Name"
              radio2="Amount"
              onChangeRadio={setSelectionTests}
              value={selectStudentTests || undefined}
              onChangeSelection={setSelectStudentTests}
              results={results}
              selectStudentAverage={selectStudentTests}
              onClick={() => setSelectStudentTests('')}
            />
          ) : null}
          <Row justify={'space-around'}>
            {results && students ? renderTestsBar() : null}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
