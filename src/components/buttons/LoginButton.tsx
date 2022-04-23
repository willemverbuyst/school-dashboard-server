import { Button } from 'antd'
import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

export default function LogoutButton(): ReactElement {
  const history = useHistory()

  const goTo = () => {
    history.push('/login')
  }

  return <Button onClick={goTo}>Login</Button>
}
