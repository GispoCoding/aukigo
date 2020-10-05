import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import {
  createStyles, Theme, makeStyles,
} from '@material-ui/core/styles';
import { Search, Settings } from '@material-ui/icons';
import {
  Grid, IconButton, Paper, Tooltip,
} from '@material-ui/core';
import logo from '../static/AukiGO_logo.svg';

interface HeaderProps {
  onToggleBasemap: Function
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    margin: 'auto',
    pointerEvents: 'auto',
    minHeight: '80px',
    [theme.breakpoints.up('md')]: {
      margin: '30px 30px 0 auto',
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
    },
  },
  appBar: {
    backgroundColor: 'unset',
    minHeight: '80px',
    boxShadow: '0em 0em 0.9em 0em rgba(11,45,57,0.7)',
    borderRadius: '0em 0em 2em 2em',
    background: 'linear-gradient(60deg, #114B5F, transparent)',
    backgroundSize: '600%',
  },
  toolbar: {
    minHeight: '80px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoDiv: {
    float: 'left',
    flexGrow: 1,
    position: 'relative',
    left: '0.5em',
  },
  logo: {
    color: '#EDF6F9ff',
    filter: 'invert()',
    height: '50px',
    margin: '0 16px',
    pointerEvents: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: '50px',
    backgroundColor: theme.palette.primary.light,
    color: '#006D77',
    margin: '20px',
    width: '100%',
    height: '40px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    width: '100%',
    height: '40px',
  },
  inputInput: {
    padding: theme.spacing(2, 1, 2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '40px',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  settingsPaper: {
    position: 'absolute',
    right: '42px',
    marginTop: '16px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.light,
    width: '35px',
    height: '35px',
    boxShadow: '1px 2px 5px 2px rgba(9,9,9,0.18)',
    '&:active': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  settings: {
    color: theme.palette.primary.dark,
    boxShadow: '1px 2px 5px 2px rgba(9,9,9,0.18)',
    width: '100%',
    height: '100%',
    '&:active': {
      color: theme.palette.primary.light,
    },
  },
}));

export default function Header({ onToggleBasemap }: HeaderProps) {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      item
      md={6}
      sm={11}
      xs={12}
    >
      <AppBar position="static" className={classes.appBar}>
        <Toolbar disableGutters className={classes.toolbar}>
          <div className={classes.logoDiv}>
            <img className={classes.logo} src={logo} alt="AukiGO" />
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Hae…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Paper className={classes.settingsPaper}>
        <IconButton className={classes.settings} onClick={() => onToggleBasemap()}>
          <Tooltip title="Asetukset">
            <Settings />
          </Tooltip>
        </IconButton>
      </Paper>
    </Grid>
  );
}
