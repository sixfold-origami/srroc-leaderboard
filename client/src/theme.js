import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#29d851',
      contrastText: '#0a0a0a',
    },
    type: 'dark',
  },
  typography: { useNextVariants: true },
});;

export default theme;
