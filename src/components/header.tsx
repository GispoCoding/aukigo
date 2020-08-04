import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {
  createStyles, fade, Theme, makeStyles,
} from '@material-ui/core/styles';
import { Search, Settings } from '@material-ui/icons';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.primary.main,
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
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
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: '8px 0 8px 8px',
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
    color: 'inherit',
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
}));

export default function Header() {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      item
      md={6}
      sm={11}
      xs={12}
    >
      <AppBar position="static">
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
          <IconButton color="inherit">
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
