import React from 'react';
import {
  Grid, makeStyles, createStyles, IconButton, Paper, Theme,
} from '@material-ui/core';
import {
  AcUnit, Accessible, AccountBalance, AccountCircle, Apartment,
} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      zIndex: 100,
      margin: 'auto',
      pointerEvents: 'auto',
      flexGrow: 1,
    },
    layerSelButton: {
      minWidth: '100%',
    },
  })
));

export default function LayerSelector() {
  const classes = useStyles();
  return (
    <Grid
      alignItems="center"
      className={classes.root}
      container
      direction="row"
      justify="space-evenly"
      spacing={3}
      sm={11}
      xs={12}
    >
      <Grid item xs>
        <Paper>
          <IconButton className={classes.layerSelButton}>
            <AcUnit />
          </IconButton>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper>
          <IconButton className={classes.layerSelButton}>
            <Accessible />
          </IconButton>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper>
          <IconButton className={classes.layerSelButton}><AccountBalance /></IconButton>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper>
          <IconButton className={classes.layerSelButton}>
            <AccountCircle />
          </IconButton>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper>
          <IconButton className={classes.layerSelButton}>
            <Apartment />
          </IconButton>
        </Paper>
      </Grid>
    </Grid>
  );
}
