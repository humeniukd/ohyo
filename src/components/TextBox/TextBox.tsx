import React, { FC } from 'react'
import Box, { BoxProps } from '@material-ui/core/Box';
import { useStyles } from './styled'

export const TextBox: FC<BoxProps> = ({ children, ...rest }) => {
  const { box } = useStyles()
  return <Box className={box} fontSize="default" color="default" {...rest}>
    {children}
  </Box>
}
