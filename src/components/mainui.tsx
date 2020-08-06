import React from 'react';
import { Grid } from '@material-ui/core';
import { ThemeProvider, makeStyles, createStyles } from '@material-ui/core/styles';
import Header from './header';
import LayerSelector from './layerselector';
import theme from '../theme';

const useStyles = makeStyles(() => (
  createStyles({
    root: {
      flexGrow: 1,
      position: 'fixed',
      top: 0,
      left: 0,
      minHeight: '100vh',
      pointerEvents: 'none',
      zIndex: 100,
    },
    header: {
      flexGrow: 1,
    },
  })
));

export default function MainUI() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        item
        className={classes.root}
        direction="column"
        justify="flex-start"
        spacing={0}
        xs={12}
      >
        <Grid item className={classes.header}>
          <Header />
        </Grid>
        <Grid item>
          <LayerSelector />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
