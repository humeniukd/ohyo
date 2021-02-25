import React, { FC, useCallback, useState } from 'react'
import { Box, Dialog, DialogTitle } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { ImageCrop } from '../ImageCrop'
import { useStyles } from './styled'
import {FilePicker} from "../FilePicker";

type Props = {
  onSave: (file: Blob) => void
}

export const ImageChooser: FC<Props> = ({ onSave }) => {
  const [pickedFile, setPickedFile] = useState<File>()
  const [imageUrl, setImageUrl] = useState<string>()
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const { box, img, label } = useStyles()

  const handleChoose = useCallback(
      (f: File) => {
          setPickedFile(f)
          setIsOpen(true)
      },
      [pickedFile],
  )

  const onCrop = useCallback(async blob => {
    if (!blob) return
    await onSave(blob)
    setIsOpen(false)
    imageUrl && window.URL.revokeObjectURL(imageUrl!);
    const tmp = window.URL.createObjectURL(blob);
    setImageUrl(tmp)
  }, [isOpen])
  return <>
    <Dialog open={isOpen}>
      <DialogTitle>Upload image</DialogTitle>
      <ImageCrop
        file={pickedFile!}
        onCrop={onCrop}
      />
    </Dialog>
    <Box className={box}>
      <FilePicker text={t('UPDATE IMAGE')} classes={`${label}`} pick={handleChoose} />
      {imageUrl && !isOpen && (
        <Box className={img} style={{ backgroundImage: `url(${imageUrl})` }} />
      )}
    </Box>
  </>
}
