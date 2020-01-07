
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

export const primary = {
  50: '#f2f9e6',
  100: '#e0f1c2',
  200: '#cbe899',
  300: '#b6df70',
  400: '#a6d851',
  500: '#96d132',
  600: '#8ecc2d',
  700: '#83c626',
  800: '#79c01f',
  900: '#68b513',
  A100: '#f2ffe5',
  A200: '#d8ffb3',
  A400: '#beff80',
  A700: '#83c626',
  'contrastDefaultColor': 'dark',
};

export const secondary = {
  50: '#ede6f9',
  100: '#d2c0f0',
  200: '#b497e6',
  300: '#966ddc',
  400: '#804dd5',
  500: '#692ecd',
  600: '#6129c8',
  700: '#5623c1',
  800: '#4c1dba',
  900: '#3b12ae',
  A100: '#e6dfff',
  A200: '#beacff',
  A400: '#9779ff',
  A700: '#835fff',
  'contrastDefaultColor': 'light',
};

export const login = createMuiTheme({
  palette: {
    primary: {
      main: primary[500],
    },
    secondary: {
      main: secondary[500],
    },
    error: red
  },
});

export default createMuiTheme({
  palette: {
    primary: {
      main: blue[500]
    },
    secondary: {
      main: pink[500]
    },
    error: red
  },
});
