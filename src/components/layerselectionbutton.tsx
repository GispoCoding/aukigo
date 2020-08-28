import React, { ReactElement } from 'react';
import {
  createStyles,
  IconButton, Paper, Theme, Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface LayerSelProps {
  children: ReactElement
  onToggleLayer: Function
  name: string
}

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root: {
      color: theme.palette.primary.main,
    },
    layerSelButton: {
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.light,
      width: '50px',
      height: '50px',
      margin: 'auto',
    },
    layerSelIconButton: {
      color: theme.palette.primary.main,
      // margin: '13px',
      margin: 'auto',
      width: '100%',
      height: '100%',
      padding: 0,
    },
  })
));

const LayerSelectionButton = ({ children, onToggleLayer, name }: LayerSelProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.layerSelButton}>
      <Tooltip title={name}>
        <IconButton className={classes.layerSelIconButton} onClick={() => onToggleLayer(name)}>
          {children}
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default LayerSelectionButton;
