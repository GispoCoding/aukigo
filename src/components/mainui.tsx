import React from 'react';
import { Grid } from '@material-ui/core';
import { ThemeProvider, makeStyles, createStyles } from '@material-ui/core/styles';
import Header from './header';
import LayerSelector from './layerselector';
import theme from '../theme';

interface UiProps {
  onToggleLayer: Function,
  onToggleBasemap: Function
}

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
      boxShadow: 'inset 0em 0em 2em 0em hsl(0 0% 0% / 0.1)',
      background: 'linear-gradient(0deg, rgb(17 75 95 / 0.08), transparent), linear-gradient(0deg, rgb(17 75 95 / 0.1), transparent)',
      backgroundSize: '100% 40%, 100% 20%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom center',
    },
    header: {
      flexGrow: 1,
    },
  })
));

// eslint-disable-next-line react/prop-types
export default function MainUI({ onToggleLayer, onToggleBasemap }: UiProps) {
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
          <Header onToggleBasemap={onToggleBasemap} />
        </Grid>
        <Grid item>
          <LayerSelector onToggleLayer={onToggleLayer} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
