import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Layout } from 'components/Layout'
import { useTranslation } from 'react-i18next'
import {TrackDetails} from '../Upload/TrackDetails'
import { useStyles } from '../Upload/styled'

export const Start = () => {
    const classes = useStyles()
    const { t } = useTranslation()
    return <Layout>
        <Grid
            spacing={4}
            alignItems="center"
            justify="center"
            container
            className={classes.grid}
        >
        </Grid>
    </Layout>
}