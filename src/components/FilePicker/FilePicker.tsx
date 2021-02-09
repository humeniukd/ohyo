import React, {FC, useCallback, useState} from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@material-ui/core/Button'
import { useStyles } from './styled'

type Props = {
  pick: (f: File) => void
  text?: string
  allowMultiple?: boolean
}

export const FilePicker: FC<Props> = ({ text = 'Upload', pick }) => {
  const { t } = useTranslation()
  const { label, input } = useStyles()

  const [uploadedFile, setUploadedFile] = useState<File>()

  const handleChoose = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target?.files?.[0]) {
          setUploadedFile(event.target.files[0])
        }
      },
      [setUploadedFile],
  )

  const handleSubmit = useCallback(() => pick(uploadedFile!),
      [uploadedFile, pick]
  )
  return <>
    {uploadedFile ? <>
      <Button
          onClick={handleSubmit}
          size="small"
          color="secondary">
        {uploadedFile.name}
      </Button>
    </> : <label className={label}>
        <span>{t(text)}</span>
        <input className={input}
          type="file"
          accept="*"
          onChange={handleChoose}
        />
      </label>}
  </>
}
