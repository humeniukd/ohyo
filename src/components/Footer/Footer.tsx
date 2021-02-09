import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMe } from 'hooks'
import { useStyles } from './styled'
import { DEFAULT_COUNTRY_CODE } from './constants'
import { TextBox } from '../TextBox'
import { Link } from '../Link'


export const Footer = () => {
  const { t } = useTranslation()
  const [user] = useMe()
  const { footer, link } = useStyles()

  const countryCode = user?.country || DEFAULT_COUNTRY_CODE

  return (
    <footer className={footer}>
      <TextBox ml={2}>
        {t('Copyright © {{ year }}', {
          year: new Date().getFullYear(),
        })}{' '} |{' '}
        <Link className={link} to="/">
          {t('Loud Yo')}
        </Link>{' '} |{' '}
        <Link className={link} to="/start">
          {t('Dashboard')}
        </Link>{' '} |{' '}
        <Link className={link} to="/upload">
          {t('Upload')}
        </Link>
      </TextBox>
    </footer>
  )
}
