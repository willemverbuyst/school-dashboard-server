import { Button } from 'antd'
import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/'

export default function LogoutButton(): ReactElement {
  const history = useHistory()
  const { logout } = useAuth()

  const handleLogOut = () => {
    logout()
    history.push('/')
  }

  return <Button onClick={handleLogOut}>Logout</Button>
}
