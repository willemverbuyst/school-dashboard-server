import React from 'react';
import StudentSidebar from '../pages/student/StudentSidebar';
import TeacherSidebar from '../pages/teacher/TeacherSidebar';

export default function SideBar() {
  const student = null;
  const teacher = 'piet';
  // const teacher = null;
  // const student = 'sjaak';

  return student ? <StudentSidebar /> : teacher ? <TeacherSidebar /> : null;
}
