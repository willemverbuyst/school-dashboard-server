import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'

export default function LogoutButton(): ReactElement {
  const history = useHistory()

  const goTo = () => {
    history.push('/login')
  }

  return <Button onClick={goTo}>Login</Button>
}
