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
    primary: blue,
    secondary: orange,
  },
  custom: {
    variable: '#000',
  },
});

export default defaultTheme;
