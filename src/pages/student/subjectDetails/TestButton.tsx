import { Button, Col } from 'antd';
import { ReactElement } from 'react';

interface IProp {
  goTo: () => void;
}

const TestButton: React.FC<IProp> = ({ goTo }: IProp): ReactElement => {
  return (
    <Col
      style={{
        width: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60,
      }}
    >
      <Button
        shape="circle"
        onClick={goTo}
        style={{
          height: 120,
          width: 120,
          border: '2px solid #B81D9D',
          color: '#B81D9D',
          fontSize: '1.4rem',
        }}
      >
        Take a test
      </Button>
    </Col>
  );
};

export default TestButton;
