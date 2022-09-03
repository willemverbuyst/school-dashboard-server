import { Spin } from 'antd'
import { ReactElement } from 'react'
import { useIsFetching, useIsMutating } from 'react-query'

export default function Spinner(): ReactElement | null {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  return isFetching || isMutating ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '1rem',
      }}
    >
      <Spin
        style={{
          color: '#fff',
          transition: '.6 ease-in-out',
          zIndex: 1000,
        }}
      />
    </div>
  ) : null
}
