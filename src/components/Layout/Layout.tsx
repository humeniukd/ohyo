import React, { FC } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { Topbar } from "components/Topbar";
import { useStyles } from './styled'
import { Footer } from "../Footer";


export const Layout: FC = ({ children }) => {

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Topbar />
      <div className={classes.root}>
        <Grid container justify="center">
          {children}
        </Grid>
      </div>
      <Footer/>
    </>
  );
}
