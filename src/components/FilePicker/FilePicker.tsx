import React, {FC, useCallback} from 'react'
import { useTranslation } from 'react-i18next'
import { useStyles } from './styled'

type Props = {
  pick: (f: File) => void
  classes?: string
  text?: string
}

export const FilePicker: FC<Props> = ({ pick, classes, text = 'Upload'}) => {
  const { t } = useTranslation()
  const { label, input } = useStyles()

  const handleChoose = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target?.files?.[0]) {
          pick(event.target.files[0])
        }
      },
      [pick],
  )

  return <>
    <label className={`${label} ${classes}`}>
      <span>{t(text)}</span>
      <input className={input}
        type="file"
        accept="*"
        onChange={handleChoose}
      />
    </label>
  </>
}
