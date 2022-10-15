import { useHistory } from 'react-router-dom'
import { useUser } from '../auth'

export const useTeacherGuard = (): { teacherGuard: () => void } => {
  const history = useHistory()
  const { user } = useUser()

  const teacherGuard = (): void => {
    if (user?.token === null || user?.data?.user?.role !== 'TEACHER') {
      history.push('/')
    }
  }

  return { teacherGuard }
}
