import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {
  createStyles, Theme, makeStyles,
} from '@material-ui/core/styles';
import { Search, Settings } from '@material-ui/icons';
import { Grid, Fab } from '@material-ui/core';

interface HeaderProps {
  onToggleBasemap: Function
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    margin: '30px auto 0 auto',
    pointerEvents: 'auto',
    [theme.breakpoints.up('md')]: {
      margin: '30px 30px 0 auto',
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
    },
  },
  appBar: {
    backgroundColor: theme.palette.primary.dark,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: '#EDF6F9ff',
    marginLeft: '16px',
    flexGrow: 1,
    pointerEvents: 'none',
    userSelect: 'none',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: '50px',
    backgroundColor: theme.palette.primary.light,
    color: '#333333',
    margin: '8px',
    width: '100%',
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
  },
  inputInput: {
    padding: theme.spacing(2, 1, 2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  settings: {
    position: 'absolute',
    right: '42px',
    marginTop: '12px',
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.dark,
    [theme.breakpoints.down('xs')]: {
      right: '10px',
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
        <Toolbar disableGutters>
          <Typography className={classes.title} variant="h6" noWrap>
            aukigo
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Fab className={classes.settings} size="small" onClick={() => onToggleBasemap()}>
        <Settings />
      </Fab>
    </Grid>
  );
}
