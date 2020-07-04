import React from 'react';
import styled from 'styled-components';

export default function DoTestButton({ text, onClick }) {
  return <ToTestBtn onClick={onClick}>{text}</ToTestBtn>;
}

const ToTestBtn = styled.div`
  width: 10rem;
  height: 10rem;
  color: #333;
  border: 1px solid #333;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
