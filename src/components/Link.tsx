import React, { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link as MaterialLink } from '@material-ui/core';

type Props = {
  className?: string
  to: string
}

export const Link: FC<Props> = ({
  className,
  children,
  to,
}) => {
  return (
    <MaterialLink className={className} component={RouterLink} to={to}>
      {children}
    </MaterialLink>
  )
}
