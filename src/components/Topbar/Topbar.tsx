import React, { FC, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Link } from 'react-router-dom'
import Menu from "./Menu";
import { useStyles } from "./styled";

const logo = require("../../images/logo.svg");

type Props = {
  noTabs?: boolean
}

export const Topbar: FC<Props> = ({ noTabs }) => {

  const [menuDrawer, toggleMenu] = useState(false)
  const [value, setValue] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const classes = useStyles()

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar>
        <Grid container spacing={10} alignItems="baseline">
          <Grid item xs={12} className={classes.flex}>
            <div className={classes.inline}>
              <Typography variant="h6" color="inherit" noWrap>
                <Link to="/" className={classes.link}>
                  <img width={20} src={logo} alt="" />
                  <span className={classes.tagline}>Loud Yo</span>
                </Link>
              </Typography>
            </div>
            {!noTabs && (
              <>
                <div className={classes.productLogo}>
                  <Typography>A sound sharing platform</Typography>
                </div>
                <div className={classes.iconContainer}>
                  <IconButton
                    onClick={() => toggleMenu(true)}
                    className={classes.iconButton}
                    color="inherit"
                    aria-label="Menu"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                <div className={classes.tabContainer}>
                  <SwipeableDrawer
                    anchor="right"
                    open={menuDrawer}
                    onClose={() => toggleMenu(false)}
                    onOpen={() => toggleMenu(true)}
                  >
                    <AppBar title="Menu" />
                    <List>
                      {Menu.map((item, index) => (
                        <ListItem
                          component={props => <Link to={item.pathname} {...props} />}
                          button
                          key={index}
                        >
                          <ListItemText primary={item.label} />
                        </ListItem>
                      ))}
                    </List>
                  </SwipeableDrawer>
                  <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(_, id) => {
                      console.log('asdf', id)
                      setValue(id)
                    }}
                  >
                    {Menu.map((item, index) => (
                      <Tab key={item.pathname}
                        component={Link}
                        to={item.pathname}
                        classes={{ root: classes.tabItem }}
                        label={item.label}
                      />
                    ))}
                  </Tabs>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}