/*
Copyright (c) 2020 indcovid.com
@author: Nathan LeRoy
@contact: NLeRoy917@gmail.com

Header for each page
*/

import PropTypes from "prop-types"
import React from "react"
import styled from 'styled-components';
import { Link } from 'gatsby';

import { 
  IconButton,
  Grid,
  Button,
  useMediaQuery
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const HeaderWrapper = styled.header`
  min-height: 10vh;
`

const SquareButton = styled(Button)`
  border-radius: 0px !important;
`

const ALink = styled.a`
  color: inherit;
  font-size: 0.75rem;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
  &:active {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`

const Header = ({ siteTitle }) => {
  const matches = useMediaQuery('(max-width:768px)');
  return(
  <HeaderWrapper
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
    <Grid container 
      direction="row" 
      alignItems="center"
      justify={matches ? "center" : "flex-end"}
      style={{width: '100%'}}
      spacing={2}
    >
      <Grid item>
      <ALink href="mailto:indianacovid@gmail.com">
          Contact Us
        </ALink>
      </Grid>
    </Grid>

    </div>
  </HeaderWrapper>
)
    }

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
