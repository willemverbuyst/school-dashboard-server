import { Spin } from 'antd';
import { ReactElement } from 'react';

const Spinner = (): ReactElement => {
  return (
    <Spin
      style={{
        transform: 'translate(-50%,-50%) scale(5)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        opacity: '.3',
        transition: '.2s ease-in-out',
      }}
    />
  );
};

export default Spinner;
