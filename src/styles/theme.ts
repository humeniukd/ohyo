import {createMuiTheme, Theme} from '@material-ui/core/styles'
import { blue, indigo } from '@material-ui/core/colors'

export const theme: Theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[300]
    },
    primary: {
      main: indigo[500]
    }
  },
  typography: {
    fontFamily: '"Basier Circle", sans-serif'
  }
})
