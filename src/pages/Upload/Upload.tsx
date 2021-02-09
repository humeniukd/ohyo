import React, {FC, useCallback, useState} from 'react'
import { Layout } from "components/Layout";
import {FilePicker} from "components/FilePicker";
import {UploadProgress} from "./UploadProgress";
import {TrackDetails} from "./TrackDetails";
import {useUploadPolicy} from "./hooks";

export const Upload: FC = () => {

  const [uploadedFile, setUploadedFile] = useState<File>()
  const { data } = useUploadPolicy()
  const handlePick = useCallback(
    (file) => {
      setUploadedFile(file)
    },
      [uploadedFile],
  )

  return <Layout>
    {uploadedFile ? <>
      <UploadProgress data={data!} file={uploadedFile} />
      <TrackDetails key={data?.key} />
    </> : <FilePicker pick={handlePick} />}
  </Layout>
}
