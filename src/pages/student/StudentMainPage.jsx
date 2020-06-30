import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStudentToken } from '../../store/student/selectors';
import Chart from '../../components/charts/Chart';

export default function StudentMainPage() {
  const history = useHistory();
  const token = useSelector(selectStudentToken);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  return (
    <div>
      Student main page
      <Chart />
    </div>
  );
}
