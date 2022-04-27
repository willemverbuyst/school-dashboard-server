import { useHistory } from 'react-router-dom'
import { useUser } from '../auth'

export const useLoggedInGuard = () => {
  const history = useHistory()
  const { user } = useUser()
  const roleForUrl = user?.data.user.role?.toLowerCase() + 's'

  const loggedInGuard = () => {
    if (user && user.token !== null) {
      history.push(`/${roleForUrl}/${user?.data.user.id}`)
    }
  }

  return { loggedInGuard }
}
