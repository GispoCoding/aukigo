import React from 'react';
import {
  Grid, makeStyles, createStyles, Theme,
} from '@material-ui/core';
import {
  Apartment, ShoppingCart, Restaurant, PhotoCamera, LocalHospital, DirectionsBus,
} from '@material-ui/icons';
import LayerSelectionButton from './layerselectionbutton';

interface LayerSelectorProps {
  onToggleLayer: Function
}

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root: {
      zIndex: 100,
      margin: '20px auto',
      pointerEvents: 'auto',
      flexGrow: 1,
      [theme.breakpoints.up('md')]: {
        position: 'absolute',
        bottom: '30px',
        right: '30px',
      },
    },
    layerSelIcon: {
      margin: '0 auto',
      height: '30px',
      width: '100%',
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
      <Grid item xs={4} sm={2}>
        <LayerSelectionButton name="Accommodation" onToggleLayer={onToggleLayer}>
          <Apartment className={classes.layerSelIcon} />
        </LayerSelectionButton>
      </Grid>
      <Grid item xs={4} sm={2}>
        <LayerSelectionButton name="Shopping" onToggleLayer={onToggleLayer}>
          <ShoppingCart className={classes.layerSelIcon} />
        </LayerSelectionButton>
      </Grid>
      <Grid item xs={4} sm={2}>
        <LayerSelectionButton name="Food" onToggleLayer={onToggleLayer}>
          <Restaurant className={classes.layerSelIcon} />
        </LayerSelectionButton>
      </Grid>
      <Grid item xs={4} sm={2}>
        <LayerSelectionButton name="Transportation" onToggleLayer={onToggleLayer}>
          <DirectionsBus className={classes.layerSelIcon} />
        </LayerSelectionButton>
      </Grid>
      <Grid item xs={4} sm={2}>
        <LayerSelectionButton name="Healthcare" onToggleLayer={onToggleLayer}>
          <LocalHospital className={classes.layerSelIcon} />
        </LayerSelectionButton>
      </Grid>
      <Grid item xs={4} sm={2}>
        <LayerSelectionButton name="Entertainment" onToggleLayer={onToggleLayer}>
          <PhotoCamera className={classes.layerSelIcon} />
        </LayerSelectionButton>
      </Grid>
    </Grid>
  );
}
