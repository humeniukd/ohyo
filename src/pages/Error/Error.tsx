import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const Error: FC = () => {
  const { t } = useTranslation()

  return t('Something went wrong')
}
