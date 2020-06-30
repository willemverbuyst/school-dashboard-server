import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStudentId } from '../store/student/selectors';
import ChartHomePage from '../components/charts/ChartHomePage';

export default function Home() {
  const history = useHistory();
  const studentId = useSelector(selectStudentId);

  useEffect(() => {
    if (studentId) {
      history.push(`/students/${studentId}`);
    }

    // make same logic happen for teacher
  });

  return (
    <div>
      Home
      <ChartHomePage />
    </div>
  );
}
