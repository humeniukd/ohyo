import React, {FC, useCallback, useState} from 'react'
import { Layout } from 'components/Layout'
import { FilePicker } from 'components/FilePicker'
import { UploadProgress } from './UploadProgress'
import { TrackDetails } from './TrackDetails'
import { useUploadPolicy } from './hooks'
import Grid from '@material-ui/core/Grid'
import { ImageChooser } from 'components/ImageChooser'
import { useStyles } from './styled'
import { artwork } from 'api'

export const Upload: FC = () => {

  const [uploadedFile, setUploadedFile] = useState<File>()
  const { data } = useUploadPolicy()
  const { grid } = useStyles()
  const handlePick = useCallback(
    (file) => {
      setUploadedFile(file)
    },
      [uploadedFile],
  )

  const onArtworkSave = async (file: Blob) => {
    const res = await artwork('872d21ea84f5c74119757357e48c6559', file)
    console.log('asdf', res)
  }

  return <Layout>
    <Grid
        spacing={4}
        alignItems="center"
        justify="center"
        container
        className={grid}
    >
    {uploadedFile ? <>
      <UploadProgress data={data!} file={uploadedFile} />
      <ImageChooser onSave={onArtworkSave} />
      <TrackDetails key={data?.key} />
    </> : <FilePicker pick={handlePick} />}
    </Grid>
  </Layout>
}
