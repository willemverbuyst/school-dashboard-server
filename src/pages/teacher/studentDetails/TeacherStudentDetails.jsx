import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DoughnutChart from '../../../components/charts/DoughnutChart';
import SortAndSelect from '../../../components/SortAndSelect';
import { getStudentForOverview } from '../../../store/overviewTeacher/actions';
import { selectStudentOverview } from '../../../store/overviewTeacher/selectors';
import {
  selectTeacherSubjects,
  selectTeacherToken,
} from '../../../store/teacher/selectors';

import { Layout, Row, Col } from 'antd';
import BarChartTestsStudent from './BarChartTestsStudents';
const { Content } = Layout;

export default function TeacherStudentDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectTeacherToken);
  const { studentid } = useParams();
  const results = useSelector(selectStudentOverview);
  const subjects = useSelector(selectTeacherSubjects);
  const [selectionAverage, setSelectionAverage] = useState('name');

  const [selectSubjectAverage, setSelectSubjectAverage] = useState('');

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getStudentForOverview(studentid));
  }, [dispatch, studentid]);

  const renderCharts = () => {
    const sortedResults =
      selectionAverage === 'name'
        ? [...results].sort((a, b) => a.name.localeCompare(b.name))
        : [...results].sort((a, b) => b.score - a.score);

    const filteredResults = selectSubjectAverage
      ? sortedResults.filter((result) => result.name === selectSubjectAverage)
      : sortedResults;

    return filteredResults.map(({ score, name }, i) => (
      <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
        <DoughnutChart
          data={[score, 100 - score]}
          color={['#8F1CB8', '#eee']}
          title={`${name} ${score}%`}
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
              value={selectSubjectAverage || undefined}
              onChangeSelection={setSelectSubjectAverage}
              results={results}
              selectStudentData={selectSubjectAverage}
              onClick={() => setSelectSubjectAverage('')}
              placeholder="Select a subject"
              textBtn="All subjects"
            />
          ) : null}
          <Row justify={'space-around'}>
            {results && subjects ? renderCharts() : null}
          </Row>

          {results ? <BarChartTestsStudent resutls={results} /> : null}
        </Content>
      </Layout>
    </Layout>
  );
}
