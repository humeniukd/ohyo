import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
    grid: {
        width: 1200,
        marginBottom: 40,
        marginTop: 40,
        [theme.breakpoints.down("sm")]: {
            width: "calc(100% - 20px)"
        }
    }
}))