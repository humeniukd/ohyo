import React, {useCallback, useState} from 'react'
import { ImageCrop } from './index'
import {Dialog, DialogTitle} from "@material-ui/core";

export default {
  title: 'ImageCrop',
}

export const Preview = () => {

  const [uploadedFile, setUploadedFile] = useState<File>()
  const [croppedImageUrl, setCroppedImageUrl] = useState()
  const [isOpen, setIsOpen] = useState(false)

  const handleChoose = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target?.files?.[0]) {
          setUploadedFile(event.target.files[0])
          setIsOpen(true)
        }
      },
      [setUploadedFile, setIsOpen],
  )

  const onCrop = (url) => {
      setCroppedImageUrl(url)
      setIsOpen(false)
  }
  return <>
    <Dialog open={isOpen}>
      <DialogTitle>Set backup account</DialogTitle>
      <ImageCrop
        file={uploadedFile}
        onCrop={onCrop}
      />
    </Dialog>
      {!croppedImageUrl ? (<label>
      <input type="file"
             accept="*"
             onChange={handleChoose}
      />
    </label>) : (!isOpen && (
        <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
    ))}
  </>
}
