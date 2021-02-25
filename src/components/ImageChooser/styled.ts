import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    box: {
        width: '340px',
        height: '340px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        paddingRight: theme.spacing(2)
    },
    img: {
        width: '340px',
        height: '340px',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        'display': 'inline-block'
    },
    label: {
        position: 'absolute',
        bottom: theme.spacing(1),
        backgroundColor: "hsla(0, 0%, 100%, .8)",
        transition: "background-color .2s ease-in-out, border-color .2s ease-in-out",
        '&:hover': {
            background: "#fff",
        }
    }
}))