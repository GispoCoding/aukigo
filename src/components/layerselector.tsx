import React from 'react';
import {
  Grid, makeStyles, createStyles, IconButton, Paper, Theme, Tooltip,
} from '@material-ui/core';
import {
  AcUnit, Accessible, AccountBalance, AccountCircle, Apartment,
} from '@material-ui/icons';

interface LayerSelectorProps {
  onToggleLayer: Function
}

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      zIndex: 100,
      margin: 'auto',
      pointerEvents: 'auto',
      flexGrow: 1,
      [theme.breakpoints.up('md')]: {
        position: 'absolute',
        bottom: '30px',
        right: '30px',
      },
    },
    layerSelButton: {
      minWidth: '100%',
    },
  })
));

export default function LayerSelector({ onToggleLayer }: LayerSelectorProps) {
  const classes = useStyles();
  return (
    <Grid
      alignItems="center"
      className={classes.root}
      container
      item
      direction="row"
      justify="space-evenly"
      spacing={3}
      md={6}
      sm={11}
      xs={12}
    >
      <Grid item xs>
        <Paper>
          <Tooltip title="Lodging">
            <IconButton className={classes.layerSelButton} onClick={() => onToggleLayer('Lodging')}>
              <AcUnit />
            </IconButton>
          </Tooltip>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper>
          <Tooltip title="Shops">
            <IconButton className={classes.layerSelButton} onClick={() => onToggleLayer('Shops')}>
              <Accessible />
            </IconButton>
          </Tooltip>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper>
          <Tooltip title="Finance">
            <IconButton className={classes.layerSelButton} onClick={() => onToggleLayer('Finance')}>
              <AccountBalance />
            </IconButton>
          </Tooltip>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper>
          <Tooltip title="Health">
            <IconButton className={classes.layerSelButton} onClick={() => onToggleLayer('Health')}>
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper>
          <Tooltip title="Attractions">
            <IconButton className={classes.layerSelButton} onClick={() => onToggleLayer('Attractions')}>
              <Apartment />
            </IconButton>
          </Tooltip>
        </Paper>
      </Grid>
    </Grid>
  );
}
