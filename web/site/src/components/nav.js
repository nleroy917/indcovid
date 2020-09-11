import React from 'react';
import styled from 'styled-components';

import {
    Grid,
    useMediaQuery,
    Button
} from '@material-ui/core';

const ALink = styled.a`
  color: inherit;
  font-size: 0.75rem;
  text-decoration: none;
  height: 100%;
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`

const SquareButton = styled(Button)`
  border-radius: 0px !important;
  height: 100%;
  width: 100%;
  font-size: ${props => props.mobile ? '0.5rem !important' : ''};
`

const Nav = ({smoothScroll}) => {
    const mobile = useMediaQuery('(max-width:480px)', { noSsr: true });
    return(
        <>
        <Grid container 
            direction="row" 
            justify="center" 
            alignItems={mobile ? "stretch" : "center" }
            spacing={2}
            style={{width:'100%', height: '100%'}}
          >
            <Grid item lg={2} md={2} xs={4} style={{height: '100%'}}>
            <ALink href="/">
              <SquareButton 
                variant="outlined" 
                color="inherit" 
                size="small"
                mobile={mobile}
                onClick={smoothScroll}
              >
                Health Equity
              </SquareButton>
              </ALink>
            </Grid>
            <Grid item lg={2} md={2} xs={4} style={{height: '100%'}}>
            <ALink href="/stay-healthy">
              <SquareButton 
                variant="outlined" 
                color="inherit" 
                size="small"
                mobile={mobile}
              >
                Staying Healthy
              </SquareButton>
              </ALink>
            </Grid>
            <Grid item lg={2} md={2} xs={4} style={{height: '100%'}}>
            <ALink href="/back-on-track">
              <SquareButton 
                variant="outlined" 
                color="inherit" 
                size="small"
                mobile={mobile}
              >
                Back on Track
              </SquareButton>
              </ALink>
            </Grid>
            <Grid item lg={2} md={2} xs={4} style={{height: '100%'}}>
            <ALink href="/more-info">
              <SquareButton 
                variant="outlined" 
                color="inherit" 
                size="small"
                mobile={mobile}
              >
                More Info
              </SquareButton>
              </ALink>
            </Grid>
            <Grid item lg={2} md={2} xs={4} style={{height: '100%'}}>
            <ALink href="/about-us">
              <SquareButton 
                variant="outlined" 
                color="inherit" 
                size="small"
                mobile={mobile}
              >
                About Us
              </SquareButton>
              </ALink>
            </Grid>
          </Grid>
          {mobile ? ' ' :
          <hr style={{color: 'inherit', opacity: 0.8}}></hr>
          }
        </>
    )
}

export default Nav;