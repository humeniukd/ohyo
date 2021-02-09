import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Layout } from 'components/Layout'
import { useTranslation } from 'react-i18next'
import { useStyles } from './styled'
import {TrackDetails} from "../Upload/TrackDetails";

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
            <TrackDetails key={'adsf'} />
        </Grid>
    </Layout>
}