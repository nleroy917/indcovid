/*
Copyright (c) 2020 indcovid.com
@author: Nathan LeRoy
@contact: NLeRoy917@gmail.com

Header for each page
*/

import PropTypes from "prop-types"
import React, {useState} from "react"
import styled from 'styled-components';
import { Link } from 'gatsby';

import { 
  IconButton,
  Grid,
  Button,
  useMediaQuery,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import NavMobile from './navmobile';

const HeaderWrapper = styled.header`
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
  const [navOpen, setNavOpen] = useState(false);
  const mobile = useMediaQuery('(max-width:768px)');

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

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
    <NavMobile open={navOpen} setOpen={toggleNav} />
    <Grid container 
      direction="row" 
      alignItems="center"
      justify={mobile ? "space-between" : "flex-end"}
      style={{width: '100%'}}
      spacing={2}
    >
    { mobile ? 
      <Grid item>
        <IconButton onClick={toggleNav}>
          <MenuIcon style={{fill:'white'}}/>
        </IconButton>
      </Grid>
      :
      ' '
    }
      <Grid item>
      <ALink href="mailto:indianacovid@gmail.com">
          Contact Us ✉️
        </ALink>
      </Grid>
      <Grid item>
      <ALink href="https://www.hhs.gov/coronavirus/community-based-testing-sites/index.html">
          Find a testing location 🏥
        </ALink>
      </Grid>
      <Grid item>
      <ALink href="https://github.com/NLeRoy917/indcovid/issues/new">
          Report an Issue
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

export default Header;
