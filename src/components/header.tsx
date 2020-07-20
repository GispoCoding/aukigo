import React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button,
  makeStyles, createStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => (
  createStyles({
    mainBar: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
      width: '90vw',
      position: 'unset',
      margin: 'auto',
      marginTop: '3vh',
    },
  })
));

export default function Header() {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.mainBar}>
        <Toolbar>
          <IconButton edge="start">
            aukigo logo here
          </IconButton>
          <Typography>
            Some text
          </Typography>
          <Button>Button</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
