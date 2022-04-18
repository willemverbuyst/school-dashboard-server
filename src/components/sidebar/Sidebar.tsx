import StudentSidebar from '../../pages/student/sidebar'
import TeacherSidebar from '../../pages/teacher/TeacherSidebar'
import { ReactElement } from 'react'
import { useUser } from '../../hooks'

const SideBar = (): ReactElement | null => {
	const { user } = useUser()
	const role = user?.data.user.role

	return !user ? null : role === 'STUDENT' ? (
		<StudentSidebar />
	) : (
		<TeacherSidebar />
	)
}

export default SideBar
