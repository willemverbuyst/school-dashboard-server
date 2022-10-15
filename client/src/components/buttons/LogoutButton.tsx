import { Button } from 'antd'
import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { useLogout } from '../../hooks/'

export default function LogoutButton(): ReactElement {
  const history = useHistory()
  const logout = useLogout()

  const handleLogOut = async () => {
    await logout()
    history.push('/')
  }

  return <Button onClick={handleLogOut}>Logout</Button>
}
