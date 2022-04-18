import { Switch, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import TeacherMainPage from './pages/teacher/mainpage'
import TeacherStudent from './pages/teacher/student'
import TeacherSubject from './pages/teacher/subject'
import ListOfQuestions from './pages/teacher/admin/questions/ListOfQuestions'
import AddQuestionForm from './pages/teacher/admin/questions/AddQuestionForm'
import NewSubjectForm from './pages/teacher/admin/subjects/NewSubjectForm'
import * as ROUTES from './constants/routes'
import StudentMainPage from './pages/student//mainpage'
import StudentSubject from './pages/student/subject'
import StudentTest from './pages/student/test'

const AppRouter = (): JSX.Element => {
	return (
		<Switch>
			<Route exact path={ROUTES.HOME} component={Home} />
			<Route exact path={ROUTES.LOG_IN} component={Login} />
			<Route exact path={ROUTES.SIGN_UP} component={Signup} />
			<Route exact path={ROUTES.STUDENT_MAIN} component={StudentMainPage} />
			<Route exact path={ROUTES.STUDENT_SUBJECTS} component={StudentSubject} />
			<Route exact path={ROUTES.STUDENT_TEST} component={StudentTest} />
			<Route exact path={ROUTES.TEACHER_MAIN} component={TeacherMainPage} />
			<Route exact path={ROUTES.TEACHER_STUDENT} component={TeacherStudent} />
			<Route exact path={ROUTES.TEACHER_SUBJECT} component={TeacherSubject} />
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
	)
}

export default AppRouter
