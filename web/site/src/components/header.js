import PropTypes from "prop-types"
import React from "react"
import styled from 'styled-components';
import { Link } from 'gatsby';

import { 
  IconButton,
  Grid
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const HeaderWrapper = styled.header`
  min-height: 100px;
`

const Header = ({ siteTitle }) => (
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
      justify="flex-end"
      style={{width: '100%'}}
    >
      <Grid item>
      <Link to="/about">
        <IconButton
         href="/about"
        >
          <InfoOutlinedIcon 
            style={{fill: 'white'}}
          />
        </IconButton>
        </Link>
      </Grid>
    </Grid>

    </div>
  </HeaderWrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
