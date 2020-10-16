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
      width: '70px',
      height: '70px',
      margin: 'auto',
      boxShadow: '0.08em 0.2em 0.5em 0em rgba(9,38,47,0.2), 0em 0em 0em 0.01em rgba(9,38,47,0.1)',
      '&:active': {
        backgroundColor: theme.palette.primary.main,
      },
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
      }
    },
    layerSelIconButton: {
      color: theme.palette.primary.main,
      // margin: '13px',
      margin: 'auto',
      width: '100%',
      height: '100%',
      padding: 0,
      '&:active': {
        color: theme.palette.primary.light,
      },
      '&:focus': {
        color: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.main,
      }
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
