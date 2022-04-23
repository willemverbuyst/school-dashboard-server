import { Layout } from 'antd'
import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../hooks'
import { LoginButton, LogoutButton } from '../buttons'

const { Header } = Layout

export default function BarAtThetop(): ReactElement {
  const { user } = useUser()

  const renderLoginLogout = (): ReactElement => {
    return user ? <LogoutButton /> : <LoginButton />
  }

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
      }}
      className="header"
    >
      <Link
        style={{
          color: '#fff',
          fontFamily: 'Sriracha',
          fontSize: '2rem',
          transform: 'rotate(-5deg)',
        }}
        to="/"
      >
        Dashboard
      </Link>
      <div>{renderLoginLogout()}</div>
    </Header>
  )
}
