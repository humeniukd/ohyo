import React, { FC, useEffect, useState } from 'react'
import { uploadFileToS3 } from 'api'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TranscodingProgress } from './TranscodingProgress'
import {PresignedPostData} from 'types'

type Props = {
  file: File,
  data: PresignedPostData
}

export const UploadProgress: FC<Props> = ({ file, data }) => {

  const [progress, setProgress] = useState(0)

    useEffect(() => {
        data && uploadFileToS3(data, file, setProgress)
    }, [file, data])

  return <>
    <LinearProgress variant="determinate" value={progress} />
    <br/>
    { progress === 100 && <TranscodingProgress uid={data!.key} /> }
  </>
}
