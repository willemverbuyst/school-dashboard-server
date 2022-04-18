import { ReactElement } from 'react';
import { Col } from 'antd';

interface IResult {
  at: string;
  result: number;
  subject: number;
}

interface IProps {
  results: IResult[];
}

const NumberOfTests: React.FC<IProps> = ({ results }: IProps): ReactElement => {
  return (
    <Col
      style={{
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60,
      }}
    >
      <div style={{ fontSize: '1.4rem' }}>You have done</div>
      <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>
        {results.length}
      </div>
      <div style={{ fontSize: '1.4rem' }}>tests so far</div>
    </Col>
  );
};

export default NumberOfTests;
