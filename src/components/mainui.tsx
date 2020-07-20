import React, { CSSProperties } from 'react';
import { Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Header from './header';
import theme from '../theme';

export default function MainUI() {
  const mainContainerStyle: CSSProperties = {
    zIndex: 100,
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    // border: '5px solid red',
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        style={mainContainerStyle}
        direction="column"
      >
        <Grid item>
          <Header />
        </Grid>
        <Grid item>Placeholder layerselector</Grid>
        <Grid item>Placeholder component</Grid>
      </Grid>
    </ThemeProvider>
  );
}
