import { createMuiTheme } from '@material-ui/core';
import { orange, blue } from '@material-ui/core/colors';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    custom: {
      variable: string,
    },
  }
  interface ThemeOptions {
    custom?: {
      variable: string,
    }
  }
}

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#006D77',
      dark: '#114B5F',
      light: '#E8EBDD',
      contrastText: '#333333',
    },
  },
  typography: {
    fontFamily: [
      'montserrat',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '24px',
    },
    body1: {
      lineHeight: '1.5',
    },
  },
  custom: {
    variable: '#000',
  },
});

export default defaultTheme;
