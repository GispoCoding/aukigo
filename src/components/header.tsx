import React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button,
  makeStyles, createStyles, Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => (
  createStyles({
    root: {
      margin: '30px auto 0 auto',
      flexGrow: 1,
      pointerEvents: 'auto',
    },
    mainBar: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
    logo: {
      marginRight: '20px',
    },
    descTxt: {
      flexGrow: 1,
    },
  })
));

export default function Header() {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      direction="row"
      item
      sm={11}
      xs={12}
    >
      <AppBar
        className={classes.mainBar}
        position="static"
      >
        <Toolbar>
          <IconButton className={classes.logo}>
            aukigo
          </IconButton>
          <Typography className={classes.descTxt}>
            Some text
          </Typography>
          <Button>
            Button
          </Button>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
