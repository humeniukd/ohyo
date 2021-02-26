import React, { FC, useEffect, useState } from 'react'
import { getTranscoding } from 'api'
import LinearProgress from '@material-ui/core/LinearProgress'
import { useTranscoding } from './hooks/useTranscoding'

type Props = {
  uid: string
}

export const TranscodingProgress: FC<Props> = ({ uid }) => {
  const [percentage, setPercentage] = useState(0)
  useTranscoding(uid)

  const tick = async () => {
    console.log('tick')
    const { data: { status, percentage } } = await getTranscoding({ uid })
    if (status === 'failure') throw 'failure'
    percentage && setPercentage(percentage)
  }

  useEffect(() => {
    const interval = setInterval(tick, 2000)
    if (percentage === 100) clearInterval(interval)
    return function cleanup() {
      clearInterval(interval)
    }
  }, [percentage, tick])

  return <>
    <LinearProgress variant="determinate" color="secondary" value={percentage} />
  </>
}
