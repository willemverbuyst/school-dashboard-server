import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import StudentMainPage from './pages/student/StudentMainPage';
import StudentDoTest from './pages/student/StudentDoTest';
import StudentSubjectDetails from './pages/student/StudentSubjectDetails';
import TeacherMainPage from './pages/teacher/TeacherMainPage';
import TeacherStudentDetails from './pages/teacher/TeacherStudentDetails';
import TeacherSubjectDetails from './pages/teacher/TeacherSubjectDetails';
import AddQuestionForm from './pages/teacher/AddQuestionForm';
import ListOfQuestions from './pages/teacher/ListOfQuestions';

import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/students/:studentid" component={StudentMainPage} />
        <Route
          exact
          path="/students/:studentid/subjects/:subjectid"
          component={StudentSubjectDetails}
        />
        <Route
          exact
          path="/students/:studentid/subjects/:subjectid/test"
          component={StudentDoTest}
        />
        <Route exact path="/teachers/:teacherid" component={TeacherMainPage} />
        <Route
          exact
          path="/teachers/:teacherid/students/:studentsid"
          component={TeacherStudentDetails}
        />
        <Route
          exact
          path="/teachers/:teacherid/subjects/:subjectid"
          component={TeacherSubjectDetails}
        />
        <Route
          exact
          path="/teachers/:teacherid/questions/add"
          component={AddQuestionForm}
        />
        <Route
          exact
          path="/teachers/:teacherid/questions/list"
          component={ListOfQuestions}
        />
      </Switch>
    </div>
  );
}

export default App;
