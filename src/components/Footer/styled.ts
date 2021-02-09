import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    footer: {
        color: theme.palette.text.secondary,
        textAlign: 'left',
        paddingTop: '56px',
        marginTop: 'auto'
    },
    link: {
        color: 'inherit',
        '&:hover': {
            color: theme.palette.text.primary,
        }
    }
}))

