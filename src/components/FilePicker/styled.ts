import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    label: {
        cursor: 'pointer',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        display: 'inline-block',
        marginRight: theme.spacing(2),
    }
}))