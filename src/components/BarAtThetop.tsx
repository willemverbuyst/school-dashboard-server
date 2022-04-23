import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import { useUser } from '../hooks'
import { LogoutButton, LoginButton } from './buttons'

const { Header } = Layout

const BarAtThetop = (): ReactElement => {
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

export default BarAtThetop
