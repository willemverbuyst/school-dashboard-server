import { Spin } from 'antd'
import { ReactElement } from 'react'
import { useIsFetching, useIsMutating } from 'react-query'

export default function Spinner(): ReactElement | null {
	const isFetching = useIsFetching()
	const isMutating = useIsMutating()

	return isFetching || isMutating ? (
		<Spin
			style={{
				transform: 'translate(-50%,-50%) scale(5)',
				position: 'absolute',
				top: '50%',
				left: '50%',
				opacity: '.3',
				transition: '.2s ease-in-out',
			}}
		/>
	) : null
}
