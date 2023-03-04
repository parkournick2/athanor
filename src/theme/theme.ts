import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2b2d42',
    },
    secondary: {
      main: '#ef233c',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    h5: {
      fontWeight: 1000,
    },
  },
  shape: {
    borderRadius: 3,
  },
  spacing: 6,
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
  },
})
