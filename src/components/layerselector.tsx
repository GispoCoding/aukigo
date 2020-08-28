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
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.light,
      width: '100px',
    },
    layerSelIconButton: {
      minWidth: '100%',
      color: theme.palette.primary.main,
    },
    layerSelIcon: {
      width: '2em',
      height: '2em',
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
      <Grid item xs={4}>
        <Paper className={classes.layerSelButton}>
          <Tooltip title="Lodging">
            <IconButton className={classes.layerSelIconButton} onClick={() => onToggleLayer('Lodging')}>
              <AcUnit className={classes.layerSelIcon} />
            </IconButton>
          </Tooltip>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.layerSelButton}>
          <Tooltip title="Shops">
            <IconButton className={classes.layerSelIconButton} onClick={() => onToggleLayer('Shops')}>
              <Accessible className={classes.layerSelIcon} />
            </IconButton>
          </Tooltip>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.layerSelButton}>
          <Tooltip title="Finance">
            <IconButton className={classes.layerSelIconButton} onClick={() => onToggleLayer('Finance')}>
              <AccountBalance className={classes.layerSelIcon} />
            </IconButton>
          </Tooltip>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.layerSelButton}>
          <Tooltip title="Health">
            <IconButton className={classes.layerSelIconButton} onClick={() => onToggleLayer('Health')}>
              <AccountCircle className={classes.layerSelIcon} />
            </IconButton>
          </Tooltip>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.layerSelButton}>
          <Tooltip title="Attractions">
            <IconButton className={classes.layerSelIconButton} onClick={() => onToggleLayer('Attractions')}>
              <Apartment className={classes.layerSelIcon} />
            </IconButton>
          </Tooltip>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.layerSelButton}>
          <Tooltip title="Attractions">
            <IconButton className={classes.layerSelIconButton} onClick={() => onToggleLayer('Attractions')}>
              <Apartment className={classes.layerSelIcon} />
            </IconButton>
          </Tooltip>
        </Paper>
      </Grid>
    </Grid>
  );
}
