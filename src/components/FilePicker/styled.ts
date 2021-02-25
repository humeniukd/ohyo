import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    label: {
        cursor: 'pointer',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(.5, 1),
        display: 'inline-block'
    }
}))