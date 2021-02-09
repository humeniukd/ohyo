import { makeStyles } from '@material-ui/core/styles'

const backgroundShape = require("../../images/shape.svg");

export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey["100"],
        overflow: "hidden",
        background: `url(${backgroundShape}) no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "0 400px",
        paddingBottom: 200
    }
}))