import React, { FC } from 'react'
import { Card, Typography } from '@mui/material'

import useStyles from './styles'

interface TitleProps {
  title?: string | null | undefined
  subTitle?: string | null | undefined
}

const Title: FC<TitleProps> = ({ title, subTitle }) => {
  if (!title && !subTitle ) return null
  // const classes: any = useStyles()
  return (
    <Card>
      <Typography>{title}</Typography>
      <Typography>{subTitle}</Typography>
    </Card>
  )
}

export default Title