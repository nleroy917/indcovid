// import core React
import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    primary: {
        main: "#FFF"
      }
    }
  },
)

const Loader = ({ size }) => {
	return (
		<div>
		  <MuiThemeProvider theme={theme}>
		  <CircularProgress
		  	size={size}
		  	thickness={2}
		  	color="primary"
		  />
		  </MuiThemeProvider>
		</div>
		);
}

export default Loader;