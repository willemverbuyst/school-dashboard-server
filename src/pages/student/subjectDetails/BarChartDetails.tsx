import BarChart from '../../../components/charts/BarChart';
import moment from 'moment';
import { Row, Col, Radio } from 'antd';
import { ReactElement, useState } from 'react';

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
  results: IResult[];
  subjects: ISubject[];
  subjectId: string;
}

const BarChartDetails: React.FC<IProps> = ({
  results,
  subjects,
  subjectId,
}: IProps): ReactElement => {
  const [radio, setRadio] = useState('date');

  const subject = subjects.filter(
    (subject) => subject.id === Number(subjectId)
  )[0].name;

  const sortedData =
    radio === 'date'
      ? results.sort(
          (a, b) => new Date(a.at).getDate() - new Date(b.at).getDate()
        )
      : radio === 'lowestFirst'
      ? results.sort((a, b) => a.result - b.result)
      : radio === 'highestFirst'
      ? results.sort((a, b) => b.result - a.result)
      : results;

  const data = sortedData.map(({ result }) => result);
  const color: Array<string> = [];
  for (let i = 0; i < results.length; i++) color.push('rgb(255, 99, 132)');
  const labels = results.map(({ at }) => moment(at).format('MMM Do YY'));

  return (
    <>
      <Row justify="center">
        <Col style={{ width: 650 }}>
          <BarChart
            data={data}
            color={color}
            labels={labels}
            title={`RESULTS FOR YOUR ${subject.toUpperCase()} TESTS`}
            max={3}
          />
        </Col>
      </Row>
      <Row style={{ paddingTop: 15 }} justify="center">
        <Radio.Group size="small" onChange={(e) => setRadio(e.target.value)}>
          <Radio.Button style={{ marginRight: 5 }} value="date">
            Scores by date
          </Radio.Button>
          <Radio.Button style={{ marginRight: 5 }} value="lowestFirst">
            Scores Low to High
          </Radio.Button>
          <Radio.Button style={{ marginRight: 5 }} value="highestFirst">
            Scores High to Low
          </Radio.Button>
        </Radio.Group>
      </Row>
    </>
  );
};

export default BarChartDetails;
