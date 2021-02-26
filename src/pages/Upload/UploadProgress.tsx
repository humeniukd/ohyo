import React, { FC, useEffect, useState } from 'react'
import { uploadFileToS3 } from 'api'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TranscodingProgress } from './TranscodingProgress'
import { PresignedPostData } from 'types'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './styled'
import {Box} from "@material-ui/core";

type Props = {
  file: File,
  data: PresignedPostData
}

export const UploadProgress: FC<Props> = ({ file, data }) => {
  const { grid } = useStyles()

  const [progress, setProgress] = useState(0)

    useEffect(() => {
        data && uploadFileToS3(data, file, setProgress)
    }, [file, data])

  return <>
    <Grid
        alignItems="center"
        justify="center"
        container
        className={grid}
    >
      <Box width="50%">
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box width="50%">
        { progress === 100 && <TranscodingProgress uid={data!.key} /> }
      </Box>
    </Grid>
  </>
}
