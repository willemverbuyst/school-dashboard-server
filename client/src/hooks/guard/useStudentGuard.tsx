import { useHistory } from 'react-router-dom'
import { useUser } from '../auth'

export const useStudentGuard = () => {
  const history = useHistory()
  const { user } = useUser()

  const studentGuard = () => {
    if (user?.token === null || user?.data?.user?.role !== 'STUDENT') {
      history.push('/')
    }
  }

  return { studentGuard }
}
