import { Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { Login } from "./pages/auth/login";
import { Signup } from "./pages/auth/signup";
import { Home } from "./pages/home";
import { StudentMainPage } from "./pages/student//mainpage";
import { StudentSubject } from "./pages/student/subject";
import { StudentTest } from "./pages/student/test";
import { AddQuestionForm } from "./pages/teacher/admin/questions/form";
import { ListOfQuestions } from "./pages/teacher/admin/questions/list";
import { NewSubjectForm } from "./pages/teacher/admin/subjects/form";
import { TeacherMainPage } from "./pages/teacher/mainpage";
import { TestResultsForStudent } from "./pages/teacher/testResultsForStudent";
import { TestResultsForSubject } from "./pages/teacher/testResultsForSubject";

export function AppRouter(): JSX.Element {
  return (
    <Switch>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route exact path={ROUTES.LOG_IN} component={Login} />
      <Route exact path={ROUTES.SIGN_UP} component={Signup} />
      <Route exact path={ROUTES.STUDENT_MAIN} component={StudentMainPage} />
      <Route exact path={ROUTES.STUDENT_SUBJECTS} component={StudentSubject} />
      <Route exact path={ROUTES.STUDENT_TEST} component={StudentTest} />
      <Route exact path={ROUTES.TEACHER_MAIN} component={TeacherMainPage} />
      <Route
        exact
        path={ROUTES.TEACHER_STUDENT}
        component={TestResultsForStudent}
      />
      <Route
        exact
        path={ROUTES.TEACHER_SUBJECT}
        component={TestResultsForSubject}
      />
      <Route
        exact
        path={ROUTES.TEACHER_QUESTIONS_LIST}
        component={ListOfQuestions}
      />
      <Route
        exact
        path={ROUTES.TEACHER_QUESTION_ADD}
        component={AddQuestionForm}
      />
      <Route
        exact
        path={ROUTES.TEACHER_SUBJECT_ADD}
        component={NewSubjectForm}
      />
    </Switch>
  );
}
