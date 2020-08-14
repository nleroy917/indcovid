// import core React
import React from 'react';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress'
import {
    Grid
} from '@material-ui/core';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// // Or Create your Own theme:
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//         main: 'white'
//       }
//     }
//   },
// )

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
`

const LoadingText = styled.p`
    padding: 5px;
`

const Loader = (props) => {
	return (
		<>
        <Wrapper>
        <Grid container
            direction="column"
            alignItems="center"
            justify="center"
            style={{height: '100%', width: '100%'}}
        >
        <Grid item>
		  <CircularProgress
		  	size={props.size}
		  	thickness={2}
		  	color="inherit"
		  />
          </Grid>
          <Grid item>
              <LoadingText>
              </LoadingText>
          </Grid>
          </Grid>
          </Wrapper>
          </>
		);
}

export default Loader;