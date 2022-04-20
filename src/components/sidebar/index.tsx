import SidebarForStudent from '../../pages/student/sidebar'
import SidebarForTeacher from '../../pages/teacher/sidebar'
import { ReactElement } from 'react'
import { useUser } from '../../hooks'

export default function Sidebar(): ReactElement | null {
	const { user } = useUser()
	const role = user?.data.user.role

	return !user ? null : role === 'STUDENT' ? (
		<SidebarForStudent />
	) : (
		<SidebarForTeacher />
	)
}
