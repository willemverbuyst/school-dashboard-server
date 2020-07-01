import React from 'react';
import { useSelector } from 'react-redux';
import { selectStudentName } from '../store/student/selectors';
import { selectTeacherName } from '../store/teacher/selectors';
import StudentSidebar from '../pages/student/StudentSidebar';
import TeacherSidebar from '../pages/teacher/TeacherSidebar';

export default function SideBar() {
  const student = useSelector(selectStudentName);
  const teacher = useSelector(selectTeacherName);

  return student ? <StudentSidebar /> : teacher ? <TeacherSidebar /> : null;
}
